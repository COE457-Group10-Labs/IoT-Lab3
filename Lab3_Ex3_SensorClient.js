/** @author Mariam Reda, Farah Balaha */
/* Lab 3 Exercise 3 - NodeJs Socket Client */


var net = require('net');

var client = new net.Socket();

//add phone's IP and port
client.connect(19726, '10.0.1.92', function() {
    console.log("\n--Connected to Sensor Logger.\n");
});


//callback to execute when receiving data from sensor server (phone)
client.on('data', function(data) {
    try 
    {
        /* V1. print received data (initially - to see what is received) */
        //console.log(data.toString());

        //-------------------------------

        /* V2. convert received data to JSON object */
        //accelerometerData = JSON.parse(data.toString());
        // console.log("Accelerometer axes [x,y,z] = ", accelerometerData.accelerometer.value);

        //-------------------------------

        /* V2.2. output axes values individually */
        //accelerometerData = JSON.parse(data.toString());
        // console.log("Accelerometer: x = [", accelerometerData.accelerometer.value[0], "], y = [", accelerometerData.accelerometer.value[1],
        //  "], z = [", accelerometerData.accelerometer.value[2], "]");
         
        //-------------------------------

        /* V3. determing movement of phone (up or down) based on axis ranges */
        accelerometerData = JSON.parse(data.toString());
        var acc_X = accelerometerData.accelerometer.value[0];
        var acc_Y = accelerometerData.accelerometer.value[1];
        var acc_Z = accelerometerData.accelerometer.value[2];
        
        //movement up ranges: (0.1 < x), (0.3 < y), (z < 9.6)
        if ((0.1 < acc_X) && (0.3 < acc_Y) && (acc_Z < 9.6))
        { console.log("\tMoving upwards.\n"); }

        //movement down ranges: (x < -0.1), (y < -0.1), (9.89 > z)
        else if ((acc_X < -0.1) && (acc_Y < -0.1) && (acc_Z > 9.89))
        { console.log("\tMoving downwards.\n"); }

        //movement stationary ranges: (-0.1 < x < 0.1), (-0.1 < y < 0.1), (9.6 < z < 9.89)
        // -- no printing needed
    }
    catch(error)
    {
        console.log("ERROR: ", error.message);
    }
});


//callback to execute when closing connection with server
client.on('close', function() {
    console.log("\n--Connection closed.\n");
});

