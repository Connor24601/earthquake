initialize();


function initialize() {
    window.onload = animate;
}


function animate()
{
    var text1 = document.getElementById("text1");
    var text2 = document.getElementById("text2");
    
    if (text1.innerHTML == "test text one" && text1.style.visibility == "")
    {
        console.log("anim1");
        text1.style.visibility = "visible";
        fade(text1, 1);
        return;
    }
    if (text1.innerHTML == "test text one" && text2.style.visibility == "")
    {
        console.log("anim2");
        text2.style.visibility = "visible";
        fade(text2, 1);
        return;
    }
    if (text1.innerHTML == "test text one" && text2.style.visibility == "visible" && text1.style.opacity != 0)
    {
        console.log("anim3");
        fade(text1, 0);
        //move text 2
        return;
    }
    if (text1.style.opacity == 0 && text1.style.visibility == "visible")
    {
        console.log("anim4");
        text1.style.visibility = "hidden";
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

