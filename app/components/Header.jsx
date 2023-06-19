"use client"

import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Avatar from './Avatar'

const Header = ({ type }) => {

    const supabase = createClientComponentClient()
    const [isLogged, setIsLogged] = useState("");

    useEffect(() => {
        const getCurUser = async () => {
            setIsLogged(localStorage.getItem('isLogged'));
        }
        getCurUser();
    }, [])

    return (
        <div className='flex -mt-3 justify-between items-center'>
            {
                type === "" ? <h1 className="text-3xl font-medium">Welcome {isLogged.split('@')[0]}</h1> : <h1 className="text-3xl font-medium">{type}</h1>
            }
            <Avatar />
        </div>
    )
}

export default Header