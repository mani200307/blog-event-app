'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signed, setSigned] = useState(false);
    const [errName, setErrName] = useState('');
    const [errEmail, setErrEmail] = useState('');
    const [errPass, setErrPass] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClientComponentClient();

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
    };

    const validateForm = (e) => {
        const { name, value } = e.target;

        if (name === 'name') {
            if (value.trim() === '') {
                setErrName("It shouldn't be empty");
            } else {
                setErrName('');
            }
            setName(value);
        } else if (name === 'email') {
            var atPos = value.indexOf("@");
            var dotPos = value.lastIndexOf(".");
            const valid = atPos > 0 && dotPos > atPos + 1 && dotPos < value.length - 1 && value.trim() !== '';
            if (!valid) {
                setErrEmail("Enter a valid email");
            } else {
                setErrEmail('');
            }
            setEmail(value);
        } else if (name === 'password') {
            const passwordInputValue = value.trim();
            const uppercaseRegEx = /(?=.*?[A-Z])/;
            const lowercaseRegEx = /(?=.*?[a-z])/;
            const digitsRegEx = /(?=.*?[0-9])/;
            const specialCharRegEx = /(?=.*?[#?!@$%^&*-])/;
            const minLengthRegEx = /.{8,}/;

            const passwordLength = passwordInputValue.length;
            const uppercasePassword = uppercaseRegEx.test(passwordInputValue);
            const lowercasePassword = lowercaseRegEx.test(passwordInputValue);
            const digitsPassword = digitsRegEx.test(passwordInputValue);
            const specialCharPassword = specialCharRegEx.test(passwordInputValue);
            const minLengthPassword = minLengthRegEx.test(passwordInputValue);

            let errMsg = '';

            if (passwordLength === 0) {
                errMsg = 'Password is empty';
            } else if (!uppercasePassword) {
                errMsg = 'At least one Uppercase';
            } else if (!lowercasePassword) {
                errMsg = 'At least one Lowercase';
            } else if (!digitsPassword) {
                errMsg = 'At least one digit';
            } else if (!specialCharPassword) {
                errMsg = 'At least one Special Characters';
            } else if (!minLengthPassword) {
                errMsg = 'At least minimum 8 characters';
            } else {
                errMsg = '';
            }

            setErrPass(errMsg);
            setPassword(value);
        }
    };

    const handleSignUp = async (e) => {
        setSigned(false);
        e.preventDefault();

        if (!(errName !== '' || errEmail !== '' || errPass !== '')) {
            setLoading(true);
            await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                },
            });
            try {
                const { error } = await supabase.from('users').insert({ name, email }).single();
                if (error) {
                    throw error;
                }
            } catch (error) {
                console.log(error);
            }
            router.replace('/');
            setSigned(true);
            resetForm();
            setLoading(false);
        }
    };

    return (
        <div className="form-control h-screen flex-1 flex-col space-y-5 mt-4">
            <h1 className="text-2xl mt-8">Sign Up</h1>
            {signed && (
                <div className="alert w-fit">
                    <span>Check your mailbox to confirm signup</span>
                </div>
            )}
            <div>
                <label className="label">
                    <span className="label-text text-lg">Name</span>
                </label>
                <div className="flex flex-col">
                    <input name="name" placeholder="Enter your name" type="text" value={name} onChange={validateForm} className="input input-bordered max-w-xs w-60" />
                    {errName !== '' && <span className="text-sm text-red-500 max-w-xs mt-2">{errName}</span>}
                </div>
                <label className="label">
                    <span className="label-text text-lg">Email</span>
                </label>
                <div className="flex flex-col">
                    <input name="email" placeholder="Enter your email" type="email" value={email} onChange={validateForm} className="input input-bordered max-w-xs w-60" />
                    {errEmail !== '' && <span className="text-sm text-red-500 max-w-xs mt-2">{errEmail}</span>}
                </div>
                <div className="flex flex-col">
                    <label className="label">
                        <span className="label-text text-lg">Password</span>
                    </label>
                    <input type="password" placeholder="Set a strong password" name="password" onChange={validateForm} value={password} className="input input-bordered max-w-xs w-60" />
                    {errPass !== '' && <span className="text-sm text-red-500 max-w-xs mt-2">{errPass}</span>}
                </div>
            </div>
            {loading ? <span className="loading loading-spinner loading-md"></span> :
                <button onClick={handleSignUp} className="btn w-28">
                    Register
                </button>
            }
            <h1 className="text-sm">
                Already registered? <Link href="/login" className='text-blue-500'>Sign in</Link>
            </h1>
        </div>
    );
}
