"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useState } from 'react'
import useStore from '../context/store'

const Page = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [updated, setUpdated] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errEmail, setErrEmail] = useState('');
  const supabase = createClientComponentClient()
  const { setIsLogged } = useStore();

  const resetForm = () => {
    setName('');
  }

  const resetPassword = async (e) => {
    e.preventDefault();

    if (errEmail === '') {
      try {
        console.log(email);
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
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (name !== '') {

      const { data: { user } } = await supabase.auth.getUser();
      const userEmail = user.email;

      try {
        const { error } = await supabase
          .from('users')
          .update({ name: name })
          .eq('email', userEmail);

        if (error) {
          throw error;
        }

        setUpdated(true);
        setIsLogged(name);
      }
      catch (error) {
        console.log(error);
      }
      resetForm();
    }
  }

  const validateEmail = (e) => {
    const { name, value } = e.target;

    var atPos = value.indexOf("@");
    var dotPos = value.lastIndexOf(".");
    const valid = atPos > 0 && dotPos > atPos + 1 && dotPos < value.length - 1 && value.trim() !== '';
    if (!valid) {
      setErrEmail("Enter a valid email");
    } else {
      setErrEmail('');
    }
    setEmail(value);
  }

  return (
    <div className="form-control h-screen flex-1 flex-col space-y-5 mt-4">
      <h1 className='text-2xl mt-8'>Update Profile</h1>
      {
        updated &&
        <div className="alert w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Name updated</span>
        </div>
      }
      <label className="label">
        <span className="label-text text-lg">Update Name</span>
      </label>
      <input name='name' placeholder='Enter your name' type="text" onChange={(e) => setName(e.target.value)} value={name} className="input input-bordered max-w-xs w-60" />
      {name === '' && <span className="text-sm text-red-500 max-w-xs mt-2">Name should not be empty</span>}
      <button onClick={() => window.my_modal_2.showModal()} className='w-fit'>
        <span className="text-blue-500 w-fit">Reset Password?</span>
      </button>
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box w-fit flex flex-col">
          {
            isSent &&
            <div className="alert w-fit">
              <span>Check inbox for reset link</span>
            </div>
          }
          <label className="label">
            <span className="label-text text-lg">Email</span>
          </label>
          <input name='email' placeholder='Enter Email' type="email" onChange={validateEmail} value={email} className="input input-bordered max-w-xs w-60" />
          {errEmail !== '' && <span className="text-sm text-red-500 max-w-xs mt-2">{errEmail}</span>}
          <div className='flex justify-center'>
            <button onClick={resetPassword} className="mt-4 w-fit btn btn-neutral">Confirm</button>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <button onClick={handleUpdate} className='btn btn-neutral w-28'>Update</button>
    </div>
  )
}

export default Page