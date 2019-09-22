const express = require("express");

const bodyParser = require("body-parser");
const {getAuthURL,getAccessToken} = require('./auth');
const {getProfileData, getContactData} = require('./getGoogleData');


const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/v1/login',(req,res)=>{
    let urlfound = getAuthURL();
    res.status(200).send({
        message:"working now",
        url : urlfound
    })
});

app.get('/api/v1/validateuser',(req,res)=>{
    const googleCode = req.query.code;
    function respondWithToken(token){
        res.status(200).send({
            message:"validated",
            token:token
        })
    }
    getAccessToken(googleCode,respondWithToken);
    // res.status(200).send({
    //     message:"validated",
    //     token:token
    // })
});

app.get('/api/v1/getProfileData',(req,res)=>{
    const authToken = req.headers.auth_token;
    function respondWithUserData(userData){
        res.status(200).send({
            name: userData.userName,
            email: userData.emailId
        })
    }
    getProfileData(authToken,respondWithUserData);
    }
)

app.get('/api/v1/getContacts',(req,res)=>{
    const authToken = req.headers.auth_token;
    function respondWithContactData(contactData){
        res.status(200).send({
            contacts:contactData
        })
    };
    getContactData(authToken,respondWithContactData);
})
const port = 8000;

app.listen(port, ()=>{
    console.log(`server running on ${port}`)
});