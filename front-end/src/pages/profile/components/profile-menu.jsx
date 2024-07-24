import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const ProfileMenu = () => {
  return (
    <Tabs defaultValue="posts">
      <div className="container bg-card">
        <TabsList className="w-full justify-start px-8">
          <TabsTrigger
            className="h-[60px] hover:bg-hover"
            value="posts"
          >
            Posts
          </TabsTrigger>
          <TabsTrigger
            className="h-[60px] hover:bg-hover"
            value="about"
            disabled
          >
            About
          </TabsTrigger>
          <TabsTrigger
            className="h-[60px] hover:bg-hover"
            value="friends"
            disabled
          >
            Friends
          </TabsTrigger>
          <TabsTrigger
            className="h-[60px] hover:bg-hover"
            value="photos"
            disabled
          >
            Photos
          </TabsTrigger>
          <TabsTrigger
            className="h-[60px] hover:bg-hover"
            value="videos"
            disabled
          >
            Videos
          </TabsTrigger>
          <TabsTrigger
            className="h-[60px] hover:bg-hover"
            value="reels"
            disabled
          >
            Reels
          </TabsTrigger>
          <TabsTrigger
            className="h-[60px] hover:bg-hover"
            value="more"
            disabled
          >
            More
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="posts" className="container">
        <div className="mt-4 px-8">Posts</div>
      </TabsContent>
      <TabsContent value="about">About</TabsContent>
    </Tabs>
  )
}
