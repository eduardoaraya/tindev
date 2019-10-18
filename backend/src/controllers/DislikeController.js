const DevModel = require('../modes/dev.model');

module.exports = {
    async store(req, res) {
        try {
            const { devId } = req.params,
                { auth } = req.headers;
            
            const devTarget = await DevModel.findById(devId);
            const loggedDev = await DevModel.findById(auth);
            
            if (!devTarget)
                return res.status(404).json({ error: 'Dev not found!' })
       
            loggedDev.dislikes.push(devTarget._id);
            await loggedDev.save();
            return res.json(loggedDev);
        } catch (Error) {
            return res.status(500).json({ error: "Internal server error" })
        }
    }
}