/* ******************************************** */
/* * Editable values                          * */
/* ******************************************** */

// School name, as you would like it displayed
var school_name = "Heritage Christian School";

// Max connection speeds (in megabits per second)
var school_maxmbps_in = 10;
var school_maxmbps_out = 10;

// Is the SNMP data reversed? Is the "in" field actually the "out" traffic?
var school_snmp_is_reversed = false;

// URLs to the JSON files from the SNMP monitor. These should NOT start with "http://dashboard.lskysd.ca"
// so use relative links only.
var school_snmp_json_path = strendinMonitorJSONRoot + "/JSON/bySNMPThroughputSensor.aspx?sensorid=17";
var school_ping_json_path = strendinMonitorJSONRoot + "/JSON/byPingLatencySensor.aspx?sensorid=16";
