"use client"

import React from 'react';
import Link from 'next/link';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { create } from 'zustand';

const useActivePageStore = create((set) => ({
    activePage: '',
    setActivePage: (page) => set(() => ({ activePage: page })),
}));

const Sidebar = () => {
    const setActivePage = useActivePageStore((state) => state.setActivePage);
    const activePage = useActivePageStore((state) => state.activePage);

    return (
        <div className="drawer bg-white gap-5 flex w-80 flex-col md:w-1/12 sm:w-1/12 xs:w-1/6 lg:mr-32 md:mr-3 xs:mr-2">
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
                    <div className="menu flex justify-between p-4 w-60 xs:w-44 h-full bg-black text-white">
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center pl-1 gap-4'>
                                <Link href="/">
                                    <span
                                        className={`className='font-medium cursor-pointer' }`}
                                        onClick={() => setActivePage('')}
                                    >
                                        <h1 className='text-2xl'>BlogEvent</h1>
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className='flex flex-col justify-between items-start gap-4 mt-3'>
                            <Link href="/blog/create">
                                <span
                                    className={`text-xl flex items-center cursor-pointer hover:bg-gray-800 p-2 rounded w-36 overflow-hidden whitespace-nowrap ${activePage === 'createBlog' ? 'bg-gray-900' : ''
                                        }`}
                                    onClick={() => setActivePage('createBlog')}
                                >
                                    <h1>Create Blog</h1>
                                </span>
                            </Link>
                            <Link href="/blog/view">
                                <span
                                    className={`text-xl flex items-center cursor-pointer hover:bg-gray-800 p-2 rounded w-36 overflow-hidden whitespace-nowrap ${activePage === 'viewBlogs' ? 'bg-gray-900' : ''
                                        }`}
                                    onClick={() => setActivePage('viewBlogs')}
                                >
                                    <h1>View Blogs</h1>
                                </span>
                            </Link>
                            <Link href="/event/create">
                                <span
                                    className={`text-xl flex items-center cursor-pointer hover:bg-gray-800 p-2 rounded w-full overflow-hidden whitespace-nowrap ${activePage === 'createEvent' ? 'bg-gray-900' : ''
                                        }`}
                                    onClick={() => setActivePage('createEvent')}
                                >
                                    <h1>Schedule Event</h1>
                                </span>
                            </Link>
                            <Link href="/event/view">
                                <span
                                    className={`text-xl flex items-center cursor-pointer hover:bg-gray-800 p-2 rounded w-36 overflow-hidden whitespace-nowrap ${activePage === 'viewEvents' ? 'bg-gray-900' : ''
                                        }`}
                                    onClick={() => setActivePage('viewEvents')}
                                >
                                    <h1>View Events</h1>
                                </span>
                            </Link>
                        </div>
                        <div className='divider'></div>
                        <Link href='/logout'>
                            <span
                                className={`text-xl flex items-center justify-center cursor-pointer hover:bg-gray-900 p-2 rounded w-full overflow-hidden whitespace-nowrap }`}
                                onClick={() => setActivePage('')}
                            >
                                <h1>Logout</h1>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Sidebar