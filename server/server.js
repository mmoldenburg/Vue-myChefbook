const express = require('express');
const path = require('path');
const cors = require('cors');
const scrapper = require('./scrappingChefkoch')

const app = express();
app.use(cors());
app.use(express.json())

const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, '../my-app/dist')));
        
try {
    app.post('/api/url', async (req, res) => {
        const result = await scrapper.scrappingChefkoch(req.body.url)

        res.send(result)     
    });
} catch (error) {
    console.log(error.message)
}    

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
  });
   
app.listen(port, () => {
    console.log("Server has started on port 5000");
});