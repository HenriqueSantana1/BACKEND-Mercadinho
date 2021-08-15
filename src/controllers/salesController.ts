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
        return res.status(400).send({ error: 'Erro ao listar vendas' })
    }
}

const addSale = async (req: Request, res: Response) => {
    const { payment, products } = req.body
    let total = 0, data = [], productData:any = [] , hasSufficientProducts = true
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
        for(let i = 0; i < products.length; i++) {
            await prisma.product.findUnique({
                where: {
                    id: products[i].id
                },
                select: {
                    qtt: true,
                    price: true
                }
            }).then((data) => {
                productData.push(data)
                if (data.qtt < products[i].amount) {
                    hasSufficientProducts = false
                }
            })
        }

        if (hasSufficientProducts) {
            for(let i = 0; i < products.length; i++) {
                total = total + parseFloat((productData[i].price*products[i].amount).toFixed(2))
                await prisma.product.update({
                    where: {
                        id: products[i].id
                    },
                    data: {
                        qtt: (productData[i].qtt - products[i].amount)
                    }
                })
            }
        }
        else {
            return res.status(400).send({ error: 'Produto insuficiente'})
        }

        const sale = await prisma.sale.create({
            data: {
                payment,
                total,
                saleproducts: {
                    create: data
                }
            }
        })

        return res.status(200).send(sale)
    }
    catch (err) {
        return res.status(400).send({ error: 'Erro ao cadastrar venda' })
    }
}

const deleteSale = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const deletedSaleproduct = prisma.saleproduct.deleteMany({
            where: {
                saleId: Number(id)
            }
        })
        const deletedSale = prisma.sale.delete({
            where: {
                id: Number(id)
            }
        })

        const transition = await prisma.$transaction([deletedSaleproduct, deletedSale])
        return res.json(transition)
    }
    catch (err) {
        return res.status(400).send({ error: 'Erro ao deletar venda' })
    }
}
export { listSales, addSale, deleteSale }