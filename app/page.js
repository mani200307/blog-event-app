import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeCard from "./components/HomeCard";

export default function Home() {
  return (
    <div className="h-screen pt-8 px-4 flex-1">
      <Header />
      <div className="flex flex-row gap-6">
        <HomeCard />
        <HomeCard />
      </div>
      {/* <Footer /> */}
    </div>
  )
}
