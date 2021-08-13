import express from 'express'
const app = express()


app.use('/products', require('./routes/products'))
app.use('/sales', require('./routes/sales'))

app.get('/', (req, res) => {
    return res.send('Sistema MERCADINHO')
})

app.listen(3000, () => console.log('Server is running...'))