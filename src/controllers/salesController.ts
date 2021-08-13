import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const listSales = async () => {
    console.log('list sales')
}
export { listSales }