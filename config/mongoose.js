// require module/library
const mongoose = require('mongoose');

// connect to db and data base new
mongoose.connect('mongodb://localhost/contacts_list_db');

// crete connection
const db = mongoose.connection;

// if error occur print
db.on('error',console.error.bind(console,'Error connection to db'));

// if not error then print successs message
db.once('open',function(){
    console.log("succefully connect to the mongodb");
});