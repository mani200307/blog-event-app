'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useStore from '../context/store'

export default function Page() {
    const supabase = createClientComponentClient()
    const router = useRouter()
    const {setIsLogged} = useStore();

    const delete_cookie = () => {
        document.cookie = "isLogged" + '=; Path=/; Expires='+new Date()+';';
    }

    useEffect(() => {
        const handleSignOut = async () => {
            await supabase.auth.signOut()
            delete_cookie();
            setIsLogged('');
            router.replace('/login');
        }
        handleSignOut();
    }, []);

    return (
        <div>
        </div>
    )
}