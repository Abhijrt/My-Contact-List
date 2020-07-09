// import express package
const express = require('express');
// for path
const path = require('path');
const port = 8000;

contactList = [
    {
        name : "Abhay",
        phone : "1234567890"
    },
    {
        name : "Arpan",
        phone : "0987654321"
    }
]
// add database
const db = require('./config/mongoose');
const Contact = require('./models/contact');
// creating server
const app = express();
// setting the view engine and views
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
// Adding parser for request
app.use(express.urlencoded());



// rendering the page from the server
app.get('/',function(request,response){
    // rendering the page

    // fetching the data from the database
    Contact.find({},function(err,contacts){
        if(err){
            console.log("Error on fetching the database");
            return;
        }
        return response.render('home',{
            contact_list : contacts
        });
    });

    // return response.render('home',{
    //     contact_list : contactList
    // });
    // response.send('<h1>Cool Bro!</h1>');
});

app.get('/profile',function(request,response){
    response.send('profile page');
});

app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name : req.body.name,
    //     phone : req.body.phone
    // });
//  adding contact to database
    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    },function(err,newContact){
        if(err){
            console.log("Error in adding contact");
            return ;
        }
        console.log('****$$$###',newContact);
        return res.redirect('back');
    });


    // contactList.push(req.body);
    // console.log(req.body);
    // redirect to the same page
    // return res.redirect('back');
});

app.get('/delete-contact',function(req,res){
    // fetching id
    let id = req.query.id;
    //  find in database
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("error",id);
            return;
        }
        return res.redirect('back');
    });



    // let phone = req.query.phone;

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // if(contactIndex != 0){
    //     contactList.splice(contactIndex,1);
    // }
    // return res.redirect('back');
});

app.listen(port,function(err){
    if(err){
        console.log("Error");
        return;
    }
    console.log("Yup!my first Express js Server is running.")
});


// MVC Real Life Example
// https://medium.freecodecamp.org/simplified-explanation-to-mvc-5d307796df30

// MVC MVP and MVVM Frameworks
// https://medium.com/@ankit.sinhal/mvc-mvp-and-mvvm-design-pattern-6e169567bbad

// template Engine
// https://github.com/expressjs/express/wiki#template-engines