import React from 'react'
import Avatar from './Avatar'

const Header = () => {
    return (
        <div className='flex justify-between text-black'>
            <h1 className="text-2xl">Welcome User</h1>
            <Avatar />
        </div>
    )
}

export default Header