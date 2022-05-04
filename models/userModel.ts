import bcrypt from "bcryptjs"
import { model, Schema, Document, models } from "mongoose"

export interface IUser extends Document {
  email: string
  password: string
  firstName: string
  lastName: string
  isAdmin: boolean
  matchPassword: (password: string) => Promise<boolean>
  createdAt: Date
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
})

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }
  const salt = await bcrypt.genSalt(10)

  this.password = await bcrypt.hash(this.password, salt)
})

export default models.User || model<IUser>("User", userSchema)
