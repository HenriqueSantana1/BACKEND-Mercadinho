import { Router } from 'express'
import { listSales, addSale, deleteSale } from '../controllers/salesController'

const router = Router()

router.get('/', listSales)

router.post('/add', addSale)

router.delete('/:id', deleteSale)

module.exports = router