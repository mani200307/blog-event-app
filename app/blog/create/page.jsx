import React from 'react'

const page = () => {
    return (
        <form class="w-full flex mt-7 lg:flex-row md:flex-row sm:flex-col xs:flex-col">
            <h1 className='text-2xl text-black'>Create Blog</h1>
            <div className="h-screen flex lg:flex-row md:flex-row sm:flex-col xs:flex-col gap-5 bg-white text-black mt-4 pt-8">
                <div className="form-control lg:flex-1 md:flex-1 flex-col space-y-5 w-full max-w-xs">
                    <div>
                        <label className="label">
                            <span className="label-text text-black text-lg">What is your blog's title?</span>
                        </label>
                        <input type="text" placeholder="Blog title" className="input input-bordered border-gray-300 bg-white text-black max-w-xs w-60" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text text-black text-lg">What is your name?</span>
                        </label>
                        <input type="text" placeholder="Blog title" className="input input-bordered border-gray-300 bg-white text-black max-w-xs w-60" />
                    </div>
                    <div className="w-full bg-white text-black max-w-xs">
                        <label className="label">
                            <span className="label-text text-black text-lg">What is your blog's category?</span>
                        </label>
                        <select className="select select-md bg-white text-black select-bordered border-gray-300">
                            <option disabled selected>Select category</option>
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
                            <span className="label-text text-black text-lg">About your blog</span>
                        </label>
                        <textarea placeholder="Blog description" className="input input-lg input-bordered border-gray-300 bg-white text-black max-w-xs w-80 h-60" />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default page