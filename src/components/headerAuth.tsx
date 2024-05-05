'use client'

import { Avatar, Button, NavbarItem, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import React from 'react'
import * as actions from '@/actions';
import { useSession } from 'next-auth/react';

const HeaderAuth = () => {

    const session = useSession();

    let authContent: React.ReactNode;
    if(session.status === 'loading') {
        authContent = null;
    }
    else if (session?.data?.user) {
        authContent = <Popover placement='bottom-end'>
            <PopoverTrigger>
                <div className='flex space-x-3 items-center'>
                    <Avatar src={session?.data.user.image || ''} />
                    <div className='text-sm'>{session?.data.user.name}</div>
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <div className='p-4'>
                    <form action={actions.signOut}>
                        <Button
                            type='submit'
                            onClick={() => window.location.reload()}
                        >
                            Sign out
                        </Button>
                    </form>
                </div>
            </PopoverContent>
        </Popover>
    } else {
        authContent = <div className='flex space-x-3'>
            <NavbarItem>
                <form action={actions.signIn}>
                    <Button
                        type='submit'
                        color='secondary'
                        variant='bordered'
                    >
                        Sign in
                    </Button>
                </form>
            </NavbarItem>
            <NavbarItem>
                <form action={actions.signIn}>
                    <Button
                        type='submit'
                        color='primary'
                        variant='flat'
                    >
                        Sign up
                    </Button>
                </form>
            </NavbarItem>
        </div>
    }

    return authContent;
}

export default HeaderAuth