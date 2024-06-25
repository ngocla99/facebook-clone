import { SidebarNav } from "./sidebar-nav"
import { SidebarRight } from "./sidebar-right"
import { Stories } from "./stories"

const Home = () => {
  return (
    <div className="grid">
      <SidebarNav className="fixed" />
      <section className="mx-96 flex h-[2000px] justify-center px-8 pt-4">
        <div className="w-[680px]">
          <Stories />
        </div>
      </section>
      <SidebarRight className="fixed right-0" />
    </div>
  )
}

export default Home
