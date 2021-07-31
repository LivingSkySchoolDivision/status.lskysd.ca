
var division_max_throughput_mbps_in = 1000;
var division_max_throughput_mbps_out = 1000;
var division_internet_json_path_1 = strendinMonitorJSONRoot + "/snmpthroughputsensors/1"
var division_internet_json_path_2 = strendinMonitorJSONRoot + "/snmpthroughputsensors/2"
var division_snmp_is_reversed = true;


/* ******************************************** */
/* * Functions and things you shouldn't edit  * */
/* ******************************************** */

function updateNames() {
    $('#division_max_in').html(division_max_throughput_mbps_in + ' mbps');
    $('#division_max_out').html(division_max_throughput_mbps_out + ' mbps');
}

function updateDivisionCurrent() {
    // Collect data from both sources
    var currentMBPSIn = '';
    var outTrafficString = '';
    var peakMBPSIn = '';
    var peakMBPSOut = '';
    var division_snmp_sensor_id = 0;
    var peakDateIn = '';
    var peakDateOut = '';
    var bpsIn = 0;
    var bpsOut = 0;

    // Get data from sensor 1
    // Get data from sensor 2 and see if there is more traffic there

    $.getJSON(division_internet_json_path_1, function(data) {
        var trafficSource1 = parseFloat(data.lastBPSIn) + parseFloat(data.lastBPSOut);

        currentMBPSIn = data.lastBPSIn/1000/1000;
        currentMBPSOut = data.lastBPSOut/1000/1000;
        division_snmp_sensor_id = data.id;
        bpsIn = data.lastBPSIn;
        bpsOut = data.lastBPSOut;

        $.getJSON(division_internet_json_path_2, function(datatwo) {
            var trafficSource2 = parseFloat(datatwo.lastBPSIn) + parseFloat(datatwo.lastBPSOut);
            
            if (trafficSource2 > trafficSource1) {
                currentMBPSIn = datatwo.lastBPSIn/1000/1000;
                currentMBPSOut = datatwo.lastBPSOut/1000/1000;
                peakMBPSIn = datatwo.peakmbpsinlastday;
                peakMBPSOut = datatwo.peakmbpsoutlastday;
                peakDateIn = datatwo.peakindatelastday;
                peakDateOut = datatwo.peakoutdatelastday;
                division_snmp_sensor_id = datatwo.id;
                bpsIn = datatwo.lastBPSIn;
                bpsOut = datatwo.lastBPSOut;
            }

            if (division_snmp_is_reversed)
            {
                var temp = currentMBPSIn;
                currentMBPSIn = currentMBPSOut;
                currentMBPSOut = temp;

                temp = peakMBPSIn;
                peakMBPSIn = peakMBPSOut;
                peakMBPSOut = temp;

                temp = peakDateIn;
                peakDateIn = peakDateOut;
                peakDateOut = temp;

                temp = bpsIn;
                bpsIn = bpsOut;
                bpsOut = temp;
            }

            $('#division_current_in').html(Math.round(currentMBPSIn) + ' mbps');
            $('#division_current_out').html(Math.round(currentMBPSOut) + ' mbps');

            // Draw the guages
            var gauge_mbps_in = Math.round(currentMBPSIn);
            var gauge_mbps_out = Math.round(currentMBPSOut);


            if (gauge_mbps_out < 1)
            {
                gauge_mbps_out = "<1";
            }

            if (gauge_mbps_in < 1)
            {
                gauge_mbps_in = "<1";
            }

            drawBandwidthGauge(gauge_mbps_in, peakMBPSIn, division_max_throughput_mbps_in, "Inbound", gauge_mbps_out, peakMBPSOut, division_max_throughput_mbps_out, "Outbound", "bandwidth_meter_division");

            // Update graphs
            d = new Date();
            $('#graph_division_1').attr('src',strendinMonitorGraphRoot + '/SNMPThroughputSensorChart/' + division_snmp_sensor_id + '?showhourlines=true&showhourtext=true&style=line&width=300&height=70&hours=1&maxvalue=' + division_max_throughput_mbps_in + '&date=' + d.getTime());
            $('#graph_division_6').attr('src',strendinMonitorGraphRoot + '/SNMPThroughputSensorChart/' + division_snmp_sensor_id + '?showhourlines=true&showhourtext=true&style=line&width=300&height=70&hours=6&maxvalue=' + division_max_throughput_mbps_in + '&date=' + d.getTime());
            $('#graph_division_12').attr('src',strendinMonitorGraphRoot + '/SNMPThroughputSensorChart/' + division_snmp_sensor_id + '?showhourlines=true&showhourtext=true&style=line&width=300&height=70&hours=12&maxvalue=' + division_max_throughput_mbps_in + '&date=' + d.getTime());
            $('#graph_division_24').attr('src',strendinMonitorGraphRoot + '/SNMPThroughputSensorChart/' + division_snmp_sensor_id + '?showhourlines=true&showhourtext=true&style=line&width=300&height=70&hours=24&maxvalue=' + division_max_throughput_mbps_in + '&date=' + d.getTime());
            $('#graph_division_48').attr('src',strendinMonitorGraphRoot + '/SNMPThroughputSensorChart/' + division_snmp_sensor_id + '?showhourlines=true&showhourtext=true&style=line&width=300&height=70&hours=48&maxvalue=' + division_max_throughput_mbps_in + '&date=' + d.getTime());
        });
    });
}


/* ******************************************** */
/* * when the page loads                      * */
/* ******************************************** */

$(document).ready(function() {
    updateNames();
    //updateDivisionDataCounters_Month();
    //updateDivisionDataCounters_Day();
    updateDivisionCurrent();    
});



/* ******************************************** */
/* * Interval stuff                           * */
/* ******************************************** */

/*
       1000     1 second
      10000     10 seconds
      60000     1 minute
     300000     5 minutes
     600000     10 minutes
    1800000     30 mins
    3600000     1 hour
*/