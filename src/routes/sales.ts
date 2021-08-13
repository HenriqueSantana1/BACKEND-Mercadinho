import { Router } from 'express'
import { listSales } from '../controllers/salesController'

const router = Router()

router.get('/', (req, res) => {
    return res.send('List Sales')
})

router.post('/add', (req, res) => {
    return res.send('Add sale')
})

router.put('/:id', (req, res) => {
    return res.send('Edit sale '+req.params.id)
})

router.delete('/:id', (req, res) => {
    return res.send('Delete sale '+req.params.id)
})

module.exports = router