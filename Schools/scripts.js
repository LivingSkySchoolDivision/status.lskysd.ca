
var division_max_throughput_mbps_in = 1000;
var division_max_throughput_mbps_out = 1000;
var division_internet_json_path_1 = "/StrendinMonitor/JSON/bySNMPThroughputSensor.aspx?sensorid=1"
var division_internet_json_path_2 = "/StrendinMonitor/JSON/bySNMPThroughputSensor.aspx?sensorid=2"
var division_snmp_is_reversed = true;

function degreesToRadiansRotated(degrees) {
    return (((degrees - 90) * Math.PI)/180);
}

function degreesToRadians(degrees) {
    return (((degrees) * Math.PI)/180);
}

function drawTicketsPieChart(opened, closed, canvasid) {
    canvas = document.getElementById(canvasid);
    context = canvas.getContext('2d');

    canvas.width = 300;
    canvas.height = 250;

    var totalTickets = opened + closed;
    var percentOpen = opened / totalTickets;

    var openArcSize = 360 * percentOpen;

    var color_open = "#6CA870"; /* 6CA870 */
    var color_closed = "#2966B8"; /* 2966B8 */
    var borderColor = "rgba(0,0,0,0)";
    var textColor = "rgba(0,0,0,1)";

    var centerX = (canvas.width / 2) + 0.5;
    var centerY = (canvas.height / 2) + 0.5;
    var chartRadius = (canvas.height / 2) * 0.95;

    context.lineWidth = 2;

    context.strokeStyle =  borderColor;

    /* Draw a background, in case the pie chart doesn't exist because the counts are zero */
    context.fillStyle = "rgba(255,255,255,0.25)";
    context.beginPath();
    context.arc(centerX, centerY, chartRadius, 0, 2 * Math.PI, false);context.textBaseline = "top";
    context.textAlign = "center";
    context.font = "bold 72pt Arial";
    context.fillText("?",centerX, centerY - 40);
    context.closePath();
    context.fill();

    /* Sorry, this is a bit hackie but I'm in a bad mood, and you're stuck with it */
    if ((closed > 0) && (opened == 0)) {
        /* This will draw a circle if either value is 1 and the other is zero */
        context.fillStyle = color_closed;
        context.beginPath();
        context.arc(centerX, centerY, chartRadius, 0, 2 * Math.PI, false);context.textBaseline = "top";
        context.closePath();
        context.fill();
    }

    if ((closed == 0) && (opened > 0)) {
        /* This will draw a circle if either value is 1 and the other is zero */
        context.fillStyle = color_open;
        context.beginPath();
        context.arc(centerX, centerY, chartRadius, 0, 2 * Math.PI, false);context.textBaseline = "top";
        context.closePath();
        context.fill();
    }

    /* Draw the pie slices */
    if ((closed > 0) && (opened > 0)) {
        var startArc = degreesToRadians(0 - (openArcSize / 2));
        var endArc = degreesToRadians(openArcSize / 2);

        context.fillStyle = color_open;
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX,centerY, chartRadius, startArc, endArc, false);
        context.closePath();
        context.fill();
        context.stroke();

        context.strokeStyle = borderColor;
        context.fillStyle = color_closed;
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX,centerY, chartRadius, endArc, startArc, false);
        context.closePath();
        context.fill();
        context.stroke();
    }

    /* Draw Legend */
    context.lineWidth = 1;
    context.beginPath();

    context.textBaseline = "top";
    context.textAlign = "center";
    context.font = "bold 12pt Arial";

    context.fillStyle = color_closed;
    context.strokeStyle = "#000";
    context.fillRect(5 + 0.5, canvas.height - 23 + 0.5, 80, 20);
    context.strokeRect(5 + 0.5, canvas.height - 23 + 0.5, 80, 20);
    context.fillStyle = textColor;

    context.fillText("Closed",45 + 0.5,canvas.height - 20 + 0.5);

    context.fillStyle = color_open;
    context.fillRect(canvas.width - 85 + 0.5, canvas.height - 23 + 0.5, 80, 20);
    context.strokeRect(canvas.width - 85 + 0.5, canvas.height - 23 + 0.5, 80, 20);
    context.fillStyle = textColor;
    context.fillText("Created",canvas.width - 42 - 0.5, canvas.height - 20 + 0.5);

    /* Boxes for numbers */
    context.fillStyle = "rgba(255,255,255,0.5)";
    context.fillRect(5 + 0.5, canvas.height - 70 + 0.5, 80, 40);
    context.strokeRect(5 + 0.5, canvas.height - 70 + 0.5, 80, 40);
    context.fillRect(canvas.width - 85 + 0.5, canvas.height - 70 + 0.5, 80, 40);
    context.strokeRect(canvas.width - 85 + 0.5, canvas.height - 70 + 0.5, 80, 40);

    context.textAlign = "center";
    context.font = "bold 16pt Arial";
    context.fillStyle = "rgba(0,0,0,1)";
    context.fillText(closed,5.5 + 40, canvas.height - 60);
    context.fillText(opened,canvas.width - 85 + 0.5 + 40, canvas.height - 60);

    context.fill();
    context.stroke();
}

