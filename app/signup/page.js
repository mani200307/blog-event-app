'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signed, setSigned] = useState(false);
    const router = useRouter()
    const supabase = createClientComponentClient()

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })
        try {
            const { error } = await supabase
                .from('users')
                .insert({ name: name, email: email })
                .single();
        }
        catch(error){
            console.log(error);
        }
        router.refresh()
        setSigned(true);
        resetForm();
    }

    return (
        <div className="form-control h-screen flex-1 flex-col space-y-5 mt-4">
            <h1 className='text-2xl mt-8'>Sign Up</h1>
            {
                signed &&
                <div className="alert w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>Check you mailbox to confirm signup</span>
                </div>
            }
            <div>
                <label className="label">
                    <span className="label-text text-lg">Name</span>
                </label>
                <input name='name' placeholder='Enter your name' type="text" onChange={(e) => setName(e.target.value)} value={name} className="input input-bordered max-w-xs w-60" />
                <label className="label">
                    <span className="label-text text-lg">Email</span>
                </label>
                <input name='email' placeholder='Enter your email' type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="input input-bordered max-w-xs w-60" />
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