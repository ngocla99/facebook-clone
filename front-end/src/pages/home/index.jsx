import { HomePosts } from "./home-posts"
import { SidebarNav } from "./sidebar-nav"
import { SidebarRight } from "./sidebar-right"
import { Stories } from "./stories"
import { CreateStory } from "./stories/create-story"

const Home = () => {
  return (
    <div className="flex">
      <SidebarNav className="sticky top-[56px] hidden max-h-0 min-w-[280px] max-w-[360px] basis-[360px] min-[1100px]:block" />
      <section className="flex flex-1 basis-[744px] flex-col items-center justify-start px-8 py-4">
        <div className="flex max-w-[590px] flex-col gap-4 min-[1100px]:max-w-[460px] xl:max-w-2xl">
          <CreateStory />
          <Stories />
          <HomePosts />
        </div>
      </section>
      <SidebarRight className="sticky top-[56px] hidden max-h-0 min-w-[280px] max-w-[360px] basis-[360px] min-[960px]:block" />
    </div>
  )
}

export default Home