function drawLargeGauge(value, peak, maxvalue, label, canvasid)
{
    // bar size = 240 (for this example)
    // 50 value -> 50% -> filledBarInDegrees was 120

    canvas = document.getElementById(canvasid);
    context = canvas.getContext('2d');

    var chartRadius = (canvas.height / 2) * 0.9;

    var originX = chartRadius;
    var originY = chartRadius;

    var barSize = 118; /* number of degrees in the bar will be this time 2 */
    var barThickness = 25;

    var percentFilled = value / maxvalue;
    if (percentFilled > 1) {
        percentFilled = 1;
    }

    var filledBarInDegrees = (barSize * 2) * percentFilled;
    //alert(filledBarInDegrees);

    var color_background = "rgba(0,75,0,0.3)"; /* 6CA870 */
    var color_fill = "rgba(0,75,0, 1)"; /* 2966B8 */
    var color_peak = "rgba(0, 75, 0, 0.3)";
    var color_maxed = "rgba(255, 0, 0, 0.8)";

    /* Draw the background */
    var emptyBarStartDegrees = 360-barSize; // 360 represents the very top
    var emptyBarEndDegrees = barSize;
    var emptyBarStartRadians = degreesToRadiansRotated(emptyBarStartDegrees);
    var emptyBarEndRadians = degreesToRadiansRotated(emptyBarEndDegrees);

    context.fillStyle = color_background;
    context.beginPath();
    context.arc(originX, originY, chartRadius,emptyBarStartRadians, emptyBarEndRadians, false);
    context.arc(originX, originY, chartRadius - barThickness, emptyBarEndRadians, emptyBarStartRadians, true);
    context.closePath();
    context.fill();

    /* Draw the filled area */
    var filledBarStartDegrees = 360-barSize;
    var filledBarEndDegrees = 360-barSize + filledBarInDegrees;
    var filledBarStartRadians = degreesToRadiansRotated(filledBarStartDegrees);
    var filledBarEndRadians = degreesToRadiansRotated(filledBarEndDegrees);

    context.fillStyle = color_fill;
    if (value >= maxvalue)
    {
        context.fillStyle = color_maxed;
    }

    context.beginPath();
    context.arc(originX, originY, chartRadius, filledBarStartRadians, filledBarEndRadians, false);
    context.arc(originX, originY, chartRadius - barThickness, filledBarEndRadians, filledBarStartRadians, true);
    context.closePath();
    context.fill();

    // Style 2: A full bar, underneath the existing bar
    var peakBarThickness = 3;
    var peakBarStartDegrees = (360 - barSize);
    var peakPercent = (peak / maxvalue);
    if (peakPercent > 1) { peakPercent = 1;}
    var peakBarEndDegrees = (360 - barSize) + ((barSize*2) * peakPercent);
    var peakBarStartRadians = degreesToRadiansRotated(peakBarStartDegrees);
    var peakBarEndRadians = degreesToRadiansRotated(peakBarEndDegrees);
    var peakBarHeight = 5;

    context.fillStyle = color_peak;
    context.beginPath();
    context.arc(originX, originY, chartRadius - barThickness - 2, peakBarStartRadians, peakBarEndRadians, false);
    context.arc(originX, originY, chartRadius - barThickness - peakBarHeight - 2, peakBarEndRadians, peakBarStartRadians , true);
    context.closePath();
    context.fill();

    /* Draw the text value */
    context.beginPath();
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.font = "bold 72pt 'Arial'";
    context.fillStyle = color_fill;
    context.fillText(value,originX, originY);
    context.closePath();
    context.fill();

    context.beginPath();
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.font = "bold 28pt 'Arial'";
    context.fillStyle = color_fill;
    context.fillText("mbps",originX, originY + 55);
    context.closePath();
    context.fill();

    context.beginPath();
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.font = "bold 12pt 'Arial'";
    context.fillStyle = color_fill;
    context.fillText(label,originX, originY + 85);
    context.closePath();
    context.fill();
}

