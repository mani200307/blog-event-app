'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function page() {
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
    }

    // const handleSignIn = async () => {
    //     await supabase.auth.signInWithPassword({
    //         email,
    //         password,
    //     })
    //     router.refresh()
    // }

    // const handleSignOut = async () => {
    //     await supabase.auth.signOut()
    //     router.refresh()
    // }

    return (
        <div className="form-control flex-1 flex-col space-y-5 w-full max-w-xs">
            <h1 className='text-2xl text-black mt-8'>Sign Up</h1>
            <div>
                <label className="label">
                    <span className="label-text text-black text-lg">Email</span>
                </label>
                <input name='email' placeholder='Enter you email' type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="input input-bordered border-gray-300 bg-white text-black max-w-xs w-60" />
                <label className="label">
                    <span className="label-text text-black text-lg">Password</span>
                </label>
                <input type="password" placeholder='Set a strong password' name="password" onChange={(e) => setPassword(e.target.value)} value={password} className="input input-bordered border-gray-300 bg-white text-black max-w-xs w-60" />
            </div>
            <button onClick={handleSignUp} className='btn w-28'>Register</button>
        </div>
    )
}