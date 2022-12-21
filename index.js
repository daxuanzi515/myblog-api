const express = require("express")
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/categories")
const emailRoute = require("./routes/sendemail")
const multer = require("multer")
const path = require("path")
const cors = require("cors")
dotenv.config()

//use json
app.use(express.json());
app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
app.use("/images",express.static(path.join(__dirname,"/images")))

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser: true, useUnifiedTopology: true,
})
.then(console.log("connect successfully!"))
.catch((err)=>console.log(err));

const mystorage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,"images");
    },
    filename:(req, file, cb)=>{
        var fileFormat = (file.originalname).split('.')
        cb(null,req.body.name)
    },
});

const upload = multer({storage:mystorage});
app.post("/api/upload", upload.single("file"),(req,res)=>{
    res.status(200).json("File has been updated!");
});


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/send", emailRoute);

app.listen("5000",()=>{
    console.log("Backend is running-")
})