import FloatingDots from "../components/Floating-BG/Floating"
import Nav from "../components/Nav/Nav"


const Dashboard = () => {
  return (
    <div className="my-5 flex w-full items-center justify-start flex-col">
      <Nav current="home"/>
      <FloatingDots count={120}/>
    </div>
  )
}

export default Dashboard