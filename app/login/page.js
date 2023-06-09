'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useStore from '../context/store'

export default function Page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const supabase = createClientComponentClient()
    const [failed, setFailed] = useState(false);
    const { isLogged, setIsLogged } = useStore();
    const [isSent, setIsSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [signed, setSigned] = useState(false);

    const setCookie = (cookieName, cookieValue, expiryDate) => {
        var d = new Date();
        d.setTime(d.getTime() + (expiryDate * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + "; " + expires + "; path=/";
    }

    useEffect(() => {
        if (isLogged) {
            router.push('/');
        }
    }, [isLogged]);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
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
            setFailed(false)
            setSigned(true);

            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', email);

            setIsLogged(data[0].name);
            router.refresh();
            router.push('/')
        }
        setLoading(false);
    }

    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${location.origin}/account/update-password`,
            });

            if (error)
                throw error;

            setIsSent(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="form-control h-screen flex-1 flex-col space-y-5 w-full max-w-xs">
            <h1 className='text-2xl mt-8'>Sign in</h1>
            <div>
                {
                    failed &&
                    <div className="alert alert-error w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Incorrect email or password</span>
                    </div>
                }
                {
                    signed &&
                    <div className="alert alert-success w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Logged in</span>
                    </div>
                }
                {
                    signed &&
                    <div>
                        <Link href='/'><button className='btn btn-ghost capitalize text-lg mt-2'>Goto Home</button></Link>
                    </div>
                }
                <label className="label">
                    <span className="label-text text-lg">Email</span>
                </label>
                <input name='email' placeholder='Enter email' type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="input input-bordered max-w-xs w-60" />
                <label className="label">
                    <span className="label-text text-lg">Password</span>
                </label>
                <input type="password" placeholder='Enter password' name="password" onChange={(e) => setPassword(e.target.value)} value={password} className="input input-bordered max-w-xs w-60" />
            </div>
            {loading ? <span className="loading loading-spinner loading-md"></span> : <button onClick={handleSignIn} className='btn w-28'>Sign in</button>}
            <button onClick={() => window.my_modal_2.showModal()}>
                <div className="w-fit">
                    <span className="text-blue-500 text-sm w-fit">Forgot Password?</span>
                </div>
            </button>
            <dialog id="my_modal_2" className="modal">
                <form method="dialog" className="modal-box w-fit flex flex-col">
                    {
                        isSent &&
                        <div className="alert w-fit">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>Check inbox for reset link</span>
                        </div>
                    }
                    <label className="label">
                        <span className="label-text text-lg">Confirm to reset password</span>
                    </label>
                    <div className='flex justify-center'>
                        <button onClick={resetPassword} className="mt-4 w-fit btn">Confirm</button>
                    </div>
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            <h1>New User? <Link href='/signup' className='text-blue-500'>Sign up</Link></h1>
        </div>
    )
}