function drawSmallGauge(value, peak, maxvalue, label, canvasid)
{
    canvas = document.getElementById(canvasid);
    context = canvas.getContext('2d');

    var chartRadius = (canvas.height / 2) * 0.34;

    var originX = canvas.width - chartRadius;
    var originY = canvas.height - chartRadius;

    var barSize = 120; /* number of degrees in the bar will be this * 2 */
    var barThickness = 10;

    var percentFilled = value / maxvalue;
    if (percentFilled > 1) {
        percentFilled = 1;
    }

    var openArcSize = (barSize * 2) * percentFilled;

    var color_background = "rgba(0,75,0,0.3)"; /* 6CA870 */
    var color_fill = "rgba(0,75,0, 1)"; /* 2966B8 */
    var color_peak = "rgba(0, 75, 0, 0.3)";
    var color_maxed = "rgba(255, 0, 0, 0.8)";

    /* Draw the background */
    context.fillStyle = color_background;
    context.beginPath();
    context.arc(originX, originY, chartRadius, degreesToRadiansRotated(360-barSize), degreesToRadiansRotated(barSize), false);
    context.arc(originX, originY, chartRadius - barThickness, degreesToRadiansRotated(barSize), degreesToRadiansRotated(360 - barSize), true);
    context.closePath();
    context.fill();

    /* Draw the filled area */
    context.fillStyle = color_fill;
    if (value >= maxvalue)
    {
        context.fillStyle = color_maxed;
    }
    context.beginPath();
    context.arc(originX, originY, chartRadius, degreesToRadiansRotated(360-barSize), degreesToRadiansRotated(360-barSize + openArcSize), false);
    context.arc(originX, originY, chartRadius - barThickness, degreesToRadiansRotated(360-barSize + openArcSize), degreesToRadiansRotated(360 - barSize), true);
    context.closePath();
    context.fill();

    var peakBarThickness = 3;
    var peakBarStartDegrees = (360 - barSize);
    var peakPercent = (peak / maxvalue);
    if (peakPercent > 1) { peakPercent = 1;}
    var peakBarEndDegrees = (360 - barSize) + ((barSize*2) * peakPercent);
    var peakBarStartRadians = degreesToRadiansRotated(peakBarStartDegrees);
    var peakBarEndRadians = degreesToRadiansRotated(peakBarEndDegrees);
    var peakBarHeight = 3;

    context.fillStyle = color_peak;
    context.beginPath();
    context.arc(originX, originY, chartRadius - barThickness - 1, peakBarStartRadians, peakBarEndRadians, false);
    context.arc(originX, originY, chartRadius - barThickness - peakBarHeight - 1, peakBarEndRadians, peakBarStartRadians , true);
    context.closePath();
    context.fill();

    /* Draw the text value */
    context.beginPath();
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.font = "bold 32pt 'Arial'";
    context.fillStyle = color_fill;
    context.fillText(value,originX, originY);
    context.closePath();
    context.fill();

    context.beginPath();
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.font = "bold 12pt 'Arial'";
    context.fillStyle = color_fill;
    context.fillText("mbps",originX, originY + 25);
    context.closePath();
    context.fill();

    context.beginPath();
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.font = "bold 8pt 'Arial'";
    context.fillStyle = color_fill;
    context.fillText(label,originX, originY + 40);
    context.closePath();
    context.fill();

}

