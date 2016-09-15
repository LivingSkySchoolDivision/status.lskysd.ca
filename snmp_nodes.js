function add_snmp_sensor_node(sidebar, idnum, title, health, inbits, outbits, megainbits, megaoutbits, notes, rev, connectionLimitIn, connectionLimitOut, trafficPeakIn, trafficPeakOut) {
    // Create a node, then update it
    var htmlcode = '';
    htmlcode += '';
    htmlcode += '<div class="sensor_node" id="SNMP_NODE_' + idnum + '">';
    htmlcode += '<div class="sensor_node_title" id="SNMP_NODE_' + idnum + '_title"></div>';
    htmlcode += '<table border=0 cellpadding=0 cellspacing=2 class="sensor_node_table">';
    htmlcode += '<tr id="SNMP_NODE_SNMPDATA_' + idnum + '">';
    htmlcode += '<td class="sensor_node_info" width="50">in</td>';
    //htmlcode += '<td class="sensor_node_data" width="112"><div style="display: inline" id="SNMP_NODE_' + idnum + '_inbits"></div></td>';
    htmlcode += '<td class="sensor_node_data" width="112" id="SNMP_NODE_' + idnum + '_inbits"></td>';
    htmlcode += '<td class="sensor_node_info" width="50">out</td>';
    //htmlcode += '<td class="sensor_node_data" width="112"><div style="display: inline" id="SNMP_NODE_' + idnum + '_outbits"></div></td>';
    htmlcode += '<td class="sensor_node_data" width="112" id="SNMP_NODE_' + idnum + '_outbits"></td>';
    htmlcode += '</tr>';
    htmlcode += '<tr id="SNMP_NODE_ERRORDATA_' + idnum + '" class="hidden">';    
    htmlcode += '<td colspan="4" class="sensor_node_data" width="112"><div style="display: inline; text-align: center;" id="SNMP_NODE_' + idnum + '_error"></div></td>';
    htmlcode += '</tr>';
    htmlcode += '</table>';
    htmlcode += '</div>';
    $(sidebar).append(htmlcode);
    update_snmp_sensor_node(sidebar, idnum, title, health, inbits, outbits, megainbits, megaoutbits, notes, rev, connectionLimitIn, connectionLimitOut, trafficPeakIn, trafficPeakOut);
                    
}

function update_snmp_sensor_node(sidebar, id, title, health, inbits, outbits, megain, megaout, err, rev, connectionLimitIn, connectionLimitOut, trafficPeakIn, trafficPeakOut) {

    if (doesElementExist('SNMP_NODE_' + id) == true) {        
        //$('#weather_temp').addClass("weather_alert");
        //$('#SNMP_NODE_' + id)

        var displayTitle = title;

        if ((trafficPeakIn > connectionLimitIn) || (trafficPeakOut > connectionLimitOut)) {
            displayTitle += ' <small style="font-size: 6pt; color: rgba(255,255,255,0.2);">M</small>';
        }

        if (rev == true) {
            displayTitle += ' <small style="font-size: 6pt; color: rgba(255,255,255,0.2);">R</small>';
        }

        
        var displayStringIn = "";    
        var displayStringOut = "";        
        var isError = false;

        // Color the node if it is offline
        
        /*
        if ((inbits == -1) || (outbits == -1)) {            
            //$('#SNMP_NODE_' + id).addClass("offline_node");
            isError = true;
        } else {
            //$('#SNMP_NODE_' + id).removeClass("offline_node");
            isError = false;
        }
        */

        if (health < 1) {
            if (health == 0) {
                $('#SNMP_NODE_' + id).addClass("offline_node");
                isError = true;
            } else {
                $('#SNMP_NODE_' + id).addClass("warning_node");
            }
        } else {
            $('#SNMP_NODE_' + id).removeClass("offline_node");
            $('#SNMP_NODE_' + id).removeClass("warning_node");
        }


        // Color the node for maintenance if required
        if ((inbits == -2) || (outbits == -2)) {            
            $('#SNMP_NODE_' + id).addClass("maintenance_node");
        } else {
            $('#SNMP_NODE_' + id).removeClass("maintenance_node");
        }

        // Color the node if both connections are idle
        if ((megaout == 0) && (megain == 0))
        {
            $('#SNMP_NODE_' + id).addClass("idle_node");
        } else {
            $('#SNMP_NODE_' + id).removeClass("idle_node");
        }

        // Color the data fields if connections are >= peak
        if (megain >= (connectionLimitIn * 0.9))
        {
            if (rev == true)
            {
                $('#SNMP_NODE_' + id + '_outbits').addClass("data_peak");           
            } else {
                $('#SNMP_NODE_' + id + '_inbits').addClass("data_peak");           
            }
            
        } else {            
            if (rev == true)
            {
                $('#SNMP_NODE_' + id + '_outbits').removeClass("data_peak");           
            } else {
                $('#SNMP_NODE_' + id + '_inbits').removeClass("data_peak");           
            }
        }

        if (megaout >= (connectionLimitOut * 0.9))
        {
            if (rev == true)
            {
                $('#SNMP_NODE_' + id + '_inbits').addClass("data_peak");           
            } else {
                $('#SNMP_NODE_' + id + '_outbits').addClass("data_peak");
            }            
        } else {
            if (rev == true)
            {
                $('#SNMP_NODE_' + id + '_inbits').removeClass("data_peak");           
            } else {
                $('#SNMP_NODE_' + id + '_outbits').removeClass("data_peak");           
                
            }            
        }

        displayStringOut = parseFloat(megaout).toFixed(2) + ' mbps';
        displayStringIn = parseFloat(megain).toFixed(2) + ' mbps';

        if (megain == 0) {
            displayStringIn = "< 0.01 mbps";
        } 

        if (megaout == 0) {
            displayStringOut = "< 0.01 mbps";
        } 

        if (inbits == 0) {
            displayStringIn = '<div style="text-align: center">idle</div>';
        }

        if (outbits == 0) {
            displayStringOut = '<div style="text-align: center">idle</div>';
        }
        

        if (rev == true) {
            var temp = displayStringIn;
            displayStringIn = displayStringOut;
            displayStringOut = temp;
        } 

        if (isError) {
            $('#SNMP_NODE_SNMPDATA_' + id).addClass("hidden");
            $('#SNMP_NODE_ERRORDATA_' + id).removeClass("hidden");
        } else {
            $('#SNMP_NODE_ERRORDATA_' + id).addClass("hidden");
            $('#SNMP_NODE_SNMPDATA_' + id).removeClass("hidden");
        }

        $('#SNMP_NODE_' + id + '_inbits').html(displayStringIn);
        $('#SNMP_NODE_' + id + '_outbits').html(displayStringOut); 
        $('#SNMP_NODE_' + id + '_title').html(displayTitle);
        $('#SNMP_NODE_' + id + '_error').html('<div style="text-align: center">' + err + '</div>'); 
        $('#SNMP_NODE_' + id + '').css("background-image", "url(/StrendinMonitor/Graphs/SNMPThroughput.aspx?sensorid=" + id + "&height=40&width=340&hours=6&semitrans=true&graphstyle=line)");
        //$('#SNMP_NODE_' + id + '_inbits').css("background-image", "url(/StrendinMonitor/Graphs/SNMPThroughput.aspx?sensorid=" + id + "&height=40&width=112&hours=6&semitrans=true)");

    } else {  
        add_snmp_sensor_node(sidebar, id, title, health, inbits, outbits, megain, megaout, err, rev, connectionLimitIn, connectionLimitOut, trafficPeakIn, trafficPeakOut)
    }
}