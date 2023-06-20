"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';

const HomeBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    var currentDate = new Date().toISOString();

    useEffect(() => {
        const supabase = createClientComponentClient();

        const getData = async () => {
            setLoading(true)
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(3);

            setLoading(false)
            setBlogs(data);
        };

        getData();
    }, []);

    return (
        <div className='flex flex-col gap-2'>
            <h1 className="text-2xl mt-5">Latest Blogs</h1>
            {loading && <span className="mb-3 mt-1 loading loading-spinner loading-md"></span>}
            <div className="grid mb-3 lg:grid-cols-3 lg:gap-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-2">
                {blogs.map((blog, index) => (
                    <div key={index} className="flex flex-col h-full">
                        <BlogCard name={blog.title} authName={blog.authorName} desc={blog.body} categ={blog.category} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeBlog;
