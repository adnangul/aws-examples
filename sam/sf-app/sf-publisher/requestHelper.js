var request = require("request");

function getDataPromise(options) {
    // Return new promise 
    return new Promise(function(resolve, reject) {
    	// Do async job
        request(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })

}

function buildAuthRequest(){
    let cred ={
        //LoginURL : 'https://test.salesforce.com/services/oauth2/token',
        LoginURL: process.env.SF_AUTH_TOKEN_URL,
        Username: process.env.USER_NAME,
        Password: process.env.PASSWORD,
        ClientID: process.env.CLIENT_ID,
        ClientSecret: process.env.CLIENT_SECRET,
        GrantType: process.env.GRANT_TYPE
    }

    let options = {
        url: (cred.LoginURL
                          +'?username='+cred.Username
                          +'&password='+encodeURIComponent(cred.Password)
                          +'&client_id='+encodeURIComponent(cred.ClientID)
                          +'&client_secret='+encodeURIComponent(cred.ClientSecret)
                          +'&grant_type='+ cred.GrantType),
        headers: {
            'Content-Type' : 'application/json'
        },
        method: 'POST',
    };
    //console.log(options.url);
    
    return options ;
}

function buildAppointmentRequest(authToken, payload){
    let options = {
        //url: 'https://cs36.salesforce.com/services/data/v46.0/sobjects/Appointment__e',
        url: process.env.SF_APPT_API_URL,
         headers: {
             'Authorization' : 'Bearer ' + authToken,
             'Content-Type' : 'application/json',
        },
         body: JSON.stringify(payload),
        // json: true,
        method: 'POST',
    };
    //console.log(options.url);

    return options;
}

/*
function testAuth(url) {

    // Setting URL and headers for request
    let options = {
        url: url,
        // headers: {
        //     'User-Agent': 'request'
        // },
        // body: {
        //     'test' : 'value'
        // },
        // json: true,
        method: 'POST',
    };

    var initializePromise = getDataPromise(options);
    initializePromise.then(function(result) {
        console.log("Initialized user details");
        // Use user details from here
        console.log("Access token: " + result.access_token) ;
    }, function(err) {
        console.log(err);
    }).then(function(result) {
        console.log("done") ;
    }) ;
}
*/

/*
function testAppt(url) {
    let authToken = '00D2h0000008iiM!AQMAQJm.VUypngumOhY91VLnnxH4pSkjSklIUu38TIy6VUGI9m4hfkqzR7AlWCLcJYNIdPyseLhgcms5l5Flm84hXJqY_9FC' ;
    let payload = {
        "FirstName__c" : "ABC",
        "LastName__c" : "XYZ",
        "AppointmentNumber__c" : "110593",
        "PlanName__c" : "Help with patient 8",
        "WalgreensLabLocation__c" : "Las Vegas",
        "LPID__c" : "110501",
        "AppointmentDate__c" : "2019-11-09",
        "DOB__c" : "1993-11-09",
        "Xcode__c" : "X01985",
        "Gender__c" : "M",
        "PatientStatus__c" : "V2ACTIVE",
        "Language__c" : "en",
        "ExpressPhone__c" : "555-5555",
        "ExpressEmail__c" : "franco.molfino@globant.com"
      } ;

      
    // Setting URL and headers for request
    let options = {
        url: 'https://cs36.salesforce.com/services/data/v46.0/sobjects/Appointment__e',
         headers: {
             'Authorization' : 'Bearer ' + authToken,
             'Content-Type' : 'application/json',
        },
         body: JSON.stringify(payload),
        // json: true,
        method: 'POST',
    };

    var initializePromise = getDataPromise(options);
    initializePromise.then(function(result) {
        console.log("Got response... ");
        // Use user details from here
        console.log("Success?: " + result.success) ;
    }, function(err) {
        console.log(err);
    }).then(function(result) {
        console.log("done") ;
    }) ;
}

*/


//testAuth('https://test.salesforce.com/services/oauth2/token?client_secret=31F51219627564E5548AA3BDD4E23920ABC552580F508265B3DEC6CA1D709916&username=adnan.yaqoob@labcorp.com.dev&grant_type=password&client_id=3MVG9jBOyAOWY5bXdcE2zYgywJsubSFHmB1_9ravQ7mT9Kr.baMby6fvTwmzVQ.dweXu1hX7C6P4SayRe.c94&password='+ process.env.PASSWORD);
//testAppt('https://cs36.salesforce.com/services/data/v46.0/sobjects/Appointment__e');

module.exports = {
    getDataPromise,
    buildAuthRequest,
    buildAppointmentRequest
};
