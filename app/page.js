import Header from "./components/Header";
import HomeCard from "./components/HomeCard";
import blogImg from './assets/blog.png'
import eventImg from './assets/event.png'
import ActiveEvents from "./components/ActiveEvents";
import HomeBlog from "./components/HomeBlog";

export default function Home() {

  return (
    <div className="h-screen overflow-x-hidden overflow-scroll pt-8 px-4 space-y-2 flex-1">
      <Header type="" />
      <HomeBlog />
      {/* <div className="flex flex-row justify-center md:flex-row xs:flex-col mt-5 gap-6"> */}
      {/* <HomeCard type='Blogs' linkUrl='blog' imgUrl={blogImg} desc="Make your own blog, View others blog" />
        <HomeCard type='Events' linkUrl='event' imgUrl={blogImg} desc="Schedule your own event, Browse several events" /> */}
      {/* </div> */}
      <div className="divider invisible"></div>
      <ActiveEvents />
    </div>
  )
}