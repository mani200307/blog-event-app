import React from 'react'
import pic from '../assets/user.png'
import Image from 'next/image'
import Link from 'next/link'

const Avatar = () => {
    return (
        <div className="dropdown mr-3">
            <div tabIndex={0} className="avatar btn hover:bg-white bg-white w-16 border-none opacity-50 rounded-full right-0 relative">
                <div className="w-10 rounded-full">
                    <Image alt='user' src={pic} />
                </div>
            </div>
            <ul tabIndex={0} className="dropdown-content bg-white menu p-2 shadow-xl text-black rounded-box">
                <li><Link href=''>Profile</Link></li>
                <li><Link href=''>Logout</Link></li>
            </ul>
        </div>
    )
}

export default Avatar