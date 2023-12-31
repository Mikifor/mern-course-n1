const { Router } = require('express')
const Link = require('../models/Link')
const router = Router()
const auth = require('../middleware/auth.middleware')
const config = require('config')
const shortid = require('shortid')

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const { from } = req.body
        const code = shortid.generate()
        const existing = await Link.findOne({from})

        if (existing) { res.json({link: existing}) }

        const to = baseUrl + '/t/' + code
        const link = new Link ({
            code, to, from, owner: req.user.userId
        })

        await link.save()

    } catch (e) {
        res.status(500).json({ message: "Something goes damn wrong" })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId })
        res.json(links)
    } catch (e) {
        res.status(500).json({ message: "Something goes wrong" })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (e) {
        res.status(500).json({ message: "Something goes fucking wrong" })
    }
})


module.exports = router 