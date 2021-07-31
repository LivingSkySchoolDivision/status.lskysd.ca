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


function degreesToRadiansRotated(degrees) {
    return (((degrees - 90) * Math.PI)/180);
}

function degreesToRadians(degrees) {
    return (((degrees) * Math.PI)/180);
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

