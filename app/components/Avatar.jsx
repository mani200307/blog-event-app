import React from 'react'
import pic from '../assets/user.png'
import Image from 'next/image'
import Link from 'next/link'

const Avatar = () => {
    return (
        <div className="dropdown mr-3">
            <div tabIndex={0} className="avatar btn hover:bg-white bg-white w-16 rounded-full right-0 relative">
                <div className="w-10 rounded-full">
                    <Image src={pic} />
                </div>
            </div>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
                <li><Link href=''>Profile</Link></li>
                <li><Link href=''>Logout</Link></li>
            </ul>
        </div>
    )
}

export default Avatar