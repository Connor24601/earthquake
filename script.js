initialize();

function initialize() {
    text1 = document.getElementById("text1");
    text2 = document.getElementById("text2");
    text1.style.visibility = "visible";
    text2.style.visibility = "visible";
    text1.style.visibility = "hidden";
    

    document.getElementById("body").onclick = speedUp;

}

function speedUp()
{
    text = document.getElementByClassName("text");
    

}
function fadeIn(el, time) {
  el.style.opacity = 0;

  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / time;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}

