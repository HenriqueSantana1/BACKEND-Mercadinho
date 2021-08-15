import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
const prisma = new PrismaClient()

const listProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany()
        return res.json(products)
    }
    catch (err) {
        return res.status(400).send({ error: 'Erro ao listar produtos' })
    }
}

const addProduct = async (req: Request, res: Response) => {
    const { title, description, price, qtt} = req.body
    try {
        const product = await prisma.product.create({
            data: {
                title,
                description,
                price,
                qtt
            }
        })
        return res.json(product)
    } catch (err) {
        return res.status(400).send({error: 'Erro ao cadastrar produto!'})
    }
}

const updateProduct = async (req: Request, res: Response) => {
    const { title, description, price, qtt } = req.body 
    try {
        const updatedProduct = await prisma.product.update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                title,
                description,
                price,
                qtt
            }
        })
        return res.json(updatedProduct)
    }
    catch (err) {
        return res.status(400).send({ error: 'Erro ao atualizar produto' })
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const deletedProduct = await prisma.product.delete({
            where: {
                id: Number(id)
            }
        })
        return res.json(deletedProduct)
    }
    catch (err) {
        return res.status(400).send({error: 'Erro ao deletar produto'})
    }
}
export { listProducts, addProduct, updateProduct, deleteProduct }