const mongoose = require('mongoose');

const DB = 'mongodb://127.0.0.1:27017/whitesoft';

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
}).then(() => {
    console.log(`connnection successful`);
}).catch((err) => console.log(`no connection ${err}`));