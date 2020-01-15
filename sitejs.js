//Canvas Things
//Main Canvas
var canvas = document.getElementById("main-canvas");
var ctx = canvas.getContext("2d");
//About Me Canvas
var amcanvas = document.getElementById("about-me-canvas");
var amctx = amcanvas.getContext("2d");
var amcont = document.getElementById("about-me-canvas-container");
var amdim = amcont.getBoundingClientRect();
var n_stars = 500;
var STARS = [];
var AMPARTICLES = [];
var acx = 0;
var acy = 0;


window.onload = function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //About me Canvas
    amcanvas.width = amdim.width;
    amcanvas.height = amdim.height;
    //Center of Screen
    acx = amcanvas.width / 2;
    acy = amcanvas.height / 2;
    for(var i=0; i < n_stars; i++){
        STARS[i] = new Star();
        STARS[i].draw();
    }
    for(var i=0; i < n_stars; i++){
        AMPARTICLES[i] = new Particle();
        AMPARTICLES[i].draw();
    }
    animate();
}

window.onresize = function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    amdim = amcont.getBoundingClientRect();
    amcanvas.width = amdim.width;
    amcanvas.height = amdim.height;
    acx = amcanvas.width / 2;
    acy = amcanvas.height / 2;
    for(var i=0; i < n_stars; i++){
        STARS[i] = new Star();
        STARS[i].draw();
    }
    for(var i=0; i < n_stars; i++){
        AMPARTICLES[i] = new Particle();
        AMPARTICLES[i].draw();
    }
}

var Star = function() {
    //Variables for Star Positioning
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radians = 0;
    this.velocity = Math.random() * 0.1;
    this.size = Math.random() * 2;
    //Methods
    this.draw = function(){
        if(canvas.getContext){          
            //Draw Star
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
            ctx.fillStyle = "white";
            ctx.fill();
        }
    }
    this.update = function(){
        this.radians += this.velocity;
        this.x += (Math.random() * 2) * Math.cos(this.radians);
        this.y += (Math.random() * 2) * Math.sin(this.radians);
        //console.log("success");
    }
};


function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    amctx.clearRect(0,0,amcanvas.width,amcanvas.height);
    for(var i=0; i<n_stars;i++){
        STARS[i].update();
        STARS[i].draw();
    }
    for(var i=0; i<n_stars;i++){
        AMPARTICLES[i].update();
        AMPARTICLES[i].draw();
    }
}

var Particle = function(){
    //Variables for positioning
    this.x = acx + ((Math.random() - 0.5) * (0.1 * amcanvas.width));
    this.y = acy + ((Math.random() - 0.5) * (0.1 * amcanvas.height));
    this.radians = 0;
    this.velocity = 0.1 * Math.random() - 0.05;
    this.size = Math.random() * 3;
    this.draw = function(){
        if(amcanvas.getContext){          
            //Draw Star
            amctx.beginPath();
            amctx.arc(this.x,this.y,this.size,0,2*Math.PI);
            amctx.fillStyle = "white";
            amctx.fill();
        }
    }
    this.update = function(){
        this.radians += this.velocity;
        this.x += 3 * Math.cos(this.radians);
        this.y += 3 * Math.sin(this.radians);
    }
};

//Taken from https://cssanimation.rocks/scroll-animations/
// Detect request animation frame
var scroll = window.requestAnimationFrame ||
             // IE Fallback
             function(callback){ window.setTimeout(callback, 1000/60)};
var elementsToShow = document.querySelectorAll('.show-on-scroll'); 

function loop() {

    Array.prototype.forEach.call(elementsToShow, function(element){
      if (isElementInViewport(element)) {
        element.classList.add('is-visible');
      } else {
        element.classList.remove('is-visible');
      }
    });

    scroll(loop);
}

// Call the loop for the first time
loop();

// Helper function from: http://stackoverflow.com/a/7557433/274826
function isElementInViewport(el) {
  // special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}