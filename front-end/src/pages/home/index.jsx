import { HomePosts } from "./components/home-posts"
import { SidebarNav } from "./components/sidebar-nav"
import { SidebarRight } from "./components/sidebar-right"
import { Stories } from "./stories"
import { CreateStory } from "./stories/create-story"

const Home = () => {
  return (
    <div className="flex">
      <SidebarNav className="sticky top-[56px] hidden max-h-0 min-w-[280px] max-w-[360px] basis-[360px] min-[1100px]:block" />
      <section className="flex flex-1 basis-[744px] flex-col items-center justify-start py-4 sm:px-8">
        <div className="w-full flex flex-col gap-4 sm:w-[590px] min-[1100px]:w-[460px] xl:w-2xl">
          <CreateStory />
          <Stories className="" />
          <HomePosts />
        </div>
      </section>
      <SidebarRight className="sticky top-[56px] hidden max-h-0 min-w-[280px] max-w-[360px] basis-[360px] min-[960px]:block" />
    </div>
  )
}

export default Home
