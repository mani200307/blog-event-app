import React from 'react'
import Link from 'next/link'

const EventCard = ({ name, venue, startDate, time, categ, desc }) => {
    return (
        <div className="rounded-md lg:w-72 md:w-96 sm:w-96 xs:w-72 w-full bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">
                    <div>{name}</div>
                    <div className="badge badge-secondary">{categ}</div>
                    <div className="badge badge-secondary">{venue}</div>
                </h2>
                <p>{desc}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">{startDate}</div>
                    <div className="badge badge-outline">{time.slice(0, 5)}</div>
                </div>
            </div>
        </div>
    )
}

export default EventCard