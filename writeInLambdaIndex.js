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
  
    //Maps what is discovered to a JSON that can be used to apply directives 
    function handleDiscovery(request, context) {
        let payload = {
            "endpoints":
            [
                {
                    "endpointId": "Light-Test-Id",
                    "manufacturerName": "Smart Device Company",
                    "friendlyName": "Bedroom Light",
                    "description": "Smart Light",
                    "displayCategories": ["LIGHT"],
                    "capabilities":
                    [
                        {
                          "type": "AlexaInterface",
                          "interface": "Alexa",
                          "version": "3"
                        },
                        // PowerController (On, Off)
                        {
                            "interface": "Alexa.PowerController",
                            "version": "3",
                            "type": "AlexaInterface",
                            "properties": {
                                "supported": [{
                                    "name": "powerState",
                                }],
                                  "proactivelyReported": true,
                                  "retrievable": true
                            }
                        },
                        // Brightness Controller (Delta -100, 100)
                        {
                            "interface": "Alexa.BrightnessController",
                            "version": "3",
                            "type": "AlexaInterface",
                            "properties": {
                                "supported": [{
                                    "name": "brightnessDelta",
                                    "name": "brightness"
                                }],
                                  "proactivelyReported": true,
                                  "retrievable": true
                            }
                        },
                        // Color Controller (hue 0.0-360.0, saturation 0.0-1.0, brightness(0.0-1.0)    
                        {
                            "interface": "Alexa.ColorController",
                            "version": "3",
                            "type": "AlexaInterface",
                            "properties": {
                                "supported": [{
                                    "name": "color",
                                }],
                                  "proactivelyReported": true,
                                  "retrievable": true
                            }
                        }
                    ]
                }, 
                {  
                    "endpointId":"appliance-001",
                    "friendlyName":"Living Room Entertainment System",
                    "description":" Entertainment System by Sample Manufacturer",
                    "manufacturerName":"Sample Manufacturer",
                    "displayCategories":[  
                        "TV"
                    ],
                    "cookie":{  
                        "extraDetail1":"optionalDetailForSkillAdapterToReferenceThisDevice",
                        "extraDetail2":"There can be multiple entries",
                        "extraDetail3":"but they should only be used for reference purposes",
                        "extraDetail4":"This is not a suitable place to maintain current device state"
                    },
                    "capabilities":[  
                        {  
                            "type":"AlexaInterface",
                            "interface":"Alexa.Speaker",
                            "version":"1.0",
                            "properties":{  
                                "supported":[  
                                {  
                                    "name":"volume"
                                },
                                {  
                                    "name":"muted"
                                }
                                ]
                            }
                        },
                        {  
                            "type":"AlexaInterface",
                            "interface":"Alexa.ChannelController",
                            "version":"1.0",
                            "properties":{  
                                "supported":[  
                                {  
                                    "name":"channel"
                                }
                                ]
                            }
                        },
                        {  
                            "type":"AlexaInterface",
                            "interface":"Alexa.PlaybackController",
                            "version":"1.0",
                            "properties":{ },
                            "supportedOperations" : ["Play", "Pause", "Stop"] 
                        },
                        {  
                            "type":"AlexaInterface",
                            "interface":"Alexa.InputController",
                            "version":"1.0",
                            "properties":{  
                                "supported":[  
                                {  
                                    "name":"input"
                                }
                                ]
                            }
                        }
                    ]
                },
                {
                  "endpointId":"appliance-002",
                  "friendlyName":"Hallway Thermostat",
                  "description":"Smart Thermostat by Sample Manufacturer",
                  "manufacturerName":"Sample Manufacturer",
                  "displayCategories":[
                     "THERMOSTAT"
                  ],
                  "cookie":{
   
                  },
                  "capabilities":[
                     {
                        "type":"AlexaInterface",
                        "interface":"Alexa.ThermostatController",
                        "version":"3",
                        "properties":{
                           "supported":[
                              {
                                 "name":"lowerSetpoint"
                              },
                              {
                                 "name":"targetSetpoint"
                              },
                              {
                                 "name":"upperSetpoint"
                              },
                              {
                                 "name":"thermostatMode"
                              }
                           ],
                           "proactivelyReported":true,
                           "retrievable":true
                        }
                     },
                     {
                        "type":"AlexaInterface",
                        "interface":"Alexa.TemperatureSensor",
                        "version":"3",
                        "properties":{
                           "supported":[
                              {
                                 "name":"temperature"
                              }
                           ],
                           "proactivelyReported":true,
                           "retrievable":true
                        }
                     }
                  ]
               }
            ]
        };
        // On success return the appropriate directive response 
        let header = request.directive.header;
        header.name = "Discover.Response";
        log("DEBUG", "Discovery Response: ", JSON.stringify({ header: header, payload: payload }));
        context.succeed({ event: { header: header, payload: payload } });
    }
  
    function log(message, message1, message2) {
        console.log(message + message1 + message2);
    }
  
    // Handle directive for Power Control (on or off)
    function handlePowerControl(request, context) {
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
    }
  
    // Handle directive for adjusting light brightness
    function handleAdjustBrightness(request, context) {
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
    }
  
    // Handle directiver for setting the brightness of a light
    function handleSetBrightness(request, context) {
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
    }
  
    // Handle directive for setting the color of a light
    function handleSetColor(request, context) {
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
    };
    // Handle directive for Thermostat Set Target Temperature 
    function handleSetTargetTemperature(request, context) {
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
    }
  };