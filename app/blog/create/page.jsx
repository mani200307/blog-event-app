"use client"

import Header from '@/app/components/Header'
import React, { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import useStore from '@/app/context/store'

const Page = () => {
    const supabase = createClientComponentClient()
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [category, setCategory] = useState("")
    const [body, setBody] = useState("")
    const [isCreated, setIsCreated] = useState(false);
    const [errTitle, setErrTitle] = useState(' ');
    const [errAuthor, setErrAuthor] = useState(' ');
    const [errCategory, setErrCategory] = useState('Select a Category');
    const [errBody, setErrBody] = useState(' ');
    const [loading, setLoading] = useState(false);

    const { isLogged } = useStore();

    const resetForm = () => {
        setTitle('');
        setAuthor('');
        setCategory('');
        setBody('');
    }

    const validateForm = (e) => {
        const { name, value } = e.target;

        if (name === 'title') {
            if (value.trim() === '') {
                setErrTitle("Title shouldn't be empty");
            } else {
                setErrTitle('');
            }
            setTitle(value);
        } else if (name === 'author') {
            if (value.trim() === '') {
                setErrAuthor("Author name shouldn't be empty");
            } else {
                setErrAuthor('');
            }
            setAuthor(value);
        } else if (name === 'body') {
            if (value.trim() === '') {
                setErrBody("Body shouldn't be empty");
            }
            else if (value.split(' ').length - 1 < 25) {
                setErrBody("Write atleast 25 words")
            }
            else {
                setErrBody('');
            }
            setBody(value);
        } else if (name === 'category') {
            if (value.trim() === 'Select Category') {
                setErrCategory("Select a category");
            } else {
                setErrCategory('');
            }
            setCategory(value);
        }
    };

    const changeName = () => {
        if (!author) {
            setErrAuthor("");
            setAuthor(isLogged);
        }
        else {
            setErrAuthor("Author name shouldn't be empty");
            setAuthor('');
        }
    }

    const createBlog = async (e) => {
        e.preventDefault();
        if (!(errTitle !== '' || errAuthor !== '' || errCategory !== '' || errBody !== '')) {
            setLoading(true);
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
            setLoading(false);
        }
    }

    return (
        <form className="h-screen overflow-x-hidden overflow-scroll w-full flex mt-7 lg:flex-col md:flex-col sm:flex-col xs:flex-col">
            <Header type='Create Blog' />
            {
                isCreated &&
                <div className="alert alert-success w-fit mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Blog created successfully</span>
                </div>
            }
            <div className='flex flex-col mt-1 pt-4'>
                <div className="flex lg:flex-row md:flex-row sm:flex-col xs:flex-col gap-10">
                    <div className="form-control lg:flex-1 md:flex-1 flex-col space-y-5 w-full max-w-xs">
                        <div>
                            <label className="label">
                                <span className="label-text text-lg">What is your blog title?</span>
                            </label>
                            <div className="flex flex-col">
                                <input name='title' type="text" placeholder="Blog title" value={title} onChange={validateForm} className="input input-bordered max-w-xs w-60" />
                                {errTitle !== '' && <span className="text-sm text-red-500 max-w-xs mt-2">{errTitle}</span>}
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label className="label">
                                <span className="label-text text-lg">What is your name?</span>
                            </label>
                            <div className="flex flex-col">
                                <input name='author' type="text" placeholder="Author name" value={author} onChange={validateForm} className="input input-bordered max-w-xs w-60" />
                                <div className='flex gap-2 mt-1'><span className='text-sm'>Same as profile name?</span><input type='checkbox' onChange={changeName} /></div>
                                {errAuthor !== '' && <span className="text-sm text-red-500 max-w-xs mt-2">{errAuthor}</span>}
                            </div>
                        </div>
                        <div className="w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg">What is your blog category?</span>
                            </label>
                            <div className="flex flex-col">
                                <select name='category' onChange={validateForm} value={category} className="select select-md select-bordered">
                                    <option>Select Category</option>
                                    <option>Other</option>
                                    <option>Music</option>
                                    <option>News</option>
                                    <option>Technology</option>
                                    <option>Sports</option>
                                    <option>Art</option>
                                </select>
                                {errCategory !== '' && <span className="text-sm text-red-500 max-w-xs mt-2">{errCategory}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="form-control flex-1 flex-col space-y-5 w-full max-w-xs">
                        <div>
                            <label className="label">
                                <span className="label-text text-lg">About your blog</span>
                            </label>
                            <div className="flex flex-col">
                                <textarea name='body' value={body} onChange={validateForm} placeholder="Blog description" className="input leading-7 input-lg input-bordered max-w-xs w-80 h-80" />
                                {errBody !== '' && <span className="text-sm text-red-500 max-w-xs mt-2">{errBody}</span>}
                            </div>
                        </div>
                    </div>
                </div>
                {loading ? <span className="loading loading-spinner loading-md mb-2 ms-10 mt-10"></span> :
                    <button onClick={createBlog} className="btn btn-neutral w-fit mb-2 ms-10 mt-10">
                        CREATE
                    </button>
                }
            </div>
        </form>
    )
}

export default Page