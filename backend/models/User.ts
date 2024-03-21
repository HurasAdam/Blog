import { Schema, model, Document } from "mongoose";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import * as types from "../shared/types";



const UserSchema = new Schema<types.IUser>({
    avatar: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    verified: { type: Boolean, default: false },
    verificationCode: { type: String, required: false },
    admin: { type: Boolean, default: false },

}, { timestamps: true })

UserSchema.pre<types.IUserDocument>('save', async function (next) {
    if (this.isDirectModified('password')) {
        this.password = await hash(this.password, 10);
        return next();
    }
    return next()
})

UserSchema.methods.generateJWT = async function (): Promise<string> {
    return await sign({ id: this._id }, process.env.JWT_SECRET as string, { expiresIn: '30d' })
}

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await compare(password, this.password);
}

const User = model<types.IUserDocument>("User", UserSchema);
export default User;