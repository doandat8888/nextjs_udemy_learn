import { auth } from '@/auth'
import { Avatar, Button, Input, Navbar, NavbarBrand, NavbarContent, NavbarItem, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import * as actions from '@/actions';
import HeaderAuth from './headerAuth';

const Header = async () => {

    return (
        <Navbar className='shadow mb-6'>
            <NavbarBrand>
                <Link href={'/'} className='font-bold'>Discuss</Link>
            </NavbarBrand>
            <NavbarContent justify='center'>
                <NavbarItem>
                    <Input />
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify='end'>
                <HeaderAuth />
            </NavbarContent>
        </Navbar>
    )
}

export default Header