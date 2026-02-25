require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Database Connected"))
.catch(err => console.log("❌ DB Error:", err))

// Test Route
app.get('/', (req, res) => {
    res.send("🚀 Backend Running Successfully")
})
const PORT = process.env.PORT || 5000

const Medicine = require('./Medicine')
// Add Medicine
app.post('/add-medicine', async (req, res) => {
    try {
        const newMedicine = new Medicine(req.body)
        await newMedicine.save()
        res.status(201).json(newMedicine)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Get All Medicines
app.get('/medicines', async (req, res) => {
    try {
        const medicines = await Medicine.find()
        res.json(medicines)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
})