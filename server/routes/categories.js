const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;
router.get('/subCategory/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const { rows } = await db.query(`WITH RECURSIVE nodes(id, parent_id) AS
    (SELECT s1.id, s1.parent_id
        FROM category s1 WHERE parent_id = $1
            UNION
        SELECT s2.id, s2.parent_id
        FROM category s2, nodes s1 WHERE s2.parent_id = s1.id)
    SELECT id FROM nodes;`, [id]);

    let flatRows = rows.map(item => item.id);
    console.log(flatRows);

    let data = [];
    // If we get an ID from front end, and the tree query cant find a node (we are at the end of the leaf)
    // We can assume that we are looking for a direct match against a single category
    if(flatRows && flatRows.length)
        data = await db.query(`SELECT * FROM ITEM
            WHERE category_id = ANY($1)`, [flatRows]);
    else {
        data = await db.query(`SELECT * FROM ITEM
            WHERE category_id = $1`, [id]);
    }
    

    console.log(data.rows);

    res.send(data.rows);
})

router.get('/categoryBreadcrumb/:id', async(req, res) => {
    const { id } = req.params;
    const { rows } = await db.query(`WITH RECURSIVE nodes(id,title,parent_id, path) AS
    (SELECT s1.id, s1.title, s1.parent_id, s1.title::TEXT as path
        FROM category s1 WHERE parent_id IS NULL
            UNION
        SELECT s2.id, s2.title, s2.parent_id, (s1.path || ',' || s2.title::TEXT)
        FROM category s2, nodes s1 WHERE s2.parent_id = s1.id)
    SELECT path FROM nodes WHERE nodes.id = $1`, [id]);
    const array = rows[0].path.split(',');
    res.send(array);
})

router.get('/allCategories', async (req, res) => {
    const { id } = req.params;
    const { rows } = await db.query(`SELECT * FROM category`);
    var treeData = createDataTree(rows);

    console.log(rows);
    console.log(treeData);
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