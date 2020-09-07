const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.get('/itemById/:id', async (req, res) => {
    const { id } = req.params;
    
})