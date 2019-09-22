const request = require('request');
const convert = require('xml-js');

function getProfileData(token,callback){
    const url = "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses"
    const options = {
        url:url,
        headers:{Authorization: "Bearer "+ token }
    }
    request.get(options,(err,res,body)=>{
        const bodyData = JSON.parse(body);
        const userName = bodyData["names"][0].displayName;
        const emailId = bodyData.emailAddresses[0].value;
        const userData = {userName:userName,emailId:emailId};
        callback(userData);
    })
}

function getContactData(token,callback){
    const url = "https://www.google.com/m8/feeds/contacts/default/full?alt=json&max-results=20000";//https://www.google.com/m8/feeds/contacts/dilp41195%40gmail.com/full?start-index=26&max-results=25
    const options = {
        url:url,
        headers:{Authorization: "Bearer "+ token},
    };
    request.get(options,(err,res,body)=>{
        // const bodyStr = convert.xml2json(body,{compact:true});
        // const bodyReplacedStr = bodyStr.replace(/\\/g, '');
        const bodyJson = JSON.parse(body);
        let contactJson = []
        let i =0;
        for (i=0;i< bodyJson.feed.entry.length;i++) {
            let contact = bodyJson.feed.entry[i] 
            if (contact.gd$phoneNumber){
                let name = contact.title.$t
                contactJson.push({"name":name});
            }
        }
        
        // const bodyData = JSON.parse(body);
        // const contactData = bodyData;
        callback(contactJson);
    });
}

module.exports = {getProfileData, getContactData};