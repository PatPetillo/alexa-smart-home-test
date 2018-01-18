const handleDiscovery = require('./handlerFunctions/handleDiscovery');
const handlePowerControl = require('./handlerFunctions/handlePowerControl');
const handleAdjustBrightness = require('./handlerFunctions/handleAdjustBrightness');
const handleSetBrightness = require('./handlerFunctions/handleSetBrightness');
const handleSetColor = require('./handlerFunctions/handleSetColor');
const handleSetTargetTemperature = require('./handlerFunctions/handleSetTargetTemperature');

// Hanlder function for directive requests and responses 
exports.handler = function (request, context) {
  // Call corresponding handler function for a response based on directive request 
  if (request.directive.header.namespace === 'Alexa.Discovery' && request.directive.header.name === 'Discover') {
      log("DEBUG:", "Discover request",  JSON.stringify(request));
      handleDiscovery(request, context, "");
  }
  else if (request.directive.header.namespace === 'Alexa.PowerController') {
      if (request.directive.header.name === 'TurnOn' || request.directive.header.name === 'TurnOff') {
          log("DEBUG:", "TurnOn or TurnOff Request", JSON.stringify(request));
          handlePowerControl(request, context);
      }
  }
  else if (request.directive.header.namespace === 'Alexa.BrightnessController') {
      if (request.directive.header.name === 'AdjustBrightness') {
          log("DEBUG:", "AdjustBrightness BrightnessController Request", JSON.stringify(request));
          handleAdjustBrightness(request, context);
      }
      else if (request.directive.header.name === 'SetBrightness'){
          log("DEBUG:", "SetBrightness BrightnessController Request", JSON.stringify(request));
          handleSetBrightness(request, context);
      }
  }
  else if (request.directive.header.namespace === 'Alexa.ColorController') {
      if (request.directive.header.name === 'SetColor') {
          log("DEBUG:", "SetColor Request", JSON.stringify(request));
          handleSetColor(request, context);
      }
  }
  else if (request.directive.header.namespace === 'Alexa.ThermostatController'){
    if (request.directive.header.name === 'SetTargetTemperature'){
      log("DEBUG:", "SetTargetTemperature Request", JSON.stringify(request));
      handleSetTargetTemperature(request, context);
    }
  }

  function log(message, message1, message2) {
    console.log(message + message1 + message2);
  }
};