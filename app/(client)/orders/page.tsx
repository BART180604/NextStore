import Container from '@/components/Container';
import OrdersComponent from '@/components/OrdersComponent';
import Title from '@/components/Title';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { requiredUser } from '@/hooks/requiredUser'
import { getMyOrders } from '@/sanity/helpers/query';
import { auth } from '@clerk/nextjs/server';
import { FileX } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const OrdersPage = async() => {
  await requiredUser();
  const {userId} = await auth();
  if(!userId){
    return redirect("/");
  }
  const orders = await getMyOrders(userId)
  console.log(orders)
  return (
    <Container className='py-10'>
      {orders?.length ? 
      (<Card className='w-full'>
        <CardHeader>
          <CardTitle className='text-2xl md:text-3xl'>
            Order List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className='w-full'> 
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-auto'>Order Number</TableHead>
                  <TableHead className='hidden sm:table-cell'>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='hidden sm:table-cell'>Invoice Number</TableHead>
                </TableRow>
              </TableHeader>
              <OrdersComponent orders={orders} />
              <ScrollBar orientation="horizontal" />
            </Table>
          </ScrollArea>
        </CardContent>
      </Card> )
      : 
      (<div className='flex flex-col items-center justify-center py-5 md:py-10 px-4'>
        <FileX className='h-24 w-24 text-gray-400 mb-4'/>
        <Title> No orders found</Title>
        <p className='mt-2 text-sm text-gary-600 text-center max-w-md'> It looks like you have&apos;t placed any orders yet.Start shopping to see your orders here! </p>
        <Button asChild className='mt-6'>
          <Link href="/">
            Browse your cart
          </Link>
        </Button>
      </div>) }
    </Container>
  )
}

export default OrdersPage