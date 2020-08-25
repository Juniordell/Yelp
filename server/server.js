require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./db')

const morgan = require('morgan')

const app = express()
const PORT = process.env.PORT || 3001

// app.use(morgan('dev'))

app.use(cors())
app.use(express.json())

app.get('/api/v1/restaurants', async (req, res) => {

    try {
        const results = await db.query('select * from restaurants')
    
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
                restaurants: results.rows
            },
        })
    } catch(err) {
        console.error(err);
    }

})

app.get('/api/v1/restaurants/:id', async (req, res) => {
    console.log(req.params);

    try {
        const results = await db.query(' select * from restaurants where id = $1', [req.params.id])
        res.status(200).json({
            status: 'success',
            data: {
                restaurants: results.rows[0]
            },
        })
    } catch(err) {
        console.error(err);
    }

})

app.post('/api/v1/restaurants', async (req, res) => {

    try {
        const results = await db.query('INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *', [
            req.body.name,
            req.body.location,
            req.body.price_range
        ])

        console.log(results)
    
        res.status(201).json({
            status: 'success',
            data: {
                restaurant: results.rows[0]
            },
        })
    } catch(err) {
        console.error(err);
    }

})


app.put('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const results = await db.query('UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *', [
            req.body.name,
            req.body.location,
            req.body.price_range,
            req.params.id
        ])

        console.log(results)
    
        res.status(200).json({
            status: 'success',
            data: {
                restaurants: results.rows
            },
        })
    } catch(err) {
        console.error(err);
    }
})

app.delete('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const results = await db.query('DELETE FROM restaurants WHERE id = $1', [req.params.id])

        res.status(200).json({
            status: 'success',
        })
    } catch(err) {
        console.error(err);
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
})