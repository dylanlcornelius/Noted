import express = require('express');
import cors = require('cors');

const app = express();
app.use(cors());

app.use('/user', require('./user/user.route'));

app.listen(3002, () => {
    console.log('Server running on port 3001');
});
