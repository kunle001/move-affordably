import { app } from "./app";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from 'dotenv'

//config file setting
dotenv.config({ path: './config.env' });


// connect database
mongoose.connect(process.env.MONGO_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as ConnectOptions).then(() => console.log('DB connection successful'))

// start server
const port = 3000
app.listen(port, () => {
  console.log('app is listening on 3000')
})
