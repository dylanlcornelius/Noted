const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;

app.use(cors());
app.use('/user', require('./user/user.controller'));
app.use('/page', require('./page/page.controller'));
app.use('/note', require('./note/note.controller'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
