import { getImagesApi } from "@/api/services/image"
import { useInfiniteQuery } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LoadingDots } from "@/components/loading/loading-dots"

export const ListImage = ({ title, path, onImageClick }) => {
  const {
    data: images,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["images", path],
    queryFn: ({ pageParam }) =>
      getImagesApi({
        path: path,
        sort: "desc",
        max: 6,
        nextCursor: pageParam,
      }),
    initialPageParam: null,
    getNextPageParam: ({ data }) => data.next_cursor,
    select: ({ pages }) => pages.map((itm) => itm.data.resources).flat(1),
  })

  if (isLoading) {
    return <div className="p-4 pt-0">Loading</div>
  }

  if (images.length === 0) return null

  return (
    <div className="p-4 pt-0">
      <h3 className="text-lg font-semibold leading-5">{title}</h3>
      <div className="mt-4 grid grid-cols-6 gap-2 overflow-hidden rounded-lg">
        {images.map((itm) => (
          <button
            key={itm.asset_id}
            className="image-box"
            onClick={() => onImageClick(itm)}
          >
            <img
              src={itm.secure_url}
              className={cn("aspect-square object-cover")}
              alt={itm.filename}
            />
          </button>
        ))}
      </div>
      {hasNextPage && (
        <>
          {isFetchingNextPage ? (
            <LoadingDots className="mt-4 h-9 w-full items-center justify-center" />
          ) : (
            <Button
              variant="secondary"
              className="mt-4 w-full"
              onClick={fetchNextPage}
            >
              See more
            </Button>
          )}
        </>
      )}
    </div>
  )
}
