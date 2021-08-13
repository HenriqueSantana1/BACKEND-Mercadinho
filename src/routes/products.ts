import { Router } from 'express'
import { listProducts, addProduct, updateProduct, deleteProduct } from '../controllers/productsController'

const router = Router()

router.get('/', listProducts)

router.post('/add', addProduct)

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)

module.exports = router