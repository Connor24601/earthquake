initialize();


function initialize() {
    window.onload = animate;
    anim = -1;
    isHomeGone = isHomeDestroyed();
}

var anim;
var isHomeGone;

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
        
        fade(text1, 0);
        return;
    }
    if (anim == 3)
    {
        
        text1.innerHTML = "";

        text1.innerHTML += "x months, y days and z hours";
        text1.innerHTML += " ago people ";
        text1.innerHTML += "xyz km from location";
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
        
        console.log("anim3");
        fade(text2, 0);
        fade(text1, 1);
        //text2.style.paddingTop = "5vh";
        //text2.style.paddingLeft = "5vw";
        
        return;
    }
    if (anim == 5)
    {
        console.log(text2.style.opacity);
        console.log("anim4");
        text2.style.paddingTop = "1vh";
        //text2.style.paddingTop = "35vh";
        text2.style.paddingLeft = "15vw";
        text2.style.width = "70vw";
        text2.style.textAlign = "center";
        text2.innerHTML = "A magnitude X earthquake hit on Date. It was one of xyz extremely dangerous earthquakes this year, causing large potential loss of life.";
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

