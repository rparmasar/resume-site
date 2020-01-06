//Canvas Things
var canvas = document.getElementById("main-canvas");
var ctx = canvas.getContext("2d");
var n_stars = 500;
var STARS = [];
var cx = 0;
var cy = 0;


window.onload = window.onresize = function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //Center of Screen
    cx = canvas.width / 2;
    cy = canvas.height / 2;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var i=0; i < n_stars; i++){
        STARS[i] = new Star();
        STARS[i].draw();
    }
    animate();
}

var Star = function() {
    //Variables for Star Positioning
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.cx = cx;
    this.cy = cy;
    this.radians = 0;
    this.dx = Math.cos(this.radians);
    this.dy = Math.sin(this.radians);
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
            //console.log("success");
        }
    }
    this.update = function(){
        this.radians += this.velocity;
        this.x = this.x + (Math.random() * 2) * Math.cos(this.radians);
        this.y = this.y + (Math.random() * 2) * Math.sin(this.radians);
    }
};


function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var i=0; i<n_stars;i++){
        STARS[i].update();
        STARS[i].draw();
    }
}
