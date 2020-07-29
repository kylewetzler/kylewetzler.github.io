function startTime() {
    var today = new Date();
    var w = today.getDay();
    var mo = today.getMonth();
    var d = today.getDate();
    var time = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });


    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var weekdays = {0 : 'Sunday', 1 : 'Monday', 2 : 'Tuesday', 3 : ' Wednesday', 4 : 'Thursday', 5 : 'Friday',
                    6 : 'Saturday'};
    var months = {0 : 'January', 1 : 'February', 2 : 'March', 3 : 'April', 4 : 'May', 5 : 'June', 6 : 'July',
                    7 : 'August', 8 : 'September', 9 : 'October', 10 : 'November', 11 : 'December'};
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML =
        time;
    document.getElementById('date').innerHTML =
        weekdays[w] + ', ' + months[mo] + ' ' + d;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}