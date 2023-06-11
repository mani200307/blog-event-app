"use client"

import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Avatar from './Avatar'
import Link from 'next/link'

const Header = ({ type }) => {

    const supabase = createClientComponentClient()
    const [isLogged, setIsLogged] = useState("");

    useEffect(() => {
        const getCurUser = async () => {
            try {
                if (document.cookie != "") {
                    const user = await supabase.auth.getUser()
                    setIsLogged(user.data.user.email)
                    console.log(user.data.user.email);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getCurUser();
    }, [])

    return (
        <div className='flex -mt-3 justify-between items-center'>
            {
                type === "" && isLogged !== "" ? <h1 className="text-2xl">Welcome {isLogged.split('@')[0]},</h1> : <h1 className="text-2xl">{type}</h1>
            }
            {isLogged ? <Avatar /> : <Link href='/login'><button className='btn mr-5'>Log in</button></Link>}
        </div>
    )
}

export default Header