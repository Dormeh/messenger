const express = require('express');

const app = express();

app.use(express.static(__dirname + '/dist'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
