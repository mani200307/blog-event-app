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

    const createBlog = async () => {
        try {
            const { error } = await supabase
                .from('blogs')
                .insert({ title: title, authorName: author, category: category, body: body })
                .single()

            setIsCreated(true);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className="h-screen overflow-x-hidden overflow-scroll w-full flex mt-7 lg:flex-col md:flex-col sm:flex-col xs:flex-col">
            <Header type='Create Blog' />
            {
                isCreated &&
                <div className="alert w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>Blog created successfully</span>
                </div>
            }
            <div className="flex lg:flex-row md:flex-row sm:flex-col xs:flex-col gap-5 mt-4 pt-8">
                <div className="form-control lg:flex-1 md:flex-1 flex-col space-y-5 w-full max-w-xs">
                    <div>
                        <label className="label">
                            <span className="label-text text-black text-lg">What is your blog title?</span>
                        </label>
                        <input type="text" placeholder="Blog title" onChange={(e) => setTitle(e.target.value)} className="input input-bordered border-gray-300 max-w-xs w-60" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text text-black text-lg">What is your name?</span>
                        </label>
                        <input type="text" placeholder="Author name" onChange={(e) => setAuthor(e.target.value)} className="input input-bordered border-gray-300 max-w-xs w-60" />
                    </div>
                    <div className="w-full max-w-xs">
                        <label className="label">
                            <span className="label-texttext-lg">What is your blog category?</span>
                        </label>
                        <select onChange={(e) => setCategory(e.target.value)} className="select select-md select-bordered border-gray-300">
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
                        <textarea onChange={(e) => setBody(e.target.value)} placeholder="Blog description" className="input input-lg input-bordered border-gray-300max-w-xs w-80 h-60" />
                    </div>
                    <button onClick={createBlog} className='btn btn-neutral w-fit'>CREATE</button>
                </div>
            </div>
        </form>
    )
}

export default Page