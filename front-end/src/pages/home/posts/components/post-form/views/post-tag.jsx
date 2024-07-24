import { LinkItem } from "@/pages/home/sidebar-nav"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SearchInput } from "@/components/input/search-input"

import { HeadOnBack, VIEWS } from "../post-form"

export const PostTag = ({ setView }) => {
  return (
    <>
      <HeadOnBack title="Tag people" onBack={() => setView(VIEWS.ROOT)} />
      <div className="grid grid-cols-[1fr_auto] gap-3 px-4 py-2">
        <SearchInput placeholder="Search" />
        <Button
          className="text-primary hover:text-primary"
          variant="ghost"
        >
          Done
        </Button>
      </div>
      <ScrollArea className="px-2 py-4">
        <h3 className="px-2 pb-2 text-sm font-semibold uppercase leading-none text-muted-foreground">
          Suggestions
        </h3>
        <div className="grid">
          <LinkItem>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>Nemo</p>
          </LinkItem>
          <LinkItem>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>Lanh</p>
          </LinkItem>
        </div>
      </ScrollArea>
    </>
  )
}
