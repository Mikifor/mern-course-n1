const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = Router()
const config = require('config')
const User = require('../models/User')
const { check, validationResult } = require('express-validator')

router.post(
    '/register',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Invalid password')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong registration data'
                })
            }
            const { email, password } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: `These user already exists` })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword })

            await user.save()

            res.status(201).json({ message: "User was created" })

        } catch (e) {
            res.status(500).json({ message: "Something goes wrong" })
            res.status(500).json({ message: e })
        }
    })

router.post(
    '/login',
    [
        check('email', 'Please enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter the password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong entry data'
                })
            }

            const { email, password } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ messsage: "User not found" })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) { return res.status(400).json({ message: "Invalid password"})}

            const token = jwt.sign(
                { userId: user.id },
                config.get('gwtSecret'),
                {expiresIn: '1h'}                 
            )

            res.json({token, userId: user.id })

        } catch (e) {
            res.status(500).json({ message: "Something goes wrong" })
        }
    })

module.exports = router