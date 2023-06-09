import React from 'react'

const Header = () => {
    return (
        <div className='flex justify-between'>
            <h1 className="text-2xl">Welcome User</h1>
            <div className="avatar right-0 relative">
                <div className="w-10 rounded-full">
                    <img src='.../public/next.svg' alt='User'/>
                </div>
            </div>
        </div>
    )
}

export default Header