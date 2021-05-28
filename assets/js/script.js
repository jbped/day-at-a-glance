var customHour = 8

var currentTimeObj = moment(customHour,"H");
var hourId = 8;

var bOD = moment("7:00 am", "h:mm a")

$("#currentDay").text(currentTimeObj.format("lll"))

var displayedHour = $(".hour")
    .val()
    .trim();
    // console.log(displayedHour);

var checkTime = function() {
    for(var i = 8; i < 17; i++) {
        $("hour-id", i)
    }
}

$.each($(".row"), function(){
    $(this).find(".hour").text(bOD.add(1, "h").format("h:mm a"))
    .attr("hour-id", hourId);
    $(this).find("#hour-task")
    .attr("hour-id", hourId);
    $(this).find(".saveBtn")
    .attr("hour-id", hourId++);
})

$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var siblingActivity = $(this).siblings("#hour-task")
    var sibActStr = siblingActivity.val().trim();
    var sibActHrId = siblingActivity.attr("hour-id")
    
    // $.each(activities, function(index, obj){
    //     $.each(obj, function(attr, value){
    //         console.log(attr + '==' + value)
    //     });
    // });

    // var index = activities.findIndex(p => p.time == sibActHrId);

    
    var objectToDelete = activities.findIndex(object => object.time == sibActHrId);
    // console.log(objectToDelete);
    delete activities[objectToDelete]
    // let removed = activities.splice(objectToDelete, 1);
    // console.log(removed);
    // console.log(activities)
    
    activities.push({
        time: sibActHrId,
        activity: sibActStr
    })
    
    
    saveActivities();
    // console.log(activities, objectToDelete);
})

var saveActivities = function() {
    localStorage.setItem("activities", JSON.stringify(activities));
}

var loadActivities = function() {
    activities = JSON.parse(localStorage.getItem("activities"));

    if(!activities) {
        activities = [];
    }

    $.each(activities, function(index, value) {
        var hour = value.time;
        var activity = value.activity;
        // console.log("index", index, "value", value.time, "activity", activity)
        var hourMatch = $(`.hour:contains(${hour})`).siblings("#hour-task");
        hourMatch.text(activity);
        // console.log(hourMatch)
    });
}
loadActivities(); 

var checkHour = function() {
    $.each($(".hour-task"), function() {
        var hourId = $(this).attr("hour-id");
        // console.log(hourId)
        var hourMomObj = moment(hourId, "H");
        // console.log(hourMomObj)   
        var hourDiff = hourMomObj.diff(currentTimeObj, "hours")
        // console.log(hourDiff)
    
        if (hourDiff < 0) {
            $(this).addClass("past");
        } else if (hourDiff === 0) {
            $(this).addClass("present");
            
        } else if (hourDiff > 0) {
            $(this).addClass("future");
        }
    });
}

setInterval(function(){
    $.each($(".hour-task"), function() {
        var hourId = $(this).attr("hour-id");
        // console.log(hourId)
        var hourMomObj = moment(hourId, "H");
        // console.log(hourMomObj)   
        var hourDiff = hourMomObj.diff(currentTimeObj, "hours")
        // console.log(hourDiff)
    
        if (hourDiff < 0) {
            $(this).addClass("past");
        } else if (hourDiff === 0) {
            $(this).addClass("present");
            
        } else if (hourDiff > 0) {
            $(this).addClass("future");
        }
    });
    console.log("checked")
}, 1000);