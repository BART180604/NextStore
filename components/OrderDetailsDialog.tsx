import { MY_ORDERS_QUERY_RESULT } from '@/sanity.types'
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import PriceFormat from './PriceFormat';

interface Props{
    order: MY_ORDERS_QUERY_RESULT[number] | null,
    isOpen: boolean,
    onClose: () => void
}

const OrderDetailsDialog = ({order, isOpen, onClose}: Props) => {
    if(!order) return null;


    return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='max-w-3xl max-h-[90vh] overflow-y-auto'>
            <DialogHeader>
                <DialogTitle className="text-xl font-bold">
                    Order Details - #{order?.orderNumber?.slice(-10)}
                </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 border-b">
                <div className="space-y-2">
                    <h3 className="font-semibold text-gray-500 uppercase text-xs">Customer Information</h3>
                    <p className="text-sm"><strong>Name:</strong> {order?.customerName}</p>
                    <p className="text-sm"><strong>Email:</strong> {order?.email}</p>
                    <p className="text-sm"><strong>Order Date:</strong> {order?.orderDate && new Date(order?.orderDate).toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                    <h3 className="font-semibold text-gray-500 uppercase text-xs">Order Status</h3>
                    <div className="flex items-center gap-2">
                        <span className={cn(
                            "px-2.5 py-0.5 rounded-full text-xs font-bold capitalize",
                            order?.status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        )}>
                            {order?.status}
                        </span>
                    </div>
                    {order?.invoice && (
                        <div className="pt-2">
                            <p className="text-sm mb-2"><strong>Invoice:</strong> {order?.invoice?.number}</p>
                            {order?.invoice?.hosted_invoice_url && (
                                <Button asChild variant='outline' size="sm">
                                    <Link href={order?.invoice?.hosted_invoice_url} target="_blank">Download Invoice</Link>
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-6">
                <h3 className="font-semibold text-gray-500 uppercase text-xs mb-4">Ordered Items</h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead className="text-center">Qty</TableHead>
                            <TableHead className="text-right">Unit Price</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {order?.products?.map((item, index) => {
                            const product = item?.product;

                            const color = item?.color;

                            const size = item?.size;
                            const quantity = item?.quantity || 0;
                            
                            const basePrice = product?.price ?? 0;
                            const discount = product?.discount ?? 0;
                            const unitPrice = discount ? (basePrice - (basePrice * discount) / 100) : basePrice;

                            return (
                                <TableRow key={index}>
                                    <TableCell className='flex items-center gap-3'>
                                        {product?.image && (
                                            <div className="w-12 h-12 border rounded overflow-hidden shrink-0">
                                                <Image 
                                                  src={urlFor(product.image[0]).url()} 
                                                  alt={product.name || "Product"} 
                                                  width={48} height={48} 
                                                  className='w-full h-full object-cover' 
                                                />
                                            </div>
                                        )}
                                        <div className="flex flex-col">
                                            <span className='font-medium line-clamp-1'>{product?.name}</span>
                                            <div className="flex gap-2 text-[10px] text-gray-500 uppercase font-bold">
                                                {color && <span>Color: {color}</span>}
                                                {size && <span>Size: {size}</span>}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">{quantity}</TableCell>
                                    <TableCell className="text-right"><PriceFormat amount={unitPrice} /></TableCell>
                                    <TableCell className="text-right font-bold"><PriceFormat amount={unitPrice * quantity} /></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg flex flex-col items-end gap-2">
                {order?.amountDiscount !== 0 && (
                    <div className='w-48 flex justify-between text-sm'>
                        <span>Subtotal:</span>
                        <PriceFormat amount={(order?.totalPrice || 0) + (order?.amountDiscount || 0)} />
                    </div>
                )}
                {order?.amountDiscount !== 0 && (
                    <div className='w-48 flex justify-between text-sm text-green-600'>
                        <span>Discount:</span>
                        <span>-<PriceFormat amount={order?.amountDiscount || 0} /></span>
                    </div>
                )}
                <div className='w-48 flex justify-between items-center border-t pt-2 mt-1'>
                    <span className="font-bold">Total:</span>
                    <PriceFormat amount={order?.totalPrice ?? 0} className='text-xl font-black text-darkColor' />
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}

// Helper simple pour classnames si non importé
const cn = (...classes: (string | undefined | null | boolean | number)[]) =>
    classes.filter(Boolean).join(' ');

export default OrderDetailsDialog;