import React from 'react'

const HomeCard = ({ type, desc }) => {
    return (
        <div className="flex w-96 h-96 xs:h-48 rounded-xl bg-base-100 shadow-xl">
            <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="blog" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {type}
                </h2>
                <p>{desc}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline"></div>
                    <div className="badge badge-outline"></div>
                </div>
            </div>
        </div>
    )
}

export default HomeCard