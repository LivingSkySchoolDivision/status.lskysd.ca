function add_sensor_node_html(sensor_id, sensor_name, sensor_hostname, health, lastroundtrip, lastsuccess, lastfailure) {    
    var htmlcode = '';
    htmlcode += '<div id="sensor_inner_' + sensor_id + '" class="node">';
    htmlcode += '    <div class="graph_section">';
    htmlcode += '        <div class="graph_help_text">Last 24 hours:</div>';
    htmlcode += '        <img class="graph" src="' + strendinMonitorGraphRoot + '/Graphs/PingLatency.aspx?sensorid=' + sensor_id + '&height=60&width=600&showhourlines=true&showworkday=true&showhourtext=true&graphstyle=onoff">';
    htmlcode += '    </div>';
    htmlcode += '    <div class="node_title">' + sensor_name + '</div>';
    htmlcode += '    <div class="node_ip">' + sensor_hostname + '</div>';
    htmlcode += '    <div class="data_section"><div class="node_field_title">Current health: </div>' + health_to_html(health) + '</div>';
    htmlcode += '    <div class="data_section"><div class="node_field_title">Last success: </div><div class="node_field_data">' + lastsuccess + '</div></div>';
    htmlcode += '    <div class="data_section"><div class="node_field_title">Last failure: </div><div class="node_field_data">' + lastfailure + '</div></div>';
    htmlcode += '    <div class="data_section"><div class="node_field_title">Last roundtrip: </div><div class="node_field_data">' + lastroundtrip + 'ms</div></div>';
    htmlcode += '</div>';
    $("#sensor_" + sensor_id).html(htmlcode);
    console.log("Added node for " + sensor_name);
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
    var JSONPath = strendinMonitorJSONRoot + "/JSON/allSensors.aspx";

    console.log("Loading JSON: " + JSONPath);

    $.getJSON(JSONPath, function(data) {
        $.each(data.pinglatencysensors, function(sensorID, thisSensor) { 
            console.log("Got data for sensor " + thisSensor.id);
            if (
                (thisSensor.id == 35) || 
                (thisSensor.id == 36) || 
                (thisSensor.id == 37) || 
                (thisSensor.id == 38) || 
                (thisSensor.id == 39) || 
                (thisSensor.id == 40) || 
                (thisSensor.id == 41) || 
                (thisSensor.id == 42) || 
                (thisSensor.id == 43) || 
                (thisSensor.id == 44) || 
                (thisSensor.id == 45) || 
                (thisSensor.id == 46) || 
                (thisSensor.id == 47) || 
                (thisSensor.id == 48) || 
                (thisSensor.id == 49) || 
                (thisSensor.id == 50) || 
                (thisSensor.id == 51) || 
                (thisSensor.id == 52) || 
                (thisSensor.id == 80) || 
                (thisSensor.id == 53) || 
                (thisSensor.id == 54) || 
                (thisSensor.id == 55) || 
                (thisSensor.id == 56) || 
                (thisSensor.id == 57) 
                ) { 
                add_sensor_node_html(thisSensor.id, thisSensor.description, thisSensor.hostname, thisSensor.health, thisSensor.lastsuccessfulroundtrip, thisSensor.lastsuccess, thisSensor.lastfailure);
            }
        });
    });
        
});
