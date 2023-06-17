'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleSignUp = async () => {
        await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })
        router.refresh()
        alert("Goto to your mailbox to confirm signup")
    }

    return (
        <div className="form-control h-screen flex-1 flex-col space-y-5 w-full max-w-xs">
            <h1 className='text-2xl mt-8'>Sign Up</h1>
            <div>
                <label className="label">
                    <span className="label-text text-lg">Email</span>
                </label>
                <input name='email' placeholder='Enter you email' type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="input input-bordered max-w-xs w-60" />
                <label className="label">
                    <span className="label-text text-lg">Password</span>
                </label>
                <input type="password" placeholder='Set a strong password' name="password" onChange={(e) => setPassword(e.target.value)} value={password} className="input input-bordered max-w-xs w-60" />
            </div>
            <button onClick={handleSignUp} className='btn w-28'>Register</button>
            <h1 className='text-sm'>Already registered? <Link href='/login' className='text-blue-500'>Sign in</Link></h1>
        </div>
    )
}