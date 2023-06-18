import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomeCard = ({ type, desc, linkUrl, imgUrl }) => {
    return (
        <div className="flex lg:w-96 md:w-96 sm:w-80 xs:w-72 rounded-xl shadow-xl">
            <figure><Image width={500} height={500} alt={`${type}`} src={imgUrl} /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {type}
                </h2>
                <p>{desc}</p>
                <div className="flex flex-row justify-end gap-5">
                    <Link href={`/${linkUrl}/create`}><button className='btn'>Create</button></Link>
                    <Link href={`/${linkUrl}/view`}><button className='btn'>View</button></Link>
                </div>
            </div>
        </div>
    )
}

export default HomeCard