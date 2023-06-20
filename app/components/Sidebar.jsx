"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { create } from 'zustand';
import useStore from '../context/store';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const useActivePageStore = create((set) => ({
    activePage: '',
    setActivePage: (page) => set(() => ({ activePage: page })),
}));

const Sidebar = () => {
    const setActivePage = useActivePageStore((state) => state.setActivePage);
    const activePage = useActivePageStore((state) => state.activePage);
    const supabase = createClientComponentClient()
    const router = useRouter()
    const [theme, setTheme] = useState('');
    const { isLogged, setIsLogged } = useStore();

    const handleToggle = (e) => {
        if (e.target.checked)
            setTheme('dark');
        else
            setTheme('light');
    };

    const delete_cookie = () => {
        document.cookie = "isLogged" + '=; Path=/; Expires=' + new Date() + ';';
    }

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'light';
        setTheme(storedTheme);
        document.querySelector('html').setAttribute('data-theme', storedTheme);
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);

    const handleSignOut = async () => {
        setActivePage('');
        await supabase.auth.signOut()
        delete_cookie();
        setIsLogged('');
        router.replace('/login');
    }

    return (
        <div className="drawer gap-5 flex w-80 flex-col md:w-1/12 sm:w-1/12 xs:w-1/6 lg:mr-32 md:mr-3 xs:mr-2">
            <div className="drawer lg:drawer-open lg:h-full">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col pt-5 px-2 items-center justify-center">
                    <label htmlFor="my-drawer-2" className="btn btn-ghost border-none drawer-button lg:hidden">
                        <Bars3Icon
                            className="block h-5 w-5 xs:h-3 xs:w-3"
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
                            {isLogged !== "" ? (
                                <Link href="/profile">
                                    <span
                                        className={`text-xl flex items-center cursor-pointer hover:bg-gray-800 p-2 rounded w-36 overflow-hidden whitespace-nowrap ${activePage === 'profile' ? 'bg-gray-900' : ''
                                            }`}
                                        onClick={() => setActivePage('profile')}
                                    >
                                        <h1>Profile</h1>
                                    </span>
                                </Link>
                            ) : <Link href='/' className='invisible'><span><h1>Profile</h1></span></Link>}
                        </div>
                        <div className='divider invisible'></div>
                        <div className='divider invisible'></div>
                        <div className='flex items-center justify-center gap-3'>
                            <label className='text-lg'>Theme </label>
                            <label className="swap swap-rotate">
                                <input type="checkbox" onChange={handleToggle} checked={theme === 'light' ? false : true} />
                                <svg className="swap-on fill-current w-8 h-18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                                <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                            </label>
                        </div>
                        <div className='text-xl flex items-center justify-center cursor-pointer hover:bg-gray-900 p-2 rounded w-full overflow-hidden whitespace-nowrap' onClick={handleSignOut} >
                            {isLogged !== "" ? (
                            <h1>Logout</h1>
                            ) : <h1 className='invisible'>Logout</h1>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar