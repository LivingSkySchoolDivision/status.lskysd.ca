
function index_table_row(name, url, snmpsensorid, pingsensorid, snmpgraphmax) {
    var graphHours = 6;
    var graphHeight = 50;
    var snmpGraphWidth = 300;
    var pingGraphWidth = 300;

    $('#site_list_table > tbody:last').append(
        "<tr><td align='center'>" +
        "<a class='school_link' href='/schools/" + url + "/'>" + name + "</a>" +
        "</td><td>" +
        "<img class='roundborder' src='" + strendinMonitorGraphRoot + "/graphs/SNMPThroughput.aspx?sensorid=" + snmpsensorid + "&showhours=true&graphstyle=line&width=" + snmpGraphWidth + "&height=" +  graphHeight+ "&hours=6&maxvalue=" + snmpgraphmax + "'>" +
        "</td><td>" +
        "<img class='roundborder' src='" + strendinMonitorGraphRoot + "/graphs/PingLatency.aspx?sensorid=" + pingsensorid + "&showhours=true&graphstyle=bar&width=" + pingGraphWidth + "&height=" +  graphHeight+ "&hours=" + graphHours + "'>" +
        "</td></tr>"
        );
}

$(document).ready(function(){
    //index_table_row("", "", , , 5);
    //index_table_row("Primary Internet Connection", "#", 1, 1, 200)
    //index_table_row("Failover Internet Connection", "#", 2, 1, 200)
    index_table_row("Division Office", "do", 5, 6, 10);
    index_table_row("Battleford Central", "bcs", 9, 8, 10);
    index_table_row("Bready", "bready", 10, 9, 10);
    index_table_row("Cando", "cando", 11, 10, 10);
    index_table_row("Connaught", "connaught", 14, 13, 10);
    index_table_row("Cut Knife Elementary", "ckes", 12, 11, 10);
    index_table_row("Cut Knife High", "ckhs", 13, 12, 10);
    index_table_row("Hafford", "hafford", 15, 14, 10);
    index_table_row("Hartley Clark", "hces", 16, 15, 10);
    index_table_row("Heritage", "heritage", 17, 16, 10);
    index_table_row("Kerrobert", "kerrobert", 18, 17, 10);
    index_table_row("Lawrence", "lawrence", 3, 3, 10);
    index_table_row("Leoville", "leoville", 19, 18, 10);
    index_table_row("Luseland", "luseland", 20, 19, 10);
    index_table_row("Macklin", "macklin", 21, 20, 10);    
    index_table_row("Maymont", "maymont", 23, 21, 10);
    index_table_row("McKitrick", "mckitrick", 24, 22, 10);
    index_table_row("McLurg", "mclurg", 25, 23, 10);
    index_table_row("Medstead", "medstead", 26, 24, 10);
    index_table_row("NBCHS", "nbchs", 27, 25, 10);
    index_table_row("Norman Carter", "nces", 28, 26, 10);
    index_table_row("Spiritwood High", "shs", 30, 28, 10);
    index_table_row("St. Vital", "stv", 33, 31, 10);
    index_table_row("UCHS", "uchs", 31, 29, 10);
    index_table_row("UPS", "ups", 32, 30, 10);
});