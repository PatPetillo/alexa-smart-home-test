// Handle directive for Thermostat Set Target Temperature 
module.exports = function handleSetTargetTemperature(request, context) {
  let requestMethod = request.directive.header.name;
  // get user token pass in request
  let requestToken = request.directive.endpoint.token;
  let targetValue = request.directive.payload.value;

  // if (requestMethod === "SetTargetTemperature") {
  //     // Make the call to your device cloud for control 
  //     // powerResult = stubControlFunctionToYourCloud(endpointId, token, request);
  //     let targetValue = request.directive.payload.value;;
  // }
  // else if (requestMethod === "TurnOff") {
  //     // Make the call to your device cloud for control and check for success 
  //     // powerResult = stubControlFunctionToYourCloud(endpointId, token, request);
  //     powerResult = "OFF";
  // }

  let timeOfSample = new Date();
  let contextResult = {
      "properties": [{
          "namespace": "Alexa.ThermostatController",
          "name": "targetSetpoint",
          "value": targetValue,
          "timeOfSample": timeOfSample, 
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
  log("DEBUG", "Alexa.ThermostatController ", JSON.stringify(response));
  context.succeed(response);

  function log(message, message1, message2) {
    console.log(message + message1 + message2);
  }
}