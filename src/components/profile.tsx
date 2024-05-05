'use client'

import { useSession } from 'next-auth/react'
import React from 'react'


export default function Profile (){

    const session = useSession();

    if(session.data?.user){
        return (
            <div>From client: User is signed in with info: {JSON.stringify(session.data.user)}</div>
        )
    }else {
        return <div>From client: User is not signed in</div>
    } 
}