function drawBandwidthGauge(value_large, peak_large, maxvalue_large, label_large, value_small, peak_small, maxvalue_small, label_small, canvasid) {
    canvas = document.getElementById(canvasid);
    context = canvas.getContext('2d');

    canvas.width = 300;
    canvas.height = 275;

    // Clear the canvas
    // I think setting the width and height ends up clearing the canvas

    // Draw the "Main" gauge
    drawLargeGauge(value_large, peak_large, maxvalue_large, label_large, canvasid);

    // Draw the "Small" gauge
    drawSmallGauge(value_small, peak_small, maxvalue_small, label_small, canvasid);
}

/* ******************************************** */
/* * Functions and things you shouldn't edit  * */
/* ******************************************** */

function updateNames() {
    $('#school_name_title').html(school_name);
    $('#school_name_2').html(school_name);
    $('#division_max_in').html(division_max_throughput_mbps_in + ' mbps');
    $('#division_max_out').html(division_max_throughput_mbps_out + ' mbps');
    $('#school_max_in').html(school_maxmbps_in + ' mbps');
    $('#school_max_out').html(school_maxmbps_out + ' mbps');
}


function updateDivisionDataCounters_Month() {
    // Collect data from both sources
    var inTraffic = 0;
    var outTraffic = 0;

    // Add data together
    var inTrafficSource1 = 0;
    var inTrafficSource2 = 0;
    var outTrafficSource1 = 0;
    var outTrafficSource2 = 0;

    $.getJSON(division_internet_json_path_1, function(data) {
        inTrafficSource1 = parseFloat(data.mbinthismonth);
        outTrafficSource1 = parseFloat(data.mboutthismonth);

        $.getJSON(division_internet_json_path_2, function(data) {
            inTrafficSource2 = parseFloat(data.mbinthismonth);
            outTrafficSource2 = parseFloat(data.mboutthismonth);
        });

        inTraffic = inTrafficSource1 + inTrafficSource2;
        outTraffic = outTrafficSource1 + outTrafficSource2;

        inTrafficString = '';
        outTrafficString = '';

        if (inTraffic > 1024) {
            inTrafficString = (Math.round((inTraffic / 1024) * 1000) / 1000) + ' GB';
        } else {
            inTrafficString = inTraffic + ' MB';
        }

        if (outTraffic > 1024) {
            outTrafficString = (Math.round((outTraffic / 1024) * 1000) / 1000) + ' GB';
        } else {
            outTrafficString = outTraffic + ' MB';
        }

        // Check if we have to swap the data
        if (division_snmp_is_reversed)
        {
            var temp = inTrafficString;
            inTrafficString = outTrafficString;
            outTrafficString = temp;
        }

        $('#division_data_month_in').html(inTrafficString);
        $('#division_data_month_out').html(outTrafficString);
    });
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
        var trafficSource1 = parseFloat(data.lastbpsin) + parseFloat(data.lastbpsout);

        currentMBPSIn = data.lastmbpsin;
        currentMBPSOut = data.lastmbpsout;
        peakMBPSIn = data.peakmbpsinlastday;
        peakMBPSOut = data.peakmbpsoutlastday;
        division_snmp_sensor_id = data.id;
        peakDateIn = data.peakindatelastday;
        peakDateOut = data.peakoutdatelastday;
        bpsIn = data.lastbpsin;
        bpsOut = data.lastbpsout;

        $.getJSON(division_internet_json_path_2, function(datatwo) {
            var trafficSource2 = parseFloat(datatwo.lastbpsin) + parseFloat(datatwo.lastbpsin);
            
            if (trafficSource2 > trafficSource1) {
                currentMBPSIn = datatwo.lastmbpsin;
                currentMBPSOut = datatwo.lastmbpsout;
                peakMBPSIn = datatwo.peakmbpsinlastday;
                peakMBPSOut = datatwo.peakmbpsoutlastday;
                peakDateIn = datatwo.peakindatelastday;
                peakDateOut = datatwo.peakoutdatelastday;
                division_snmp_sensor_id = datatwo.id;
                bpsIn = datatwo.lastbpsin;
                bpsOut = datatwo.lastbpsout;
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

            $('#division_current_in').html(currentMBPSIn + ' mbps');
            $('#division_current_out').html(currentMBPSOut + ' mbps');
            $('#division_peak_in').html(peakMBPSIn + ' mbps');
            $('#division_peak_out').html(peakMBPSOut + ' mbps');

            // Peak dates
            $('#division_peak_date_in').html(peakDateIn);
            $('#division_peak_date_out').html(peakDateOut);

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
            $('#graph_division_1').attr('src','/strendinmonitor/graphs/SNMPThroughput.aspx?sensorid=' + division_snmp_sensor_id + '&showhours=true&&graphstyle=line&width=300&height=70&hours=1&maxvalue=' + division_max_throughput_mbps_in + '&date=' + d.getTime());
            $('#graph_division_6').attr('src','/strendinmonitor/graphs/SNMPThroughput.aspx?sensorid=' + division_snmp_sensor_id + '&showhours=true&&graphstyle=line&width=300&height=70&hours=6&maxvalue=' + division_max_throughput_mbps_in + '&date=' + d.getTime());
            $('#graph_division_12').attr('src','/strendinmonitor/graphs/SNMPThroughput.aspx?sensorid=' + division_snmp_sensor_id + '&showhours=true&&graphstyle=line&width=300&height=70&hours=12&maxvalue=' + division_max_throughput_mbps_in + '&date=' + d.getTime());
            $('#graph_division_24').attr('src','/strendinmonitor/graphs/SNMPThroughput.aspx?sensorid=' + division_snmp_sensor_id + '&showhours=true&&graphstyle=line&width=300&height=70&hours=24&maxvalue=' + division_max_throughput_mbps_in + '&date=' + d.getTime());
            $('#graph_division_48').attr('src','/strendinmonitor/graphs/SNMPThroughput.aspx?sensorid=' + division_snmp_sensor_id + '&showhours=true&&graphstyle=line&width=300&height=70&hours=48&maxvalue=' + division_max_throughput_mbps_in + '&date=' + d.getTime());
        });
    });
}

