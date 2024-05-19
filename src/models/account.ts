import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { type: String },
    provider: { type: String },
    providerAccountId: { type: String },
    refreshToken: { type: String },
    accessToken: { type: String },
    expiresAt: { type: Number },
    tokenType: { type: String },
    scope: { type: String },
    idToken: { type: String },
    sessionState: { type: String },
  },
  {
    timestamps: true,
  }
);

const AccountModel =
  mongoose.models.Account || mongoose.model("Account", accountSchema);

export default AccountModel;
