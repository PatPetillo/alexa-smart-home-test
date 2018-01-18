  // Handle directiver for setting the brightness of a light
  module.exports = function handleSetBrightness(request, context) {
    // get device ID passed in during discovery
    let requestMethod = request.directive.header.name;
    // get user token pass in request
    let requestToken = request.directive.endpoint.token;

    let brightness = request.directive.payload.brightness;
    let timeOfSample = new Date();
    let contextResult = {
        "properties": [{
            "namespace": "Alexa.BrightnessController",
            "name": "brightness",
            "value": brightness,
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