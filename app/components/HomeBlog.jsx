"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';

const HomeBlog = () => {
    const [blogs, setBlogs] = useState([]);
    var currentDate = new Date().toISOString();

    useEffect(() => {
        const supabase = createClientComponentClient();

        const getData = async () => {
            const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false }).limit(3);
            setBlogs(data);
        };

        getData();
    }, []);

    return (
        <div className='flex flex-col gap-2'>
            <h1 className="text-2xl mt-5">Latest Blogs</h1>
            <div className='grid lg:grid-cols-3 lg:gap-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-2'>
                {blogs.map((blog, index) => (
                    <BlogCard
                        name={blog.title}
                        key={index}
                        authName={blog.authorName}
                        desc={blog.body}
                        categ={blog.category}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeBlog;
