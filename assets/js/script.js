var currentTimeObj = moment();
var hourId = 8;

var bOD = moment("7:00 am", "h:mm a")

$("#currentDay").text(currentTimeObj.format("lll"))

var displayedHour = $(".hour")
    .val()
    .trim();
    console.log(displayedHour);

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

    activities.push({
        time: sibActHrId,
        activity: sibActStr
    })
    saveActivities();
    console.log(activities);
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
        console.log("index", index, "value", value.time)
    //     var hourMatch = $(`.hour:contains(${activities.time.val()})`)
    // })

    });
}
loadActivities();



// $.forEach()
//     if(moment($(".hour").text().trim(), "h:mm a") < currentTimeObj.format("h:mm a")) {
//         $("#hour-task").addClass(".past");
//     }
//     // s
//     console.log(moment($(".hour").text().trim(), "h:mm a") < currentTimeObj.format("h:mm a"))

// var topOfHour = function (){
//     if (currentTimeObj.format("mm") === "55")
//     console.log("hello")
// }
// setInterval(topOfHour(), 1000);