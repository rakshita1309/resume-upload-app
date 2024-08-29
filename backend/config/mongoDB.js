const mongoose = require("mongoose");
const mongoDB_url = process.env.MONGODB_URI


mongoose.connect(mongoDB_url)
.then(() => {
  console.log('Connected to MongoDB')
}).catch((error) => {
  console.log('connection error in DB', error);
})