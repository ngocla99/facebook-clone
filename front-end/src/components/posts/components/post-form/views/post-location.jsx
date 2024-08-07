import { LinkItem } from "@/pages/home/components/sidebar-nav"

import { ScrollArea } from "@/components/ui/scroll-area"
import { SearchInput } from "@/components/input/search-input"

import { HeadOnBack, VIEWS } from "../post-form"

export const PostLocation = ({ setView }) => {
  return (
    <>
      <HeadOnBack
        title={"Search for location"}
        onBack={() => setView(VIEWS.ROOT)}
      />
      <div className="px-4 py-2">
        <SearchInput placeholder="Where are you?" />
      </div>
      <ScrollArea className="h-[476px] px-2 py-2">
        <div className="grid">
          {Array(20)
            .fill(0)
            .map((el) => (
              <LinkItem>
                <div className="size-8 rounded-lg bg-background-secondary"></div>
                <div className="space-y-[6px]">
                  <p className="leading-none">Ha noi</p>
                  <p className="text-sm leading-none text-muted-foreground">
                    Hanoi, Vietnam
                  </p>
                </div>
              </LinkItem>
            ))}
        </div>
      </ScrollArea>
    </>
  )
}
