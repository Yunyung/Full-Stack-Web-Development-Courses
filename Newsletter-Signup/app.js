// jshint esversion:6

const express = require('express');
const request = require('request');


const app = express();


const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email, 
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data); // turn Javascript object into a flatpack Jason
    console.log(jsonData);

    var options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/abd5e55400",
        method: "POST",
        headers: {
            Authorization: "Basic 133d0e170cf9ccdc6e8c65cb4ef23ee3-us4"
        },
        body: jsonData
    };

    request(options, function(error, response, body) {
        if (error){
            res.write("Error Message:" + error);
            res.sendFile(__dirname + "/failure.html");
        } else {
            if (response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        }
    }); 
});

app.post("/failure", function(req, res) {
    res.redirect("/");
});


app.listen(port, function() {
    console.log(`Server is running on port ${port}...`);
});

/* 
API key: 133d0e170cf9ccdc6e8c65cb4ef23ee3-us4
list id: abd5e55400
 */