import Header from "./components/Header";
import ActiveEvents from "./components/ActiveEvents";
import HomeBlog from "./components/HomeBlog";

export default function Home() {

  return (
    <div className="h-screen overflow-x-hidden overflow-scroll pt-8 px-4 space-y-2 flex-1">
      <Header type="" />
      <HomeBlog />
      <div className="divider invisible"></div>
      <ActiveEvents />
      <div className="divider invisible"></div>
    </div>
  )
}