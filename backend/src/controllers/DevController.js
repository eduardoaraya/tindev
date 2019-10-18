const axios = require('axios')
const DevModel = require('../modes/dev.model');

module.exports = {
    async index(req, res) {
        try {

            const { auth } = req.headers;
            const  loggedUser = await DevModel.findById(auth);

            const devs = await DevModel.find({
                $and:[
                    { _id: { $ne: auth } },
                    { _id: { $nin: loggedUser.likes } },
                    { _id: { $nin: loggedUser.dislikes } }
                ]
            });
            return res.status(200).json({devs});
        } catch (Error) {
            return res.status(500).json({
                error: 'Internal server error'
            })
        }
    },
    async store(req, res) {
        try {
            const { username } = req.body;

            const userExist = await DevModel.findOne({ username })

            if (userExist)
                return res.json(userExist)

            const response = await axios.get(`https://api.github.com/users/${username}`)
            const { name, avatar_url: avatar, bio } = response.data

            const user = await DevModel.create({
                name,
                username,
                avatar,
                bio
            })

            return res.json(user);
        } catch (Error) {
            return res.status(500).json({ error: "Internal server error" })
        }
    }
}