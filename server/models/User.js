const mongoose = require('mongoose');
const Joi = require('Joi');
const passwordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');
const pick = require('lodash/pick');


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        minlength: 5,
        maxlength: 25,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    password: {
        type: String,
        required: [true, "can't be blank"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
})

userSchema.methods.generateAuthToken = function generateAuthToken(thiss) {
    const jwtPrivateKey = process.env.JWT_PRIVATE_KEY
    const payload = {
        _id: this._id,
        isAdmin: this.isAdmin,
    }
    return jwt.sign(payload, jwtPrivateKey)
}

userSchema.methods.getProfile = function getProfile(thiss) {
    return pick(this, ['userName', 'email'])
}

function validateNewUser(user) {
    const passwordComplexityOptions = {
        min: 8,
        max: 50,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 6,
    }
    const schema = Joi.object({
        userName: Joi.string()
            .min(5)
            .max(25)
            .alphanum()
            .required(),
        email: Joi.string()
            .min(5)
            .max(255)
            .email()
            .required(),
        password: passwordComplexity(passwordComplexityOptions).required(),
    })

    return schema.validate(user)
}

const User = mongoose.models.User || mongoose.model('User', userSchema);

function validateLoginDetails(user) {
    const schema = Joi.object({
        login: Joi.string().required(),
        password: Joi.string().required(),
    })

    return schema.validate(user)
}

exports.User = User;
exports.validate = validateNewUser;
exports.validateLoginDetails = validateLoginDetails;
