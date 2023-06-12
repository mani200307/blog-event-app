import Header from '@/app/components/Header'
import HomeCard from '@/app/components/HomeCard'
import React from 'react'
import blogImg from '../../assets/blog.png'

const page = () => {
    return (
        <div className="h-auto bg-white pt-8 px-4 flex-1">
            <Header type='View Blogs' />
            <HomeCard type='Blogs' linkUrl='blog' imgUrl={blogImg} desc="Make your own blog, View others blogs" />
            <HomeCard type='Events' linkUrl='event' imgUrl={blogImg} desc="Schedule your own event, Browse several events" />
            <HomeCard type='Events' linkUrl='event' imgUrl={blogImg} desc="Schedule your own event, Browse several events" />
            <HomeCard type='Events' linkUrl='event' imgUrl={blogImg} desc="Schedule your own event, Browse several events" />
            <HomeCard type='Events' linkUrl='event' imgUrl={blogImg} desc="Schedule your own event, Browse several events" />
            <HomeCard type='Events' linkUrl='event' imgUrl={blogImg} desc="Schedule your own event, Browse several events" />
        </div>
    )
}

export default page