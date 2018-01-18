  // Handle directive for Power Control (on or off)
  module.exports = function handlePowerControl(request, context) {
    let requestMethod = request.directive.header.name;
    // get user token pass in request
    let requestToken = request.directive.endpoint.token;
    let powerResult;

    if (requestMethod === "TurnOn") {

        // Make the call to your device cloud for control 
        // powerResult = stubControlFunctionToYourCloud(endpointId, token, request);
        powerResult = "ON";
    }
    else if (requestMethod === "TurnOff") {
        // Make the call to your device cloud for control and check for success 
        // powerResult = stubControlFunctionToYourCloud(endpointId, token, request);
        powerResult = "OFF";
    }

    let timeOfSample = new Date();
    let contextResult = {
        "properties": [{
            "namespace": "Alexa.PowerController",
            "name": "powerState",
            "value": powerResult,
            "timeOfSample": timeOfSample, 
            "uncertaintyInMilliseconds": 200
        }]
    };
    let endpointIdResult = request.directive.endpoint.endpointId;
    let accessToken = request.directive.endpoint.scope.token;
    let endpointResult = request.directive.endpoint;
    // let endpointResult = {
    //   "endpoint": {
    //     "scope": {
    //       "type": "BearerToken",
    //       "token": accessToken
    //     },
    //       "endpointId": endpointIdResult,
    //       "cookie": {}
    //     }
    // };
    let responseHeader = request.directive.header;
    responseHeader.name = "Alexa.Response";
    responseHeader.messageId = responseHeader.messageId + "-R";
    let response = {
        context: contextResult,
        event: {
            header: responseHeader
        },
        endpoint: endpointResult,
        payload: {}

    };
    log("DEBUG", "Alexa.PowerController ", JSON.stringify(response));
    context.succeed(response);

    function log(message, message1, message2) {
        console.log(message + message1 + message2);
    }
}
