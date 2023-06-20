"use client"

import Header from '@/app/components/Header'
import React, { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const Page = () => {
    const supabase = createClientComponentClient()
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [category, setCategory] = useState("")
    const [body, setBody] = useState("")
    const [isCreated, setIsCreated] = useState(false);

    const resetForm = () => {
        setTitle('');
        setAuthor('');
        setCategory('');
        setBody('');
    }

    const changeName = () => {
        // setAuthor('Hello');
    }

    const createBlog = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('blogs')
                .insert({ title: title, authorName: author, category: category, body: body })
                .single()

            setIsCreated(true);
            resetForm();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className="h-screen overflow-x-hidden overflow-scroll w-full flex mt-7 lg:flex-col md:flex-col sm:flex-col xs:flex-col">
            <Header type='Create Blog' />
            {
                isCreated &&
                <div className="alert w-fit mt-2">
                    <span>Blog created successfully</span>
                </div>
            }
            <div className="flex lg:flex-row md:flex-row sm:flex-col xs:flex-col gap-5 mt-1 pt-4">
                <div className="form-control lg:flex-1 md:flex-1 flex-col space-y-5 w-full max-w-xs">
                    <div>
                        <label className="label">
                            <span className="label-text text-lg">What is your blog title?</span>
                        </label>
                        <input type="text" placeholder="Blog title" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered max-w-xs w-60" />
                    </div>
                    <div className='flex flex-col'>
                        <label className="label">
                            <span className="label-text text-lg">What is your name?</span>
                        </label>
                        <input type="text" placeholder="Author name" value={author} onChange={(e) => setAuthor(e.target.value)} className="input input-bordered max-w-xs w-60" />
                        <div className='flex gap-2 mt-1'><span className='text-sm'>Same as profile name?</span><input type='checkbox' onChange={changeName}/></div>
                    </div>
                    <div className="w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-lg">What is your blog category?</span>
                        </label>
                        <select onChange={(e) => setCategory(e.target.value)} value={category} className="select select-md select-bordered">
                            <option>Select Category</option>
                            <option>Other</option>
                            <option>Music</option>
                            <option>News</option>
                            <option>Technology</option>
                            <option>Sports</option>
                            <option>Art</option>
                        </select>
                    </div>
                </div>
                <div className="form-control flex-1 flex-col space-y-5 w-full max-w-xs">
                    <div>
                        <label className="label">
                            <span className="label-text text-lg">About your blog</span>
                        </label>
                        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Blog description" className="input input-lg input-bordered max-w-xs w-80 h-60" />
                    </div>
                    <button onClick={createBlog} className='btn btn-neutral w-fit'>CREATE</button>
                </div>
            </div>
        </form>
    )
}

export default Page