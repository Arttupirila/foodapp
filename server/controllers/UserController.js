import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import connectDB from "../helpers/db.js";

const SECRET = process.env.JWT_SECRET || "your_secret_key";

const postRegister = async (req, res) => {
    const {email, password} = req.body
    const db = await connectDB()
    const result = await db.collection("users").findOne({ email })
    if (result) {
        return res.status(400).json({message: "User already exists"})
    }
        
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = {
        id: Date.now(),
        email,
        password: hashedPassword
    }    
    await db.collection("users").insertOne(user)
    

    res.json({ message: "User registered"})
}

const postLogin = async (req, res) => {
    const {email, password} = req.body
    const db = await connectDB()
    const user = await db.collection("users").findOne({ email })
    if (!user) {
        return res.status(400).json({message: "Invalid credentials"})
    }

    const passwordMatches = await bcrypt.compare(password, user.password)

    if (!passwordMatches) {
        return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
        {userId: user.id},
        SECRET,
        {expiresIn: "1h"}
    )
    res.json({token})
}

export { postRegister, postLogin };