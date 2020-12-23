const express = require('express')
const bodyParser = require('body-parser')
const controlller = require('./transform.controller')
const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/transform', (req, res) => {
    let payload = req.body.payload
    let refData = req.body.referenceData
    if (Object.keys(payload).length == 0 || Object.keys(refData).length == 0) {
        return res.status(400).send('Please enter payload & refdata')
    }
    try {
        let data = controlller.transformData(payload, refData)
        res.status(200).send(data)
    } catch (error) {
        console.log("Error in transformation", error)
        res.status(500).send('Something went wrong')
    }

})

let server = app.listen(8012, () => {    
    console.log(`Server running on port 8012`)

});
