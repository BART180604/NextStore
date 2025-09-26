import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import Logo from './Logo'
import { SignInButton, SignUpButton } from '@clerk/clerk-react'
import { Button } from './ui/button'

const NoAccessToCart = () => {
  return (
    <div className='flex items-center justify-center py-12 md:py-32 bg-gray-100 p-4'>
        <Card className='w-full max-w-md'>
            <CardHeader className='space-y-1'>
                <div className='flex justify-center'><Logo>Ghost</Logo></div>
                <CardTitle className='text-2xl font-bold text-center'>Welcome Back!</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
                <p>Log In to view your cart items and checkout. Don't miss out on your favorite products! </p>
                <SignInButton mode="modal">
                    <Button className='w-full font-semibold' size="lg">Sign In</Button>
                </SignInButton>
            </CardContent>
            <CardFooter className='space-y-2 flex flex-col'>
                <div>
                    Don't have an account?
                </div>
                <SignUpButton mode="modal">
                    <Button variant="outline" className='w-full' size="lg" >
                        Create an account
                    </Button>
                </SignUpButton>
            </CardFooter>
        </Card>
    </div>
  )
}

export default NoAccessToCart