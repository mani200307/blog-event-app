import Header from "./components/Header";
import HomeCard from "./components/HomeCard";
import blogImg from './assets/blog.png'
import eventImg from './assets/event.png'
import ActiveEvents from "./components/ActiveEvents";

export default function Home() {

  return (
    <div className="h-screen overflow-scroll pt-8 px-4 flex-1">
      <Header type="" />
      <div className="flex flex-row justify-center md:flex-row xs:flex-col mt-5 gap-6">
        <HomeCard type='Blogs' linkUrl='blog' imgUrl={blogImg} desc="Make your own blog, View others blogs" />
        <HomeCard type='Events' linkUrl='event' imgUrl={blogImg} desc="Schedule your own event, Browse several events" />
      </div>
      <div className="divider invisible"></div>
      <ActiveEvents />
      {/* <Footer /> */}
    </div>
  )
}