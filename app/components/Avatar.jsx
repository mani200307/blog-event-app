import React from 'react'
import pic from '../assets/user.png'
import Image from 'next/image'
import Link from 'next/link'

const Avatar = () => {

    return (
        <div className="dropdown mr-5 mt-1 lg:visible md:visible sm:visible xs:invisible">
            <div tabIndex={0} className="avatar cursor-pointer w-16 border-none opacity-50 rounded-full right-0 relative">
                <div className="w-10 rounded-full">
                    <Image alt='user' src={pic} />
                </div>
            </div>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow-xl rounded-box">
                <li><Link href='/profile'>Profile</Link></li>
            </ul>
        </div>
    )
}

export default Avatar