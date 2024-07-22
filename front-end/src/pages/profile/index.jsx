import { getProfileApi } from "@/api/services/user"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"

const Profile = () => {
  const { username } = useParams()
  const navigate = useNavigate()

  const {
    data: user,
    isLoading,
    isError,
    isStale,
    isSuccess,
  } = useQuery({
    queryKey: ["user", username],
    queryFn: () => getProfileApi(username),
    select: ({ data }) => data.profile,
  })

  console.log("🚀 ~ Profile ~ isSuccess:", isSuccess, isError, isStale)
  if (isLoading) return "Loading..."

  if (isSuccess && !user) return navigate("/page-not-found")

  return <div className="">Profile</div>
}

export default Profile
