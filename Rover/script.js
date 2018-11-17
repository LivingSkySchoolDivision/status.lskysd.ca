function add_sensor_node_html(sensor_id, sensor_name, sensor_hostname, health, lastroundtrip, lastsuccess, lastfailure) {

    var htmlcode = '';
    htmlcode += '<div id="sensor_inner_' + sensor_id + '" class="node">';
    htmlcode += '    <div class="graph_section">';
    htmlcode += '        <div class="graph_help_text">Last 24 hours:</div>';
    htmlcode += '        <img class="graph" src="/strendinmonitor/Graphs/PingLatency.aspx?sensorid=' + sensor_id + '&height=60&width=600&showhourlines=true&showworkday=true&showhourtext=true&graphstyle=onoff">';
    htmlcode += '    </div>';
    htmlcode += '    <div class="node_title">' + sensor_name + '</div>';
    htmlcode += '    <div class="node_ip">' + sensor_hostname + '</div>';
    htmlcode += '    <div class="data_section"><div class="node_field_title">Current health: </div>' + health_to_html(health) + '</div>';
    htmlcode += '    <div class="data_section"><div class="node_field_title">Last success: </div><div class="node_field_data">' + lastsuccess + '</div></div>';
    htmlcode += '    <div class="data_section"><div class="node_field_title">Last failure: </div><div class="node_field_data">' + lastfailure + '</div></div>';
    htmlcode += '    <div class="data_section"><div class="node_field_title">Last roundtrip: </div><div class="node_field_data">' + lastroundtrip + 'ms</div></div>';
    htmlcode += '</div>';

    $("#sensor_" + sensor_id).html(htmlcode);
}

function health_to_html(health) {
    if (health == 1) {
        return "<div class='node_field_data health_online'>Online</div>";
    }

    if (health == 0) {
        return "<div class='node_field_data health_offline'>Offline</div>";
    }

    return "<div class='node_field_data health_recovering'>Queasy</div>";
}

$(document).ready(function() {
    // Read the JSON and find just the IDs we care about, and populate their sections
    var JSONPath = "https://status.lskysd.ca/strendinmonitor/JSON/allSensors.aspx";

    $.getJSON(JSONPath, function(data) {
        $.each(data.pinglatencysensors, function(sensorID, thisSensor) { 
            console.log("Got data for sensor " + thisSensor.id);
            if (
                (thisSensor.id == 60) || 
                (thisSensor.id == 61) || 
                (thisSensor.id == 62) || 
                (thisSensor.id == 63) || 
                (thisSensor.id == 64) || 
                (thisSensor.id == 65) || 
                (thisSensor.id == 66) || 
                (thisSensor.id == 67) ||                 
                (thisSensor.id == 69) || 
                (thisSensor.id == 70) || 
                (thisSensor.id == 71) || 
                (thisSensor.id == 72) || 
                (thisSensor.id == 73) || 
                (thisSensor.id == 74) || 
                (thisSensor.id == 75) || 
                (thisSensor.id == 76) || 
                (thisSensor.id == 79) || 
                (thisSensor.id == 77)
                ) { 
                add_sensor_node_html(thisSensor.id, thisSensor.description, thisSensor.hostname, thisSensor.health, thisSensor.lastsuccessfulroundtrip, thisSensor.lastsuccess, thisSensor.lastfailure);
            }
        });
    });
        
});
