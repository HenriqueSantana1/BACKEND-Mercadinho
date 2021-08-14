import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
const prisma = new PrismaClient()

const listSales = async (req: Request, res: Response) => {
    try {
        const sales = await prisma.sale.findMany({
            include: {
                saleproducts: {}
            }
        })
        return res.json(sales)
    }
    catch (err) {
        return res.sendStatus(400).json({ error: 'Erro ao listar vendas' })
    }
}

const addSale = async (req: Request, res: Response) => {
    const { payment, total, products } = req.body
    let data = []
    if (products) {
        data = products.map((item: { amount: Number; id: Number}) => { 
            return {
                amount: item.amount,
                product: {
                    connect: {
                        id: item.id
                    }
                }
            } 
        })
    }

    try {
        const sale = await prisma.sale.create({
            data: {
                payment,
                total,
                saleproducts: {
                    create: data
                }
            }
        })
        return res.json(sale)
    }
    catch (err) {
        return res.sendStatus(400).json({ error: 'Erro ao cadastrar venda' })
    }
}

const deleteSale = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const deleteSaleproduct = prisma.saleproduct.deleteMany({
            where: {
                saleId: Number(id)
            }
        })
        const deleteSale = prisma.sale.delete({
            where: {
                id: Number(id)
            }
        })

        const transition = await prisma.$transaction([deleteSaleproduct, deleteSale])
        return res.json(transition)
    }
    catch (err) {
        return res.sendStatus(400).json({ error: 'Erro ao deletar venda' })
    }
}
export { listSales, addSale, deleteSale }