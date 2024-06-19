import { SidebarNav } from "./sidebar-nav"
import { SidebarRight } from "./sidebar-right"
import { Stories } from "./stories"

const Home = () => {
  return (
    <div className="flex">
      <SidebarNav className="fixed" />
      <section className="mx-96 h-[2000px] pt-4">
        <Stories />
      </section>
      <SidebarRight className="fixed right-0" />
    </div>
  )
}

export default Home
