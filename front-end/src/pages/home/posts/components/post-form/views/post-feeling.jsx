import { LinkItem } from "@/pages/home/sidebar-nav"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchInput } from "@/components/input/search-input"

import { HeadOnBack, VIEWS } from "../post-form"

export const PostFeeling = ({ setView }) => {
  return (
    <>
      <HeadOnBack
        title={"How are you feeling?"}
        onBack={() => setView(VIEWS.ROOT)}
      />
      <Tabs defaultValue="feelings">
        <TabsList>
          <TabsTrigger className="h-[60px] text-[15px]" value="feelings">
            Feelings
          </TabsTrigger>
          <TabsTrigger className="h-[60px] text-[15px]" value="activities">
            Activities
          </TabsTrigger>
        </TabsList>
        <TabsContent value="feelings">
          <div className="grid px-4 py-2">
            <SearchInput placeholder="Search" />
          </div>
          <ScrollArea type="scroll" className="h-[476px] px-2 pt-2">
            <div className="grid grid-cols-2">
              {Array(100)
                .fill(0)
                .map((el) => (
                  <LinkItem>
                    <div className="size-10 rounded-full bg-background-secondary"></div>
                    <p className="font-normal text-foreground">happy</p>
                  </LinkItem>
                ))}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="activities">
          <div className="grid px-4 py-2">
            <SearchInput placeholder="Search" />
          </div>
          <ScrollArea type="scroll" className="h-[240px] px-2 pt-2">
            <div className="grid">
              {Array(12)
                .fill(0)
                .map((el) => (
                  <LinkItem>
                    <div className="size-10 rounded-full bg-background-secondary"></div>
                    <div className="flex flex-1 items-center justify-between">
                      <p className="font-normal text-foreground">
                        Celebrating...
                      </p>
                      <div className="size-6">
                        <i className="right_icon_20 filter-placeholder-icon"></i>
                      </div>
                    </div>
                  </LinkItem>
                ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </>
  )
}
