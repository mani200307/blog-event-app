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

    const setCookie = (cookieName, cookieValue, expiryDate) => {
        var d = new Date();
        d.setTime(d.getTime() + (expiryDate * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + "; " + expires + "; path=/";
    }

    const handleSignIn = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) {
            console.log(error);
            alert("Incorrect password")
        }
        else {
            setCookie("isLogged", "true", new Date());
            console.log("Success");
            router.refresh()
            router.replace(`/`)
        }
    }

    return (
        <div className="form-control h-screen flex-1 flex-col space-y-5 w-full max-w-xs">
            <h1 className='text-2xl mt-8'>Sign in</h1>
            <div>
                <label className="label">
                    <span className="label-text text-lg">Email</span>
                </label>
                <input name='email' placeholder='Enter you email' type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="input input-bordered border-gray-300 max-w-xs w-60" />
                <label className="label">
                    <span className="label-text text-lg">Password</span>
                </label>
                <input type="password" placeholder='Set a strong password' name="password" onChange={(e) => setPassword(e.target.value)} value={password} className="input input-bordered border-gray-300 max-w-xs w-60" />
            </div>
            <button onClick={handleSignIn} className='btn w-28'>Sign in</button>
            <h1 className='text-sm'>New User? <Link href='/signup' className='text-blue-500'>Sign up</Link></h1>
        </div>
    )
}