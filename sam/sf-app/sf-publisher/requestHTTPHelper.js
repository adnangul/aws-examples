
const https = require('https') ;

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

function testhttpsGet(){
    const options = {
        hostname: 'ayaqoob.wordpress.com',
        port: 443,
        path: '/',
        method: 'POST',
        headers: {
            //"Content-Type": "application/json"
         },
      };
      
      const req = https.request(options, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);
      
        res.on('data', (d) => {
          //process.stdout.write(d);
          console.log("got data") ;
        });
      });
      
      req.on('error', (e) => {
        console.error(e);
      });

      req.end();
}


function testhttpsPost(host, path){
    const options = {
        hostname: host,
        port: 443,
        path: path,
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
         },
      };
      
      const req = https.request(options, (res) => {
        var responseString = "";
        console.log('statusCode:', res.statusCode);
        //console.log('headers:', res.headers);
      
        res.on('data', (d) => {
          //process.stdout.write(d);
          //console.log("got data") ;
          responseString += d;
        });

        res.on("end", function () {
            console.log(responseString); 
            // print to console when response ends
        });

      });
      
      req.on('error', (e) => {
        console.error(e);
      });

      //req.write() ;
      req.end();
}

function testAuthHttps(host, path, url){

    try{
    // Setting URL and headers for request
    
    let options = {
        host: host,
        path: path,
        port: 443,
        headers: {
            "Content-Type": "application/json"
         },
        body: {
             
         },
        // json: true,
        method: 'POST',
    };

    var req = https.request(options, function (res) {
        var responseString = "";
    
        res.on("data", function (data) {
            responseString += data;
            // save all the data from response
        });
        res.on("end", function () {
            console.log(responseString); 
            // print to console when response ends
            
        });
    });

    //req.write();
    req.end() ;

}catch(err){
  console.log(err)  ;
}
/*     var initializePromise = getDataPromise(options);
    initializePromise.then(function(result) {
        console.log("Initialized user details");
        // Use user details from here
        console.log("Access token: " + result.access_token) ;
    }, function(err) {
        console.log(err);
    }).then(function(result) {
        console.log("done") ;
    }) ; */
}

//testAuth('https://test.salesforce.com/services/oauth2/token?client_secret=31F51219627564E5548AA3BDD4E23920ABC552580F508265B3DEC6CA1D709916&username=adnan.yaqoob@labcorp.com.dev&grant_type=password&client_id=3MVG9jBOyAOWY5bXdcE2zYgywJsubSFHmB1_9ravQ7mT9Kr.baMby6fvTwmzVQ.dweXu1hX7C6P4SayRe.c94&password=iluAmber$123r1a4Jd4Mjy8znTRMJaxWCF1Da');
//testhttpsGet() ;
//testhttpsPost('test.salesforce.com', '/services/oauth2/token?client_secret=31F51219627564E5548AA3BDD4E23920ABC552580F508265B3DEC6CA1D709916&username=adnan.yaqoob@labcorp.com.dev&grant_type=password&client_id=3MVG9jBOyAOWY5bXdcE2zYgywJsubSFHmB1_9ravQ7mT9Kr.baMby6fvTwmzVQ.dweXu1hX7C6P4SayRe.c94&password=iluAmber$123r1a4Jd4Mjy8znTRMJaxWCF1Da') ;
testAuthHttps('test.salesforce.com', '/services/oauth2/token?client_secret=31F51219627564E5548AA3BDD4E23920ABC552580F508265B3DEC6CA1D709916&username=adnan.yaqoob@labcorp.com.dev&grant_type=password&client_id=3MVG9jBOyAOWY5bXdcE2zYgywJsubSFHmB1_9ravQ7mT9Kr.baMby6fvTwmzVQ.dweXu1hX7C6P4SayRe.c94&password=iluAmber$123r1a4Jd4Mjy8znTRMJaxWCF1Da') ;

module.exports = {
    getDataPromise
};
