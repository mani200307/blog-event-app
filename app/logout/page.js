'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
    const supabase = createClientComponentClient()
    const router = useRouter()

    useEffect(() => {
        const handleSignOut = async () => {
            await supabase.auth.signOut()
            router.replace('/');
        }
        handleSignOut();
    }, []);

    return (
        <div>
        </div>
    )
}