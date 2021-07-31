

function onoff_status_bar_init(containerdiv, sensorid) {
    var html = '';
    html += '<div id="sensor_inner_' + sensorid + '" class="node">';
    html += '    <div class="graph_section">';
    html += '        <div class="graph_help_text">Last 12 hours:</div>';
    html += '        <img class="graph" id="onoff_status_bar_' + sensorid + '-chart" src="" alt="Chart">';
    html += '    </div>';
    html += '    <div class="node_title" id="onoff_status_bar_' + sensorid + '-name"><div ><i>Loading...</i></div></div>';
    html += '    <div class="node_ip"><div id="onoff_status_bar_' + sensorid + '-address">---</div></div>';
    html += '    <div class="data_section"><div class="node_field_title">Current health: </div><div style="display: inline;" class="" id="onoff_status_bar_' + sensorid + '-health">---</div></div>';
    html += '    <div class="data_section"><div class="node_field_title">Last success: </div><div style="display: inline;" class="" id="onoff_status_bar_' + sensorid + '-lastsucc">---</div></div>';
    html += '    <div class="data_section"><div class="node_field_title">Last failure: </div><div style="display: inline;" class="" id="onoff_status_bar_' + sensorid + '-lastfail">---</div></div>';
    html += '    <div class="data_section"><div class="node_field_title">Last roundtrip: </div><div style="display: inline;" class="" id="onoff_status_bar_' + sensorid + '-lastresult">---</div></div>';
    html += '</div>';

    $('#' + containerdiv).append(html);
}


function onoff_status_bar_update(url) {
    $.getJSON(url, function (data) {
        $.each(data, function (allsensors, sensor) {
            if (sensor.isEnabled == true) {
                var divBase = "#onoff_status_bar_" + sensor.id;

                console.log(divBase);

                $(divBase + "-name").html(sensor.description);
                $(divBase + "-address").html(sensor.address);
                $(divBase + "-health").html(health_to_html(sensor.health));
                $(divBase + "-lastsucc").html(sensor.lastSuccess);
                $(divBase + "-lastfail").html(sensor.lastFailure);
                $(divBase + "-lastresult").html(sensor.lastRoundTrip + " ms");
                $(divBase + "-chart").attr("src","https://strendinmonitor.lskysd.ca/PingLatencyChart/" + sensor.id + "?style=onoff&height=85&width=600&showhourlines=true&hours=12");

                if (sensor.lastRoundTrip != -1) {
                    $(divBase + "-value").html(sensor.lastRoundTrip + " ms");
                    $(divBase + "-value-container").removeClass("hidden");
                } else {
                    $(divBase + "-value-container").addClass("hidden");
                    $(divBase + "-value").html("DOWN");
                }


            }
        });
    });
}


function health_to_html(health) {
    if (health == 100) {
        return "<div class='node_field_data health_online'>Online</div>";
    }

    if (health == 0) {
        return "<div class='node_field_data health_offline'>Offline</div>";
    }

    return "<div class='node_field_data health_recovering'>Queasy</div>";
}