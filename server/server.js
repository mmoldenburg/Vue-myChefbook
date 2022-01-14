const express = require('express');
const path = require('path');
// const serveStatic = require('serve-static');
// const history = require('connect-history-api-fallback');
const cors = require('cors');
const scrapper = require('./scrappingChefkoch')

const app = express();
app.use(cors());
app.use(express.json())
// app.use(express.static(path.join(__dirname, '../dist')));
// app.use(history())

const port = process.env.PORT || 5000;
        
try {
    app.post('/url', async (req, res) => {
        const result = await scrapper.scrappingChefkoch(req.body.url)
        // console.log(result)
        res.send(result)     
    });
} catch (error) {
    console.log(error.message)
}    
   
app.listen(port, () => {
    console.log("Server has started on port 5000");
});