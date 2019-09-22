const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly','https://www.googleapis.com/auth/contacts.readonly','https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email'];
const credentials = JSON.parse(fs.readFileSync('credentials.json'));
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.



// authorize(JSON.parse(content));

function getAuthURL(){
    let urlfound = authorize(credentials);
    return urlfound;
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  let authUrl = getAuthurl(oAuth2Client);
  return authUrl;
}

function getAuthurl(oAuth2Client){
    const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  return authUrl;
};

function getAccessToken(code,callback){
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    oAuth2Client.getToken(code,(err,token)=>{
        oAuth2Client.setCredentials(token);
        callback(token);
        console.log(token);
    });
    return oAuth2Client;
}


module.exports = {
    getAuthURL,
    getAccessToken
}