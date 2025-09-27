import { MY_ORDERS_QUERYResult } from '@/sanity.types'
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import PriceFormat from './PriceFormat';

interface Props{
    order:MY_ORDERS_QUERYResult[number]|null,
    isOpen:boolean,
    onClose:()=>void
}
const OrderDetailsDialog = ({order,isOpen,onClose}:Props) => {
    if(!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='max-w-4 max-h-[90vh] overflow-y-scroll'>
            <DialogHeader>
                <DialogTitle>
                    Order details -{order?.orderNumber}
                </DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-1">
                <p>
                    <strong>Customer: </strong>{order?.customerName}
                </p>
                <p>
                    <strong>Email: </strong>{order?.email}
                </p>
                <p>
                    <strong>Date: </strong>{order?.orderDate && new Date(order?.orderDate).toLocaleDateString()}
                </p>
                <p>
                    <strong>Status: </strong> <span className='capitalize text-green-600 font-medium'>{order?.status} </span>
                </p>
                <p>
                    <strong>Invoice Number: </strong> {order?.invoice?.number}
                </p>
                {order?.invoice && <Button variant={'outline'} className='mt-2'>
                    {order?.invoice?.hosted_invoice_url && <Link href={order?.invoice?.hosted_invoice_url} target="blank">Download Invoice</Link>}
                </Button> }
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Products</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {order?.products?.map((product,index)=>(
                        
                        <TableRow key={index}>
                            <TableCell className='flex items-center gap-2'>
                                {product?.product?.image && (
                                    <Image src={urlFor(product?.product?.image[0]).url()} alt="productImage" width={50} height={50} className='border rounded-sm w-14 h-14 object-contain' />
                                )}

                                {product?.product && <p className='line-clamp-1'> {product?.product?.name}</p> }
                            </TableCell>

                            <TableCell>{product?.quantity} </TableCell>
                            <TableCell>
                                <PriceFormat amount={product?.product?.discount?((product?.product?.price ?? 0 )- ((product?.product?.price ??0) * product?.product?.discount)/100):(product?.product?.price ?? 0)  } className='text-black font-medium'/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="mt-4 text-right flex items-center justify-end">
                <div className="w-44 flex flex-col gap-1">
                    
                    {order?.amountDiscount !== 0 && (
                        <div className='w-full flex items-center justify-between'>
                            <strong>Subtotal</strong>
                            <PriceFormat amount={(order?.totalPrice as number)+(order?.amountDiscount as number)} />
                        </div>
                    )}

                    {order?.amountDiscount !== 0 && (
                        <div className='w-full flex items-center justify-between'>
                            <strong>Discount</strong>
                            <PriceFormat amount={order?.amountDiscount ??0} />
                        </div>
                    )}
                    
                    <div className='w-full flex items-center justify-between'>
                        <strong>Total:</strong>
                        <PriceFormat amount={order?.totalPrice ?? 0} className='text-black font-bold' />


                    </div>
                </div>

            </div>
        </DialogContent>

    </Dialog>
  )
}

export default OrderDetailsDialog