import { SidebarNav } from "./sidebar-nav"
import { SidebarRight } from "./sidebar-right"
import { Stories } from "./stories"

const Home = () => {
  return (
    <div className="flex">
      <SidebarNav className="sticky top-[56px] hidden max-h-0 min-w-[280px] max-w-[360px] basis-[360px] lg:block" />
      <section className="flex h-[2000px] flex-1 basis-[744px] justify-center px-8 pt-4">
        <Stories className="max-w-[590px] lg:max-w-[460px] xl:max-w-2xl" />
      </section>
      <SidebarRight className="sticky top-[56px] hidden max-h-0 min-w-[280px] max-w-[360px] basis-[360px] min-[960px]:block" />
    </div>
  )
}

export default Home
