"use client"

import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const Page = () => {

    const [password, setPassword] = useState('');
    const [isUpdated, setIsUpdated] = useState(false);
    const [errPass, setErrPass] = useState('');
    const supabase = createClientComponentClient();

    const handleReset = async (e) => {
        e.preventDefault();

        if (errPass === '') {
            try {
                const { error } = await supabase.auth.updateUser({ password: password })
                if (error)
                    throw error;
                setIsUpdated(true)
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    const validateForm = (e) => {
        const { name, value } = e.target;

        if (name === 'password') {
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

    return (
        <div className="form-control h-screen flex-1 flex-col space-y-5 mt-4">
            {
                isUpdated &&
                <div className="alert w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>Password updated successfully</span>
                </div>
            }
            <h1 className='text-2xl mt-8'>Reset Password</h1>
            <div className="flex flex-col">
                <label className="label">
                    <span className="label-text text-lg">Password</span>
                </label>
                <input type="password" placeholder="Set a strong password" name="password" onChange={validateForm} value={password} className="input input-bordered max-w-xs w-60" />
                {errPass !== '' && <span className="text-sm text-red-500 max-w-xs mt-2">{errPass}</span>}
            </div>
            <button onClick={handleReset} className='btn w-28'>Reset</button>
        </div>
    )
}

export default Page