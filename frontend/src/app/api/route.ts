import mongoose from "mongoose";
import {User} from "./models/user";
const mongoServer = process.env.MONGO_URI || 'your_default_mongo_uri';
function connect() {
  return mongoose.connect(mongoServer)
  .then(() => {console.log("Connected to MongoDB")})
  .catch((err) => {console.error(err)});    
}

export async function GET() {
  
  
}

// const user = new User({
//     email,
//     password,
//     authType: "google", // Specify local auth type
//   });

//   // Save the user to the database
//   const doc = await user.save();
//   res.status(201).json(doc); // Send the saved user as JSON response
// } catch (err) {
//   if (err.code === 11000) {
//     // Handle duplicate key error (e.g., unique email constraint)
//     res.status(409).send("Email already exists.");
//   } else {
//     res.status(500).send(err.message); // Internal server error
//   }
// }
// });

