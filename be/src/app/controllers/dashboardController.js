const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const Leds = require('../models/Leds');
const Temps = require('../models/Temps');
const Lights = require('../models/Lights');

const mqtt = require('mqtt');
const io = require('socket.io')();
const EventEmitter = require('events')

class dashBoardController extends EventEmitter { 
    constructor(io, mqttClient) { 
        super();
        this.io = io;
        this.mqttClient = mqttClient;

        this.mqttClient.on('connect', () => { 
            console.log('Connected to Adafruit MQTT Broker');
            this.mqttClient.subscribe('khiemtruong0503/feeds/bbc-led');
            this.mqttClient.subscribe('khiemtruong0503/feeds/bbc-temp');
        });

        this.mqttClient.on('message', async (topic, message) => { 
            console.log('Received message: ', message.toString(), ' from feed: ', topic);

            const data = JSON.parse(JSON.stringify(message.toString()));

            try { 
                // find document based on the topic
                let input;
                switch (topic) { 
                    case 'khiemtruong0503/feeds/bbc-led': 
                        input = await Leds.findOne( { name: "BBC_LED" });
                        console.log("Led: " + input.toString());
                        break;
                    case 'khiemtruong0503/feeds/bbc-temp': 
                        input = await Temps.findOne( {name: "BBC_TEMP" });
                        console.log("Temp: " + input.toString());
                        break;
                    case 'khiemtruong0503/feeds/bbc-light': 
                        input = await Lights.findOne( {name: "BBC_LIGHT" });
                        console.log("Light: " + input.toString());
                        break;
                }

                if(!input) { 
                    console.error('Sensor not found.');
                    return;
                }

                // Update the appropriate field with the received message
                switch (topic) { 
                    case 'khiemtruong0503/feeds/bbc-led': 
                        console.log('message: ' + message.toString());
                        input.value = data;
                        break;
                    case 'khiemtruong0503/feeds/bbc-temp':
                        console.log('message: ' + message.toString());
                        input.temp = data;
                        break;
                    case 'khiemtruong0503/feeds/bbc-light': 
                        console.log('message: ' + message.toString());
                        input.light_value = data;
                        break;
                }

                // Save the updated document to the database
                await input.save();

                console.log('Sensor data saved to mongoDB!');

                this.emitSensorData();
            } catch (error) { 
                console.error('Error saving sensor data: ', error);
            }
        });
    }

    async emitSensorData() { 
        try { 
            const sensors = await Leds.find({});
            // Emit the updated sensor data to all connect clients
            this.io.emit('sensorDataUpdated', multipleMongooseToObject(sensors));
        } catch (error) { 
            console.error('Error fetching sensor data: ', error);
        }
    }

    async dashboard(req, res, next) { 
        try { 
            const sensors = await Leds.find({});
            res.json( { sensors: multipleMongooseToObject(sensors) });
        } catch (error) { 
            next(error);
        }
    }
}

