import { Schema, model, Document } from "mongoose";
import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IUserDocument extends IUser, Document {
    generateJWT(): Promise<string>;
}

interface IUser {
    avatar: string;
    name: string;
    email: string;
    password: string;
    verified: boolean;
    verificationCode: string;
    admin: boolean
}

const UserSchema = new Schema<IUser>({
    avatar: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    verified: { type: Boolean, default: false },
    verificationCode: { type: String, required: false },
    admin: { type: Boolean, default: false },

}, { timestamps: true })

UserSchema.pre<IUserDocument>('save', async function (next) {
    if (this.isDirectModified('password')) {
        this.password = await hash(this.password, 10);
        return next();
    }
    return next()
})

UserSchema.methods.generateJWT = async function () {
    return await sign({ id: this._id }, process.env.JWT_SECRET as string, { expiresIn: '30d' })
}
const User = model<IUserDocument>("User", UserSchema);
export default User;