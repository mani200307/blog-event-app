import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeCard from "./components/HomeCard";

export default function Home() {
  return (
    <div className="h-screen pt-8 px-4 flex-1">
      <Header />
      <div className="flex flex-row md:flex-row xs:flex-col mt-5 gap-6">
        <HomeCard type='Blogs' desc="Make your own blog, View other's blogs"/>
        <HomeCard type='Events' desc="Schedule your own event, Browse several events"/>
      </div>
      {/* <Footer /> */}
    </div>
  )
}
