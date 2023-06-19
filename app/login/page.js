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
    const [failed, setFailed] = useState(false);

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
            setFailed(true);
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
                {
                    failed &&
                    <div className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Incorrect password</span>
                    </div>
                }
                <label className="label">
                    <span className="label-text text-lg">Email</span>
                </label>
                <input name='email' placeholder='Enter you email' type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="input input-bordered max-w-xs w-60" />
                <label className="label">
                    <span className="label-text text-lg">Password</span>
                </label>
                <input type="password" placeholder='Set a strong password' name="password" onChange={(e) => setPassword(e.target.value)} value={password} className="input input-bordered max-w-xs w-60" />
            </div>
            <button onClick={handleSignIn} className='btn w-28'>Sign in</button>
            <h1 className='text-sm'>New User? <Link href='/signup' className='text-blue-500'>Sign up</Link></h1>
        </div>
    )
}