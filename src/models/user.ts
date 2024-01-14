import { Schema, model } from 'mongoose';

const userSchema= new Schema({
    first_name: {
        type: String, 
        trim: true,
        required: true,
    },
    last_name: {
        type: String,
        trim: true,
        required: true,
    },
    user_name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    account_number: {
        type: String,
        trim: true
    },
    balance: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    organization: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = model('User', userSchema)

export default User