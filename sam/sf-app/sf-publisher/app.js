const requestHelper = require('./requestHelper.js');

//let response;
var authToken = "" ;

/**
 * to generate message 
 * sam local generate-event sns notification --message "$(cat event.json)"
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = function(event, context, callback) {
    try {
        //console.log('Received event:', JSON.stringify(event, null, 4));
        let statusCode = 200 ;

        if(!event.Records){
            console.log("Received an invalid message/payload") ;
            statusCode = 400 ;
            callback(null, statusCode)  ;
        }

        // var SnsMessageId = event.Records[0].Sns.MessageId;
        // var SnsPublishTime = event.Records[0].Sns.Timestamp;
        // var SnsTopicArn = event.Records[0].Sns.TopicArn;
        // var LambdaReceiveTime = new Date().toString();
        var message = event.Records[0].Sns.Message;
        //console.log('Message received from SNS:', message); 
        //console.log("Value test for test of !ref param:" + process.env.TEST) ;
        console.log("SNS Message type: "   + (typeof message) );
        if(typeof message == 'string'){
          message = JSON.parse(message) ;
          console.log("Message type after attempting to parse: "   + (typeof message) );
        }

        if(message.keys){
            console.log("Processing request with LPID: " + message.keys.LPID) ;

            var authRequestPromise = requestHelper.getDataPromise(
                                                    requestHelper.buildAuthRequest());
            authRequestPromise.then(function(result) {
                //console.log("Got auth response...");
                authToken = result.access_token ;
                console.log("Received access token...") ;
                //console.log("Got access token: " + authToken) ;
                return authToken ;

            }, errHandler).then(function(token) {

                //building payload to send to salesforce
                let payload = {
                    "FirstName__c" : message.values.First_Name,
                    "LastName__c" : message.values.Last_Name,
                    "AppointmentNumber__c" : message.values.lab_appt_confirmation_no,
                    "PlanName__c" : message.values.insurance_plan,
                    "WalgreensLabLocation__c" : message.values.walgreens_lab_service_location,
                    "LPID__c" : message.keys.LPID,
                    "AppointmentDate__c" : "2019-11-09",
                    "DOB__c" : message.values.DOB,
                    "Xcode__c" : message.values.Xcode,
                    "Gender__c" : message.values.gender,
                    "PatientStatus__c" : "V2ACTIVE",
                    "Language__c" : message.values.language,
                    "ExpressPhone__c" : message.values.contact_phone,
                    "ExpressEmail__c" : message.values.Email_Address,
                    "MiddleName__c" : message.values.middle_initial,
                    "LastInteractionDate__c" : message.values.last_interaction_date,
                    "ContactOptIn__c" : message.values.consent_to_contact,
                    "Street__c" : message.values.patient_address,
                    "City__c" : message.values.city,
                    "State__c" : message.values.state,
                    "BillToFirstName__c" : message.values.bill_to_first_name,
                    "BillToLastName__c" : message.values.bill_to_last_name
                } ;
            
                //console.log("Payload: " + JSON.stringify(payload)) ;

                var apptRequestPromise = requestHelper.getDataPromise(
                                            requestHelper.buildAppointmentRequest(token, payload));
                apptRequestPromise.then(function(result){
                    console.log("Got salesforce response...");
                    if(result.success){
                    statusCode = 200 ;
                    console.log("data successfully sent to salesforces sc... ") ;
                    }else{
                        statusCode = 401 ;
                        console.error("Unable to publish to salesforces, "
                                    + " Error code:" + result[0].errorCode
                                    + " Error message:" + result[0].message) ;
                        
                    }
                    callback(null, statusCode)  ;
                }).catch(function(err) {
                    errHandler(err, callback) ;
                  }
                );
            }) ;

        }else{
            console.log("message doesn't have test property and is a simple string") ;
            statusCode = 400 ;
            callback(null, statusCode)  ;
        }

    } catch (err) {
        errHandler(err, callback) ;
    }
};

var errHandler = function(err, callback) {
    console.error("Error occured during processing... " + err);
    callback(err, 500);
}
