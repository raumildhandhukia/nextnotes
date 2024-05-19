import mongoose, { Schema } from "mongoose";
import AccountModel from "@/models/account";

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    emailVerified: { type: Date },
    image: { type: String },
    password: { type: String },
    accounts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.post("findOneAndDelete", async function (user) {
  if (user) {
    const deleteResult = await AccountModel.deleteMany({
      _id: { $in: user.accounts },
    });
  }
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
