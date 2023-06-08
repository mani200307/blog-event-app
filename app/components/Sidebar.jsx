import Link from 'next/link'
import React from 'react'

const Sidebar = () => {

    // const [toggleCollapse, setToggleCollapse] = useState(false);

    return (
        <div className='h-screen gap-5 w-1/4 px-4 pt-8 pb-4 flex flex-col'>
            <Link href='/'><h1 className='text-xl'>Sidebar</h1></Link>
            <Link href='/blog/create'><h1>Create Blog</h1></Link>
            <Link href='/blog/view'><h1>View Blogs</h1></Link>
            <Link href='/event/create'><h1>Schedule Event</h1></Link>
            <Link href='/event/view'><h1>View Events</h1></Link>
        </div>
    )
}

export default Sidebar