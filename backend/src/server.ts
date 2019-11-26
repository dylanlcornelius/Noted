import express = require('express');
import cors = require('cors');

const app = express();
app.use(cors());

app.use('/users', require('./user/user.controller'));
app.use('/books', require('./book/book.controller'));
app.use('/pages', require('./page/page.controller'));
app.use('/notes', require('./note/note.controller'));

app.listen(3002, () => {
    console.log('Server running on port 3001');
});
