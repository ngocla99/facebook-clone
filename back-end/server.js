const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const fileUpload = require("express-fileupload")
require("dotenv").config()

const { readdirSync } = require("fs")
const app = express()

app.use(express.json())
app.use(cors())
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "tmp/",
  })
)

// routes
const authRouter = require("./routes/auth")
const postRouter = require("./routes/post")
const collectionRouter = require("./routes/collection")
const commentRouter = require("./routes/comment")
const gifRouter = require("./routes/gif")
const reactionRouter = require("./routes/reaction")
const uploadRouter = require("./routes/upload")
const userRouter = require("./routes/user")

app.use("/auth", authRouter)
app.use("/posts", postRouter)
app.use("/collections", collectionRouter)
app.use("/comments", commentRouter)
app.use("/gifs", gifRouter)
app.use("/reactions", reactionRouter)
app.use("/upload", uploadRouter)
app.use("/users", userRouter)

console.log(process.env.MONGODB_URL)

// database
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb", err))

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`server is running on port: http://localhost:${PORT}/`)
})
