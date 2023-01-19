const express = require('express');

const app = express();

app.use('/*',express.static(__dirname + '/dist'));


// app.use(()=> {
//     console.log('jjjjj');
// })

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
