import { getGIFsApi } from "@/api/services/image"
import { useQuery } from "@tanstack/react-query"

import { ScrollArea } from "@/components/ui/scroll-area"
import { SearchInput } from "@/components/input/search-input"

import { HeadOnBack, VIEWS } from "../create-post-form"

export const PostGif = ({ setView }) => {
  const { data: gifs } = useQuery({
    queryKey: ["gifs"],
    queryFn: () => getGIFsApi({ searchBy: "nemo", limit: 25 }),
    select: ({ data }) => {
      return data.results.map((itm) => itm.media[0].gif)
    },
    initialData: [],
  })

  return (
    <>
      <HeadOnBack title="Choose a GIF" onBack={() => setView(VIEWS.ROOT)} />
      <div className="px-4 py-2">
        <SearchInput placeholder="Search" />
      </div>
      <ScrollArea className="h-[476px] px-2 pt-2">
        <div className="grid">
          {(gifs ?? []).map((itm) => (
            <img src={itm.url} alt="gif" className="w-full" />
          ))}
        </div>
      </ScrollArea>
    </>
  )
}