function updateDivisionDataCounters_Day() {
    // Collect data from both sources
    var inTraffic = 0;
    var outTraffic = 0;

    // Add data together
    var inTrafficSource1 = 0;
    var inTrafficSource2 = 0;
    var outTrafficSource1 = 0;
    var outTrafficSource2 = 0;

    $.getJSON(division_internet_json_path_1, function(data) {
        inTrafficSource1 = parseFloat(data.mbinlastday);
        outTrafficSource1 = parseFloat(data.mboutlastday);

        $.getJSON(division_internet_json_path_2, function(data) {
            inTrafficSource2 = parseFloat(data.mbinlastday);
            outTrafficSource2 = parseFloat(data.mboutlastday);
        });

        inTraffic = inTrafficSource1 + inTrafficSource2;
        outTraffic = outTrafficSource1 + outTrafficSource2;

        inTrafficString = '';
        outTrafficString = '';

        if (inTraffic > 1024) {
            inTrafficString = (Math.round((inTraffic / 1024) * 1000) / 1000) + ' GB';
        } else {
            inTrafficString = inTraffic + ' MB';
        }

        if (outTraffic > 1024) {
            outTrafficString = (Math.round((outTraffic / 1024) * 1000) / 1000) + ' GB';
        } else {
            outTrafficString = outTraffic + ' MB';
        }

        // Check if we have to swap the data
        if (division_snmp_is_reversed)
        {
            var temp = inTrafficString;
            inTrafficString = outTrafficString;
            outTrafficString = temp;
        }

        $('#division_data_today_in').html(inTrafficString);
        $('#division_data_today_out').html(outTrafficString);
    });
}

