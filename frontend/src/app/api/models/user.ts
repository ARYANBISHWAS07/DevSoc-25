import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  googleId: { type: String, required: false },
  authType: { type: String, enum: ["google", "local"], required: true },
});
//   var user = this;
//   if (user.isModified("password")) {
//     bcrypt.genSalt(SALT_I, function (err, salt) {
//       if (err) return next(err);
//       bcrypt.hash(user.password, salt, function (err, hash) {
//         if (err) return next(err);
//         bcrypt.hash(user.password, salt, function (err, hash) {
//           if (err) return next(err);
//           user.password = hash;
//           next();
//         });
//       });
//     });
//   } else {
//     next();
//   }
// });

export const User = mongoose.model("User", userSchema);
