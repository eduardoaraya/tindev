const express = require('express')
const router = express.Router();

const DevController = require('./controllers/DevController')
const LikeController = require('./controllers/LikeController')
const DislikeController = require('./controllers/DislikeController')

router.get('/devs', DevController.index );
router.post('/devs', DevController.store );

router.post('/devs/:devId/like', LikeController.store );
router.post('/devs/:devId/dislike', DislikeController.store );

module.exports = router
