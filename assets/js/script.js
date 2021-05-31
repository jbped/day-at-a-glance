// Starting hour-id value
var hourId = 8;
// beginning of day time for render time
var bOD = moment("7:00 am", "h:mm a")

// Render time and add hour id to each element in the time row
$.each($(".row"), function(){
    $(this).find(".hour").text(bOD.add(1, "h").format("h:mm a"))
    .attr("hour-id", hourId);
    $(this).find("#hour-task")
    .attr("hour-id", hourId);
    $(this).find(".saveBtn")
    .attr("hour-id", hourId++);
})

// On save button press, find the users entered string and the hour id
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var siblingActivity = $(this).siblings("#hour-task")
    var sibActStr = siblingActivity.val().trim();
    var sibActHrId = siblingActivity.attr("hour-id")
    console.log(sibActHrId);

// Create an object with the time (hour id) and activity (entered value) add it to the activities object
    activities[sibActHrId] = {
        time: sibActHrId,
        activity: sibActStr
    }
    // run save activities
    saveActivities();
})

// save the activities object
var saveActivities = function() {
    localStorage.setItem("activities", JSON.stringify(activities));
}

// get the saved activities object from localStorage
var loadActivities = function() {
    activities = JSON.parse(localStorage.getItem("activities"));

    // If the activity object doesn't exist create blank with appropriate object keys
    if(!activities) {
        activities = {
            8: {},
            9: {},
            10: {},
            11: {},
            12: {},
            13: {},
            14: {},
            15: {},
            16: {},
            17: {}
        };
    }

    // Get the hour id, get the activity value, match hourid with the textarea that has the same id and add text to textarea
    $.each(activities, function(index, value) {
        var hour = value.time;
        console.log(hour)
        var activity = value.activity;
        // console.log("index", index, "value", value.time, "activity", activity)
        var hourMatch = $(`.hour[hour-id=${hour}]`).siblings("#hour-task");
        hourMatch.text(activity);
        // console.log(hourMatch)
    });
}

// Run loadActivities on load
loadActivities(); 

// set interval checks every sec for the displayed current time, generate current time, and update classes for past, current, and future.
setInterval(function(){
    $("#currentDay").text(moment().format("lll")); 
    
    var hourMomObj = parseInt(moment().format("H"));
    // console.log(hourMomObj) 

    $.each($(".hour-task"), function() {
        var hourId = parseInt($(this).attr("hour-id"));
        // console.log(hourId)

  
        // var hourDiff = hourMomObj.diff(moment(), "hours", true)
        // console.log(hourDiff)
    
        if (hourMomObj > hourId) {
            $(this).addClass("past");
        } else if (hourId === hourMomObj) {
            $(this).addClass("present");
            
        } else if (hourMomObj < hourId) {
            $(this).addClass("future");
        }
    });
    console.log("checked")
}, 1000);