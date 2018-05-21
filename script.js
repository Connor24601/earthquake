initialize();

function initialize() {
    text1 = document.getElementById("text1");
    text2 = document.getElementById("text2");
    //text1.style.visibility = "visible";
    //requestAnimationFrame(fadeIn);
    fade(text1, 1);
    
    

}

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(fn){
        setTimeout(fn,16.66);
    }
}

var opacity = 30;
function fadeIn() {
    opacity++;
    document.getElementById("text1").style.opacity = opacity/100;
    if (opacity < 100){
        requestAnimationFrame(fadeIn);
    }
}



function fadeIn()
{
    document.getElementById("text1").style.opacity += .01;
    if (document.getElementById("text1").style.opacity < 1)
    {
        requestAnimationFrame(fadeIn);
    }
}







function fade(element, target)
{
    var opacity = element.style.opacity * 100;
    function fadeRecur()
    {
        
        if (element.style.opacity == target){
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

