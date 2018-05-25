initialize();

var data;
function initialize() {
    window.onload = animate;
    anim = -1;
    data = [];
    isHomeGone = isHomeDestroyed();
    getQuakeList();
    recentDangerous = {"earthquake":null, "timeSince":null};
    isRecentDangerousFound = false;
    getRecentDangerous();
    

}

var anim;
var isHomeGone;
var isDataCompiled;
var isRecentDangerousFound;
var recentDangerous;

function animate()
{
    var text1 = document.getElementById("text1");
    var text2 = document.getElementById("text2");
    anim ++;
    

    if (anim == 0)
    {
        //temp = text1.style.paddingTop + " + " + text1.style.height;
        //text2.style.paddingTop += " + " + temp;
        //console.log(temp);
        if (isHomeGone)
        {
            text2.style.color = "red";
            text2.style.fontSize = "4vw";
            text2.innerHTML = "YES.";
        }
        else
        {
            text2.style.color = "forestgreen";
        }
        console.log("anim1");
        text1.style.visibility = "visible";
        fade(text1, 1);
        return;
    }
    if (anim == 1)
    {
        
        console.log("anim2");
        text2.style.visibility = "visible";
        fade(text2, 1);
        
        
        return;
    }
    if (anim == 2)
    {
        console.log("anim3");
        fade(text1, 0);
        fade(text2, 0);
        return;
    }
    if (anim == 4 && !isRecentDangerousFound)
    {
        console.log("Our data is not yet ready but we need it.");
        anim--;
        setTimeout(animate, 500);
        return;
    }
    if (anim == 4 && isRecentDangerousFound)
    {
        
        text1.innerHTML = "";
        text1.innerHTML += recentDangerous["timeSince"];
        text1.innerHTML += " ago people ";
        
        text1.innerHTML += recentDangerous["quake"]["properties"]["place"];
        if (isHomeGone)
        {
            text1.innerHTML += " shared my misfortune.";
            text1.style.color = "red";
        }
        else
        {
            text1.innerHTML += " were not as fortunate.";
            text1.style.fontSize="3vmin";
        }
        
        console.log("anim4");
        
        fade(text1, 1);
        //text2.style.paddingTop = "5vh";
        //text2.style.paddingLeft = "5vw";
        
        return;
    }
    if (anim == 5)
    {
        
        console.log("anim5");
        text2.style.paddingTop = "1vh";
        //text2.style.paddingTop = "35vh";
        text2.style.paddingLeft = "15vw";
        text2.style.width = "70vw";
        text2.style.textAlign = "center";
        //text2.innerHTML = "A magnitude X earthquake hit on Date. It was one of xyz extremely dangerous earthquakes this year, causing large potential loss of life.";
        text2.style.fontSize = "2vmin";
        text2.style.color = "white";
        fade(text2, 1);
        //text2.style.color = "red";
        //text1.style.width = "60vw";
        //fade(text1, 1);
        return;
    }
    
    
}


if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(fn){
        setTimeout(fn,16.66);
    }
}


function fade(element, target)
{
    var opacity = element.style.opacity * 100;
    function fadeRecur()
    {
        
        if (element.style.opacity == target){
            animate();
            return;
        }
        if (element.style.opacity < target)
        {
            opacity++;
        }
        else
        {
            opacity--;
        }
        element.style.opacity = opacity/100;
        requestAnimationFrame(fadeRecur);
    }
    requestAnimationFrame(fadeRecur);
}

function isHomeDestroyed()
{
    //return true; //for testing
    var url = "https://earthquake.usgs.gov/fdsnws/event/1/count?format=geojson&starttime=1/1/2018&minmagnitude=6.5&latitude=37.8&longitude=-122.2&maxradiuskm=50";
    fetch(url, {method: 'get'})

    .then((response) => response.json())

    .then(function(data) {
        return data["count"] != 0;
    });
}

