import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const updateImageFile = async(req,res)=> {

    const {UserID, ImageFile} = req.body;
    try {
        
        const user = await User.findById(UserID);
        const update = await user.updateOne({
            imageFile: ImageFile,
        })
        
    } catch (error) {
        
    }
}

export const getAuthUser = async (req, res) => {

    const { UserID } = req.body;
    try {
        const user = await User.findById(UserID);
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const updateStatus = async (req, res) => {

    const { Status, UserID } = req.body;
    try {

        const user = await User.findById(UserID);
        const update = await user.updateOne({
            status: Status,
        })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser)
            return res.status(404).json({ message: "User doesnt exist." });

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            "test",
            { expiresIn: "1h" }
        );

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

function validateEmail(email) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
}


export const registration = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    console.log(email);
    try {
        const existingUser = await User.findOne({ email });
        if (username.length === 0)
            return res.status(400).json({ message: "You must type username" })
        if (!validateEmail(email))
            return res.status(400).json({ message: "Invalid email address, please check it again" })
        if (existingUser)
            return res.status(400).json({ message: "User already exist." });
        if (password !== confirmPassword)
            return res.status(400).json({ message: "Password do not match" });

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({
            email,
            password: hashedPassword,
            username: username,
        });

        const token = jwt.sign(
            { email: result.email, id: result._id },
            "jwtSecret",
            { expiresIn: "1h" }
        );

        res.status(200).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

