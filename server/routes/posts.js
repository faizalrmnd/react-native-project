const router = require('express').Router()
const {
    createPost,
    getAll,
    getOne,
    getByUser,
    deletePost
} = require('../controllers/post.controller')
const { multer, sendUploadToGCS } = require('../helpers/image.helper')

router.post('/', multer.single('image'), sendUploadToGCS, createPost)
router.get('/', getAll)
router.get('/:id', getOne)
router.get('/byuser/:id', getByUser)
router.delete('/:id', deletePost)

module.exports = router