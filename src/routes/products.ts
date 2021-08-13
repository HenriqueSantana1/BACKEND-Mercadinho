import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    return res.send('List Products')
})

router.post('/add', (req, res) => {
    return res.send('Add product')
})

router.put('/:id', (req, res) => {
    return res.send('Edit product '+req.params.id)
})

router.delete('/:id', (req, res) => {
    return res.send('Delete product '+req.params.id)
})

module.exports = router