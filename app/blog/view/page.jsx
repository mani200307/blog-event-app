"use client"

import Header from '@/app/components/Header'
import React, { useEffect, useState } from 'react'
import BlogCard from '@/app/components/BlogCard'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const page = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {

        const supabase = createClientComponentClient()

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
        <div className="h-auto bg-white pt-8 px-4 flex-1">
            <Header type='View Blogs' />
            <div className='mt-10 grid lg:grid-cols-3 lg:gap-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-2'>
                {blogs.map((blog, index) => (
                    <BlogCard name={blog.title} key={index} authName={blog.authorName} desc={blog.body} categ={blog.category} />
                ))}
            </div>
        </div>
    )
}

export default page