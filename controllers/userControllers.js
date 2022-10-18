import { validationResult } from "express-validator";
import bcrypt from 'bcrypt'
import userModel from "../models/UserModel.js";

export const register = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new userModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash
        })
        console.log(doc)

    } catch (err) {
        console.log(`Ошибка ${err}`)
        res.status(500).json({
            message: 'Не удалось зарегистрировать аккаунт 🤓',
        })
    }
}