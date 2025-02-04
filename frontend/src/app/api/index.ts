import mongoose from "mongoose";

const mongoServer = process.env.MONGO_URI || 'your_default_mongo_uri';
function connect() {
  return mongoose.connect(mongoServer)
  .then(() => {console.log("Connected to MongoDB")})
  .catch((err) => {console.error(err)});    
}

