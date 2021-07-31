

$(document).ready(function() {

    onoff_status_bar_init("sensor_bar_container", 62); // Cando
    onoff_status_bar_init("sensor_bar_container", 66); // Heritage
    onoff_status_bar_init("sensor_bar_container", 65); // HCES
    onoff_status_bar_init("sensor_bar_container", 79); // Leoville
    onoff_status_bar_init("sensor_bar_container", 60); // NBCHS
    onoff_status_bar_init("sensor_bar_container", 76); // NCEs

    onoff_status_bar_update(strendinMonitorJSONRoot + "/pinglatencysensors");
        
});
