// Handle directive for setting the color of a light
module.exports = function handleSetColor(request, context) {
    // get device ID passed in during discovery
    let requestMethod = request.directive.header.name;
    // get user token pass in request
    let requestToken = request.directive.endpoint.token;

    let color = request.directive.payload.color;

    let timeOfSample = new Date();
    let contextResult = {
        "properties": [{
            "namespace": "Alexa.ColorController",
            "name": "color",
            "value": color,
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
    log("DEBUG", "Alexa.ColorController ", JSON.stringify(response));
    context.succeed(response);

    function log(message, message1, message2) {
        console.log(message + message1 + message2);
    }
    
};