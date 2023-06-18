"use client"

import Header from '@/app/components/Header'
import React, { useEffect, useState } from 'react'
import BlogCard from '@/app/components/BlogCard'
import pic from '../../assets/filter.png'
import Image from 'next/image'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const Page = () => {

    const [blogs, setBlogs] = useState([]);
    const [category, setCategory] = useState();
    const supabase = createClientComponentClient()

    const clearFilter = () => {
        const getData = async () => {
            const { data, error } = await supabase
                .from('blogs')
                .select("*")

            setBlogs(data);
        }

        getData();
    }

    const applyFilter = () => {
        const getData = async () => {
            const { data, error } = await supabase
                .from('blogs')
                .select("*")
                .eq('category', category)

            console.log(data);
            setBlogs(data);
        }

        getData();
    }

    useEffect(() => {

        const getData = async () => {
            const { data, error } = await supabase
                .from('blogs')
                .select("*")

            console.log(data);
            setBlogs(data);
        }

        getData();

    }, [])

    return (
        <div className="h-screen overflow-x-hidden overflow-scroll bg-white pt-8 px-4 flex-1">
            <Header type='Blogs' />
            <div className='flex gap-10 mt-7'>
                <button onClick={() => window.my_modal_2.showModal()}>
                    <div className="w-10 rounded-full flex gap-2">
                        <Image alt='filter' width={20} height={20} src={pic} /><span
                            className='no-underline text-black'>Filter</span>
                    </div>
                </button>
                <div onClick={clearFilter} className="border-gray-500 bg-gray-400 flex items-center hover:cursor-pointer px-2 rounded-full">
                    <h1 className='text-black text-sm mr-1'>X</h1><span className='no-underline text-sm text-white'>Clear Filter</span>
                </div>
            </div>
            <dialog id="my_modal_2" className="modal">
                <form method="dialog" className="modal-box w-fit">
                    <h1 className='text-xl'>Filter</h1>
                    <div className="w-full max-w-xs">
                        <label className="label">
                            <span className="label-texttext-lg">Category</span>
                        </label>
                        <select onChange={(e) => setCategory(e.target.value)} className="select select-md select-bordered border-gray-300">
                            <option disabled>Select category</option>
                            <option defaultChecked>Other</option>
                            <option>Music</option>
                            <option>News</option>
                            <option>Technology</option>
                            <option>Sports</option>
                            <option>Art</option>
                        </select>
                    </div>
                    <button onClick={applyFilter} className='mt-4 btn'>Apply</button>
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            <div className='grid mb-3 lg:grid-cols-3 lg:gap-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-2'>
                {blogs.map((blog, index) => (
                    <BlogCard name={blog.title} key={index} authName={blog.authorName} desc={blog.body} categ={blog.category} />
                ))}
            </div>
        </div>
    )
}

export default Page