function updateSchoolSNMP() {
    $.getJSON(school_snmp_json_path, function(data) {

        var lastmbpsin = data.lastmbpsin;
        var peakmbpsinlastday = data.peakmbpsinlastday;
        var mbintoday = data.mbintoday;
        var mbinthismonth = data.mbinthismonth;
        var peakintoday = data.peakindatelastday;

        var lastmbpsout = data.lastmbpsout;
        var peakmbpsoutlastday = data.peakmbpsoutlastday;
        var mbouttoday = data.mbouttoday;
        var mboutthismonth = data.mboutthismonth;
        var peakouttoday = data.peakoutdatelastday;

        // Swap values if we have to
        if (school_snmp_is_reversed) {
            var temp = lastmbpsin;
            lastmbpsin = lastmbpsout;
            lastmbpsout = temp;

            temp = peakmbpsinlastday;
            peakmbpsinlastday = peakmbpsoutlastday;
            peakmbpsoutlastday = temp;

            temp = mbintoday;
            mbintoday = mbouttoday;
            mbouttoday = temp;

            temp = mbinthismonth;
            mbinthismonth = mboutthismonth;
            mboutthismonth = temp;

            temp = peakintoday;
            peakintoday = peakouttoday;
            peakouttoday = temp;
        }

        // Current
        $('#school_current_in').html(lastmbpsin + ' mbps');
        $('#school_current_out').html(lastmbpsout + ' mbps');

        // Peak
        $('#school_peak_in').html(peakmbpsinlastday + ' mbps');
        $('#school_peak_out').html(peakmbpsoutlastday + ' mbps');

        // peak dates
        $('#school_peak_date_in').html(peakintoday);
        $('#school_peak_date_out').html(peakouttoday);

        var inTrafficString = '';
        var outTrafficString = '';

        if (mbintoday > 1024) {
            inTrafficString = (Math.round((mbintoday / 1024) * 1000) / 1000) + ' GB';
        } else {
            inTrafficString = mbintoday + ' MB';
        }

        if (mbouttoday > 1024) {
            outTrafficString = (Math.round((mbouttoday / 1024) * 1000) / 1000) + ' GB';
        } else {
            outTrafficString = mbouttoday + ' MB';
        }

        // Data transferred today
        $('#school_data_today_in').html(inTrafficString);
        $('#school_data_today_out').html(outTrafficString);

        // Data transferred this month
        $('#school_data_month_in').html(Math.round(parseFloat(mbinthismonth)) + ' MB');
        $('#school_data_month_out').html(Math.round(parseFloat(mboutthismonth)) + ' MB');

        // Highlight when close to max

        if ((lastmbpsin / school_maxmbps_in) >= 0.85) {
            $('#school_current_in').removeClass("health_unknown");
            $('#school_current_in').addClass("health_warning");
        } else {
            $('#school_current_in').removeClass("health_warning");
            $('#school_current_in').addClass("health_unknown");
        }

        if ((lastmbpsout / school_maxmbps_out) >= 0.85) {
            $('#school_current_out').removeClass("health_unknown");
            $('#school_current_out').addClass("health_warning");
        } else {
            $('#school_current_out').removeClass("health_warning");
            $('#school_current_out').addClass("health_unknown");
        }


        // Graph
        // Draw the guages
        var gauge_mbps_in = Math.round(lastmbpsin * 10) / 10;
        var gauge_mbps_out = Math.round(lastmbpsout * 10) / 10;

        if (gauge_mbps_out < 1)
        {
            gauge_mbps_out = "<1";
        }

        if (gauge_mbps_in < 1)
        {
            gauge_mbps_in = "<1";
        }

        drawBandwidthGauge(gauge_mbps_in, peakmbpsinlastday, school_maxmbps_in, "Inbound", gauge_mbps_out, peakmbpsoutlastday, school_maxmbps_out, "Outbound", "bandwidth_meter_school");

        // Update graphs
        d = new Date();
        $('#graph_school_1').attr('src','/strendinmonitor/graphs/SNMPThroughput.aspx?sensorid=' + data.id + '&showhours=true&graphstyle=line&width=300&height=70&hours=1&maxvalue=' + school_maxmbps_in + '&date=' + d.getTime());
        $('#graph_school_6').attr('src','/strendinmonitor/graphs/SNMPThroughput.aspx?sensorid=' + data.id + '&showhours=true&&graphstyle=line&width=300&height=70&hours=6&maxvalue=' + school_maxmbps_in + '&date=' + d.getTime());
        $('#graph_school_12').attr('src','/strendinmonitor/graphs/SNMPThroughput.aspx?sensorid=' + data.id + '&showhours=true&&graphstyle=line&width=300&height=70&hours=12&maxvalue=' + school_maxmbps_in + '&date=' + d.getTime());
        $('#graph_school_24').attr('src','/strendinmonitor/graphs/SNMPThroughput.aspx?sensorid=' + data.id + '&showhours=true&&graphstyle=line&width=300&height=70&hours=24&maxvalue=' + school_maxmbps_in + '&date=' + d.getTime());


    });
}