function getQuakeList()
{
    var startdate = new Date();
    startdate.setFullYear(startdate.getFullYear()-1);
    var minmag = 3;
    var url = "https://earthquake.usgs.gov/fdsnws/event/1/count?format=geojson";
    var cond;
    do {
        minmag += 0.2;
        console.log("requesting how much to request");
        url = "https://earthquake.usgs.gov/fdsnws/event/1/count?format=geojson";
        url += "&minmagnitude=" + minmag;
        url += "&starttime=" + startdate.toISOString();
        fetch(url, {method: 'get'})
        .then((response) => response.json())
        .then(function(data) {
             cond = data["count"] > data["maxAllowed"];
        });
    }
    while (cond);
    var url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson";
    url += "&starttime=" + startdate.toISOString();
    url += "&minmagnitude=" + minmag;
    console.log("requesting data...");
    fetch(url, {method: 'get'})
    .then((response) => response.json())
    .then(function(bigData) {
        console.log("data recieved. Going through it to find dangerous quakes...");
        for (var i = 0; i < bigData["features"].length; i++)
        {
            if (bigData["features"][i]["properties"]["alert"] == "red" ||
                bigData["features"][i]["properties"]["alert"] == "yellow")
            {
                data.push(bigData["features"][i]);
            }
        }
        
        console.log("dangerous quake list compiled.");
        if (anim < 3)
        {
            console.log("refreshing recentDangerous");
            recentDangerous["quake"] = data[selectQuake()];
            date2 = new Date(recentDangerous["quake"]["properties"]["time"]);
            recentDangerous["timeSince"] = timeBetweenDates(new Date(), date2);
            isRecentDangerousFound = true;
            console.log("updated recentDangerous");
        }
        else
        {
            console.log("recentDangerous temp search already found and used.");
            if (recentDangerous["quake"]["properties"]["place"] == data[selectQuake()]["properties"]["place"])
            {
                console.log("quick recentDangerous was the same as actual.");
            }
            else
            {
                console.log("quick recentDangerous was not actual. Actual had mag = "
                    + data[selectQuake()]["quake"]["properties"]["mag"] + " at place " 
                    + data[selectQuake()]["quake"]["properties"]["place"]);
            }
        }
        
        isDataCompiled = true;

    });

}


function timeBetweenDates(date1, date2)
{
    var seconds = Math.floor((date1 - date2)/1000);
    var minutes = Math.floor(seconds/60);
    var hours = Math.floor(minutes/60);
    var days = Math.floor(hours/24);

    hours = hours-(days*24);
    minutes = minutes-(days*24*60)-(hours*60);
    seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
    return days + " days, " + hours + " hours, " + minutes + " minutes and " + seconds + " seconds";
}

function getRecentDangerous()
{
    var startdate = new Date();
    console.log("fetching recentDangerous separately...");
    startdate.setFullYear(startdate.getFullYear()-1);
    var url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson";
    url += "&starttime=" + startdate.toISOString();
    url += "&minmagnitude=5.5";
    fetch(url, {method: 'get'})
    .then((response) => response.json())
    .then(function(bigData) {
        console.log("Preliminary data recieved, isolating recentDangerous...");
        for (var i = 0; i < bigData["features"].length; i++)
        {
            if (bigData["features"][i]["properties"]["alert"] == "red")
            {
                recentDangerous["quake"] = bigData["features"][i];
                date2 = new Date(recentDangerous["quake"]["properties"]["time"]);
                recentDangerous["timeSince"] = timeBetweenDates(new Date(), date2);
                isRecentDangerousFound=true;
                console.log("recentDangerous red alert found");
                return;
            }
            else if (bigData["features"][i]["properties"]["alert"] == "yellow" && !recentDangerous)
            {
                recentDangerous["quake"] = bigData["features"][i];
            }
        }
        date2 = new Date(recentDangerous["quake"]["properties"]["time"]);
        recentDangerous["timeSince"] = timeBetweenDates(new Date(), date2);
        isRecentDangerousFound = true;
        console.log("recentDangerous found, is yellow alert");
        return;
    });
}


function selectQuake()
{

    x = 0;
    while (data[x]["properties"]["alert"]!='red')
    {
        x++;
        if (x == data.length)
        {    
            x = 0;
            break;
        }
    }
    return x;
}
