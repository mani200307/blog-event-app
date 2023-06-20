"use client"

import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const Page = () => {

    const [password, setPassword] = useState('');
    const [isUpdated, setIsUpdated] = useState(false);
    const supabase = createClientComponentClient();

    const handleReset = async (e) => {
        e.preventDefault();

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
            <div>
                <label className="label">
                    <span className="label-text text-lg">Password</span>
                </label>
                <input type="password" placeholder='Set a strong password' name="password" onChange={(e) => setPassword(e.target.value)} value={password} className="input input-bordered max-w-xs w-60" />
            </div>
            <button onClick={handleReset} className='btn w-28'>Reset</button>
        </div>
    )
}

export default Page