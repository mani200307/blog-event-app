import Link from 'next/link'
import React from 'react'

const HomeCard = ({ type, desc }) => {
    return (
        <div className="flex h-96 lg:w-96 md:w-96 sm:w-80 xs:w-72 xs:h-48 rounded-xl bg-base-100 shadow-xl">
            <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="blog" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {type}
                </h2>
                <p>{desc}</p>
                <div className="card-actions justify-end gap-5">
                    <Link href='/blog/create'><button className='btn'>New</button></Link>
                    <Link href='/blog/view'><button className='btn'>View</button></Link>
                </div>
            </div>
        </div>
    )
}

export default HomeCard