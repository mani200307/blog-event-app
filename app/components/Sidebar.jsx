import React from 'react'
import Link from 'next/link';
import { Bars3Icon } from '@heroicons/react/24/outline';

const Sidebar = () => {

    return (
        <div className="drawer h-10 bg-white gap-5 flex w-80 flex-col md:w-1/12 sm:w-1/12 xs:w-1/6 lg:mr-32 md:mr-3 xs:mr-2">
            <div className="drawer lg:drawer-open lg:h-full">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col pt-5 px-2 items-center justify-center">
                    <label htmlFor="my-drawer-2" className="btn bg-white border-none drawer-button lg:hidden">
                        <Bars3Icon
                            className="block h-5 w-5 xs:h-3 xs:w-3 text-black"
                            aria-hidden="true"
                        />
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <div className="menu p-4 w-60 xs:w-44 h-full bg-black text-white">
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center pl-1 gap-4'>
                                <Link href='/'><h1 className='text-2xl font-medium cursor-pointer'>BlogEvent</h1></Link>
                            </div>
                        </div>
                        <div className='divider'></div>
                        <div className='flex flex-col items-start gap-2 mt-3'>
                            <Link href='/blog/create' className='text-xl flex items-center cursor-pointer hover:bg-gray-800 p-2 rounded w-full overflow-hidden whitespace-nowrap'><h1>Create Blog</h1></Link>
                            <Link href='/blog/view' className='text-xl flex items-center cursor-pointer hover:bg-gray-800 p-2 rounded w-full overflow-hidden whitespace-nowrap'><h1>View Blogs</h1></Link>
                            <Link href='/event/create' className='text-xl flex items-center cursor-pointer hover:bg-gray-800 p-2 rounded w-full overflow-hidden whitespace-nowrap'><h1>Schedule Event</h1></Link>
                            <Link href='/event/view' className='text-xl flex items-center cursor-pointer hover:bg-gray-800 p-2 rounded w-full overflow-hidden whitespace-nowrap'><h1>View Events</h1></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Sidebar