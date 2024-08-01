import { getImagesApi } from "@/api/services/image"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Modal } from "@/components/ui/modal"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const ProfileCoverModal = ({ profileCoverModal }) => {
  const queryClient = useQueryClient()
  const { data: me } = queryClient.getQueryData(["me"])
  console.log("🚀 ~ ProfileCoverModal ~ me:", me)

  const { data: imagesRecent, isLoading } = useQuery({
    queryKey: ["images", "recent"],
    queryFn: () =>
      getImagesApi({ path: `${me.username}/*`, sort: "desc", max: 9 }),
    // select: ({ data }) => data,
  })

  console.log("🚀 ~ ProfileCoverModal ~ imagesRecent:", imagesRecent)

  if (!profileCoverModal.isOpen) return null

  return (
    <Modal
      className="max-h-screen w-auto overflow-y-auto p-0 drop-shadow sm:w-[548px]"
      showModal={profileCoverModal.isOpen}
      onClose={profileCoverModal.onClose}
    >
      <DialogHeader className="grid h-[60px] place-content-center border-b border-border">
        <DialogTitle className="leading-none">Select photo</DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
      </DialogHeader>
      <Tabs defaultValue="recent" className="px-4">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger className="h-[45px]" value="recent">
            Recent photos
          </TabsTrigger>
          <TabsTrigger className="h-[45px]" value="photos">
            Photo Albums
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="my-4">
          {/* <ScrollArea className="h-[510px]">
            {(imagesRecent ?? []).map((itm) => (
              <div key={itm.asset_id} className="image-box rounded-lg">
                <img src={itm.secure_url} alt={itm.filename} />
              </div>
            ))}
          </ScrollArea> */}
        </TabsContent>
        <TabsContent value="photos" className="my-4">
          <ScrollArea className="grid h-[510px] grid-cols-3">
            <div className="">
              <div className="image-box">
                <img src="" alt="" className="" />
              </div>
              <p>Profile pictures</p>
              <span>7 uploads</span>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Modal>
  )
}
