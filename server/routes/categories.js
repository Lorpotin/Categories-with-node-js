const Router = require('express-promise-router');
const db = require('../db');
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;
router.get('/subCategory/:id', async (req, res) => {
    const { id } = req.params;
    const { rows } = await db.query(`WITH RECURSIVE nodes(id,title,parent_id) AS
    (SELECT s1.id, s1.title, s1.parent_id
        FROM category s1 WHERE parent_id = $1
            UNION
        SELECT s2.id, s2.title, s2.parent_id
        FROM category s2, nodes s1 WHERE s2.parent_id = s1.id)
    SELECT * FROM nodes;`, [id]);
    res.send(rows);
})

router.get('/allCategories', async (req, res) => {
    const { id } = req.params;
    const { rows } = await db.query(`SELECT * FROM category`);
    var treeData = createDataTree(rows);
    res.send(treeData);
})

const createDataTree = dataset => {
    let hashTable = Object.create(null)
    // Mutate original data from db (change id --> key for antd tree component)
    dataset.forEach( 
        data => hashTable[data.id] = { key: data.id, title: data.title, children : [] } 
    )
    let dataTree = []
    dataset.forEach( data => {
        if(data.parent_id) 
            hashTable[data.parent_id].children.push(hashTable[data.id])
        else 
            dataTree.push(hashTable[data.id])
    })
    return dataTree
}