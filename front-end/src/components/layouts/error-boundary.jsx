import { Link, useRouteError } from "react-router-dom"

import { Button } from "@/components/ui/button"

const ErrorBoundary = () => {
  const error = useRouteError()

  return (
    <section className="p-18 flex h-lvh flex-col items-center justify-center">
      <h1 className="mb-6">Something went wrong 🧐</h1>
      <pre className="mb-12">{error?.message}</pre>
      <Link
        to={"/"}
        className="bg-neutral-dark-blue text-neutral-white rounded-md p-2"
      >
        <Button>Back Home</Button>
      </Link>
    </section>
  )
}

export default ErrorBoundary
