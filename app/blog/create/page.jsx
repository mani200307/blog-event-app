"use client"

import Header from '@/app/components/Header'
import React, { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const page = () => {
    const supabase = createClientComponentClient()
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [category, setCategory] = useState("")
    const [body, setBody] = useState("")

    const createBlog = async () => {
        try {
            setLoading(true)

            const { error } = await supabase
                .from('blogs')
                .insert({ title: title, authorName: author, category: category, body: body })
                .single()

            console.log({ title: title, authorName: author, category: category, body: body });

            alert("Blog created successfully");

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className="w-full flex mt-7 lg:flex-col md:flex-col sm:flex-col xs:flex-col">
            <Header type='Create Blog' />
            <div className="h-screen flex lg:flex-row md:flex-row sm:flex-col xs:flex-col gap-5 mt-4 pt-8">
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
                        <input type="text" placeholder="Blog title" onChange={(e) => setAuthor(e.target.value)} className="input input-bordered border-gray-300 max-w-xs w-60" />
                    </div>
                    <div className="w-fullmax-w-xs">
                        <label className="label">
                            <span className="label-texttext-lg">What is your blog category?</span>
                        </label>
                        <select onChange={(e) => setCategory(e.target.value)} className="select select-md select-bordered border-gray-300">
                            <option disabled>Select category</option>
                            <option defaultChecked>Music</option>
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
                    <button onClick={createBlog} className='btn w-fit'>CREATE</button>
                    {/* {loading ? <h1>Creating blog..</h1> : <h1>Blog created successfully</h1>} */}
                </div>
            </div>
        </form>
    )
}

export default page