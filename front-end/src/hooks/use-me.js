import { getMeApi } from "@/api/services/user"
import { useQuery } from "@tanstack/react-query"

export const useMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: getMeApi,
    staleTime: Infinity,
    select: ({ data }) => data,
  })
