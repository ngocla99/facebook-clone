import React from "react"
import { getImagesApi } from "@/api/services/image"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Modal } from "@/components/ui/modal"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Return } from "@/assets/svg"

const VIEWS = {
  ROOT: "root",
  PROFILE_PICTURES: "profile_pictures",
  COVER_PHOTOS: "cover_photos",
}

export const ProfileCoverModal = ({ profileCoverModal, onUpload }) => {
  const queryClient = useQueryClient()
  const me = queryClient.getQueryData(["me"])
  const [tab, setTab] = React.useState("recent")
  const [view, setView] = React.useState(VIEWS.ROOT)

  const { data: imagesRecent } = useQuery({
    queryKey: ["images", "recent"],
    queryFn: () =>
      getImagesApi({ path: `${me.username}/*`, sort: "desc", max: 9 }),
    select: (data) => data.resources,
  })

  const { data: imagesProfile } = useQuery({
    queryKey: ["images", "profile pictures"],
    queryFn: () =>
      getImagesApi({
        path: `${me.username}/profile_pictures`,
        sort: "desc",
        max: 30,
      }),
    select: (data) => data.resources,
  })

  const { data: imagesCover } = useQuery({
    queryKey: ["images", "cover photos"],
    queryFn: () =>
      getImagesApi({
        path: `${me.username}/cover_photos`,
        sort: "desc",
        max: 30,
      }),
    select: (data) => data.resources,
  })

  return (
    <Modal
      className="max-h-screen w-auto overflow-y-auto p-0 sm:w-[548px]"
      showModal={profileCoverModal.isOpen}
      onClose={profileCoverModal.onClose}
    >
      <DialogHeader className="grid h-[60px] place-content-center border-b border-border">
        <DialogTitle className="leading-none">
          {view === VIEWS.ROOT && "Select photo"}
          {view === VIEWS.PROFILE_PICTURES && "Profile pictures"}
          {view === VIEWS.COVER_PHOTOS && "Cover photos"}
        </DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
      </DialogHeader>
      {view === VIEWS.ROOT && (
        <Tabs defaultValue={tab} className="px-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger className="h-[45px]" value="recent">
              Recent photos
            </TabsTrigger>
            <TabsTrigger className="h-[45px]" value="photos">
              Photo Albums
            </TabsTrigger>
          </TabsList>
          <TabsContent value="recent" className="my-4">
            <ScrollArea className="h-[510px]">
              <div className="grid grid-cols-3 gap-2 overflow-hidden rounded-lg">
                {(imagesRecent ?? []).map((itm) => (
                  <div
                    key={itm.asset_id}
                    className="image-box h-[100px] bg-no-repeat object-cover"
                    onClick={() => onUpload(itm.secure_url)}
                  >
                    <img
                      src={itm.secure_url}
                      alt={itm.filename}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="photos" className="my-4">
            <div className="grid h-[510px] grid-cols-3 gap-2">
              {imagesProfile?.length ? (
                <div
                  className=""
                  onClick={() => {
                    setView(VIEWS.PROFILE_PICTURES)
                    setTab("photos")
                  }}
                >
                  <div
                    key={imagesProfile[0].asset_id}
                    className="image-box h-[100px] overflow-hidden rounded-lg bg-no-repeat object-cover"
                  >
                    <img
                      src={imagesProfile[0].secure_url}
                      alt={imagesProfile[0].filename}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="mt-1 font-medium leading-5">Profile pictures</p>
                  <span className="text-sm leading-4">
                    {imagesProfile.length} uploads
                  </span>
                </div>
              ) : null}
              {imagesCover?.length ? (
                <div
                  className=""
                  onClick={() => {
                    setView(VIEWS.COVER_PHOTOS)
                    setTab("photos")
                  }}
                >
                  <div
                    key={imagesCover[0].asset_id}
                    className="image-box h-[100px] overflow-hidden rounded-lg bg-no-repeat object-cover"
                  >
                    <img
                      src={imagesCover[0].secure_url}
                      alt={imagesCover[0].filename}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="mt-1 font-medium leading-5">Cover photos</p>
                  <span className="text-sm leading-4">
                    {imagesCover.length} uploads
                  </span>
                </div>
              ) : null}
            </div>
          </TabsContent>
        </Tabs>
      )}
      {view === VIEWS.PROFILE_PICTURES && (
        <ViewPictures
          pictures={imagesProfile}
          onBack={() => setView(VIEWS.ROOT)}
          onUpload={onUpload}
        />
      )}
      {view === VIEWS.COVER_PHOTOS && (
        <ViewPictures
          pictures={imagesCover}
          onBack={() => setView(VIEWS.ROOT)}
          onUpload={onUpload}
        />
      )}
    </Modal>
  )
}

const ViewPictures = ({ pictures, onBack, onUpload }) => {
  return (
    <div className="p-4">
      <Button
        variant="secondary"
        className="absolute left-4 top-3 size-9 p-0"
        size="icon"
        onClick={onBack}
      >
        <Return className="text-[#65676b]" />
      </Button>
      <ScrollArea className="h-[555px]">
        <div className="grid grid-cols-3 gap-2 overflow-hidden rounded-lg">
          {pictures.map((itm) => (
            <div
              key={itm.asset_id}
              className="image-box h-[100px] bg-no-repeat object-cover"
              onClick={() => onUpload(itm.secure_url)}
            >
              <img
                src={itm.secure_url}
                alt={itm.filename}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
