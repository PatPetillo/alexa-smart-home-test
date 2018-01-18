//Maps what is discovered to a JSON that can be used to apply directives 
module.exports = function handleDiscovery(request, context) {
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

    function log(message, message1, message2) {
        console.log(message + message1 + message2);
    }
}