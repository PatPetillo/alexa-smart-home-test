// Handle directive for adjusting light brightness
module.exports = function handleAdjustBrightness(request, context) {
    // get device ID passed in during discovery
    let requestMethod = request.directive.header.name;
    // get user token pass in request
    let requestToken = request.directive.endpoint.token;

    // brightnessDelta is a value from -100 to 100
    let brightnessDelta = request.directive.payload.brightnessDelta;
    let timeOfSample = new Date();
    let contextResult = {
        "properties": [{
            "namespace": "Alexa.BrightnessController",
            "name": "brightness",
            "value": brightnessDelta,
            "timeOfSample": timeOfSample, //retrieve from result.
            "uncertaintyInMilliseconds": 200
        }]
    };
    let endpointResult = request.directive.endpoint;
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
    log("DEBUG", "Alexa.BrightnessController ", JSON.stringify(response));
    context.succeed(response);

    function log(message, message1, message2) {
        console.log(message + message1 + message2);
    }    
}