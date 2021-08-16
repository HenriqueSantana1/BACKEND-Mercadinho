import express from 'express'
const cors = require('cors');

const app = express()

app.use(cors())
app.use(express.json())
app.use('/products', require('./routes/products'))
app.use('/sales', require('./routes/sales'))

app.get('/', (req, res) => {
    return res.send('Sistema MERCADINHO')
})

app.listen(8080, () => console.log('Server is running...'))
