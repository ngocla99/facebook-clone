import { getImagesApi } from "@/api/services/image"
import { useQuery } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

export const ListImage = ({ title }) => {
  const { data: images, isLoading } = useQuery({
    queryKey: ["images"],
    queryFn: () =>
      getImagesApi({ path: "nemolanh/profile_pictures", sort: "desc", max: 6 }),
    select: ({ data }) => data,
  })

  if (isLoading) {
    return <div>Loading</div>
  }

  console.log("🚀 ~ ListImage ~ images:", images)
  return (
    <div className="p-4 pt-0">
      <h3 className="text-lg font-semibold leading-5">{title}</h3>
      <div className="mt-4 grid grid-cols-6 gap-2 overflow-hidden rounded-lg">
        {images.resources.map((itm) => (
          <img
            key={itm.asset_id}
            src={itm.url}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "aspect-square object-cover"
            )}
          />
        ))}
      </div>
      <Button variant="secondary" className="mt-4 w-full">
        See more
      </Button>
    </div>
  )
}
