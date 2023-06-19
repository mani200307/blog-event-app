import React from 'react'

const BlogCard = ({ name, authName, categ, desc }) => {
    return (
        <div className="cursor-context-menu flex flex-grow rounded-md h-fit lg:w-72 md:w-96 sm:w-96 xs:w-72 w-full shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{desc}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-neutral">{categ}</div>
                    <div className="badge badge-ghost">{authName}</div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard