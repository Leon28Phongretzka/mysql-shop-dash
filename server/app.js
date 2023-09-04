import express from 'express'
import cors from 'cors'

import { getAddresses, getAddress, createAddress } from './database.js'

const app = express()
app.use(cors({
    origin: '*'
}));
app.use(express.json())

app.get("/addresses", async (req, res) => {
  const addresses = await getAddresses()
  res.send(addresses)
})

app.get("/address/:id", async(req, res) => {
    const address = await getAddress(req.params.id)
    res.send(address)
    res.send(address.country_id);
    
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke 💩')
})
  
app.listen(3000, () => {
    console.log('Server is running on port 8080')
})