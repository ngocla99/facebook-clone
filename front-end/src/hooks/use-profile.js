import { getProfileApi } from "@/api/services/user"
import { useQuery } from "@tanstack/react-query"

export const useProfile = (username) =>
  useQuery({
    queryKey: ["user", username],
    queryFn: () => getProfileApi(username),
    staleTime: Infinity,
  })
