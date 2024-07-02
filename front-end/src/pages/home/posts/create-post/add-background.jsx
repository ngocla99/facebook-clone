import React from "react"

const postBackgrounds = {
  avatar: [
    "images/postBackgrounds/avatar1.webp",
    "images/postBackgrounds/avatar2.webp",
    "images/postBackgrounds/avatar3.webp",
    "images/postBackgrounds/avatar4.webp",
    "images/postBackgrounds/avatar5.webp",
  ],
  new: [
    "images/postBackgrounds/new1.jpg",
    "images/postBackgrounds/new2.jpg",
    "images/postBackgrounds/new3.jpg",
    "images/postBackgrounds/new4.jpg",
    "images/postBackgrounds/new5.jpg",
    "images/postBackgrounds/new6.jpg",
  ],
  popular: [
    "images/postBackgrounds/popular2.jpg",
    "images/postBackgrounds/popular3.jpg",
    "images/postBackgrounds/popular4.jpg",
    "images/postBackgrounds/popular5.jpg",
    "images/postBackgrounds/popular6.jpg",
    "images/postBackgrounds/popular7.jpg",
  ],
}

export const AddBackground = () => {
  const [showMore, setShowMore] = React.useState(false)

  return (
    <div className="">
      {!showMore ? (
        <img
          src="icons/colorful.png"
          alt="Post Background"
          className="size-[38px]"
          onClick={() => setShowMore(true)}
        />
      ) : (
        <div className="flex gap-2">
          <div
            className="flex size-8 items-center justify-center rounded-lg bg-background-secondary"
            onClick={() => setShowMore(false)}
          >
            <i className="arrow_left_icon"></i>
          </div>
          <div
            className="flex size-8 items-center justify-center rounded-lg bg-background-secondary"
            onClick={() => setShowMore(false)}
          >
          </div>
          {postBackgrounds.avatar.map((src) => (
            <img src={src} className="size-8 rounded-lg" />
          ))}
          <div className="size-8 rounded-lg bg-[#c600ff]"></div>
          <div className="size-8 rounded-lg bg-[#e2013b]"></div>
          <div className="size-8 rounded-lg bg-[#111111]"></div>
          <div
            className="flex size-8 items-center justify-center rounded-lg bg-background-secondary"
            onClick={() => setShowMore(false)}
          >
            <i className="more_icon"></i>
          </div>
        </div>
      )}
    </div>
  )
}
