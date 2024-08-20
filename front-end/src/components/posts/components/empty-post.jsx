import { Link } from "react-router-dom"

import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const EmptyPost = () => {
  return (
    <Card>
      <CardContent className="mt-[14px] grid place-items-center p-6">
        <h3 className="text-xl font-bold leading-6 text-muted-foreground">
          No more post
        </h3>
        <p className="mt-1 text-lg leading-4 text-muted-foreground">
          Add more friends to see more posts in your Feed.
        </p>
        <Link
          to="/friends/suggestions"
          className={buttonVariants({ className: "mt-6" })}
        >
          Find friends
        </Link>
      </CardContent>
    </Card>
  )
}