function updateSchoolPing() {

    $.getJSON(school_ping_json_path, function(data) {
        var health_rating = parseFloat(data.health) * 100;

        var healthString = health_rating + '%';
        // health offline & warning
        if (data.health == 0) {
            $('#ping_health').addClass("health_offline");

        $('#ping_health').html(health_rating + '%');
        } else {
            $('#ping_health').removeClass("health_offline");
        }

        if ((data.health < 1) && (data.health > 0)) {
            $('#ping_health').addClass("health_warning");
        } else {
            $('#ping_health').removeClass("health_warning");
        }

        if(data.health == 1) {
            $('#ping_health').addClass("health_healthy");
        } else {
            $('#ping_health').removeClass("health_healthy");
        }


        $('#ping_health').html(healthString);

        $('#ping_last_roundtrip').html(data.lastsuccessfulroundtrip + ' ms');
        $('#past_last_success_date').html(data.lastsuccess);
        $('#ping_last_failure_date').html(data.lastfailure);
        $('#ping_avg_24hrs').html(Math.round(data.averagelastday) + ' ms');
        $('#ping_avg_30days').html(Math.round(data.averagelastmonth) + ' ms');


        // Update graphs
        d = new Date();
        $('#graph_ping_1').attr('src','/strendinmonitor/graphs/PingLatency.aspx?sensorid=' + data.id + '&graphstyle=bar&width=300&height=70&hours=1&&date=' + d.getTime());
        $('#graph_ping_6').attr('src','/strendinmonitor/graphs/PingLatency.aspx?sensorid=' + data.id + '&graphstyle=bar&width=300&height=70&hours=6&date=' + d.getTime());
        $('#graph_ping_12').attr('src','/strendinmonitor/graphs/PingLatency.aspx?sensorid=' + data.id + '&graphstyle=bar&width=300&height=70&hours=12&date=' + d.getTime());
        $('#graph_ping_24').attr('src','/strendinmonitor/graphs/PingLatency.aspx?sensorid=' + data.id + '&graphstyle=bar&width=300&height=70&hours=24&date=' + d.getTime());

    });
}


/* ******************************************** */
/* * when the page loads                      * */
/* ******************************************** */

$(document).ready(function() {
    updateNames();
    updateSchoolSNMP();
    updateSchoolPing();
    updateDivisionDataCounters_Month();
    updateDivisionDataCounters_Day();
    updateDivisionCurrent();
    //$('#section_school_snmp').slideUp("slow", function() {});


    /* ******************************************** */
    /* * Event Handlers                           * */
    /* ******************************************** */
    /*
    $( "#section_school_snmp_link" ).click(function() {
        if ( $( "#section_school_snmp" ).is( ":hidden" ) ) {
            $( "#section_school_snmp" ).slideDown( "slow" );
            $( "#section_school_snmp_link" ).html("Click to hide section");
        } else {
            $( "#section_school_snmp" ).slideUp();
            $( "#section_school_snmp_link" ).html("Click to expand section");
        }
    });

    $( "#section_division_snmp_link" ).click(function() {
        if ( $( "#section_division_snmp" ).is( ":hidden" ) ) {
            $( "#section_division_snmp" ).slideDown( "slow" );
            $( "#section_division_snmp_link" ).html("Click to hide section");
        } else {
            $( "#section_division_snmp" ).slideUp();
            $( "#section_division_snmp_link" ).html("Click to expand section");
        }
    });

    $( "#section_school_ping_link" ).click(function() {
        if ( $( "#section_school_ping" ).is( ":hidden" ) ) {
            $( "#section_school_ping" ).slideDown( "slow" );
            $( "#section_school_ping_link" ).html("Click to hide section");
        } else {
            $( "#section_school_ping" ).slideUp();
            $( "#section_school_ping_link" ).html("Click to expand section");
        }
    });
    */
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

// Reload the whole page every 5 minutes
setInterval(function() {
    updateNames();
    updateSchoolSNMP();
    updateSchoolPing();
    updateDivisionDataCounters_Month();
    updateDivisionDataCounters_Day();
    updateDivisionCurrent();
 }, 60000);  // Reload the page every hour ish (not exactly an hour, so its different throughout the day)
