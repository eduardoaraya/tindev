const DevModel = require('../modes/dev.model');

module.exports = {
    async store(req, res) {
        try {
            const { devId } = req.params,
            { auth } = req.headers;
            
            const devTarget = await DevModel.findById(devId);
            const loggedDev = await DevModel.findById(auth);
            if (!devTarget)
                return res.status(404).json({ error: 'Dev not found!' });
            
            if (loggedDev.likes.includes(devTarget._id))
                return res.status(403).json({ message: 'Você ja deu like pra este Dev' });
                
            
            if (devTarget.likes.includes(loggedDev._id))
                return res.json({match:true,user:devTargert});
            
            
            loggedDev.likes.push(devTarget._id);
            await loggedDev.save();

            return res.json({user:loggedDev});
        } catch (Error) {
            return res.status(500).json({ error: "Internal server error" })
        }
    }
}