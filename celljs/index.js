var MAX = 10;
var RADIUS = 100;
var FPS = 60;
var CENTER = {x:200, y:200};
var CENTER2 = {x:100, y:100};
var canvas, ctx, timer, point;
var point1;
var stats;
var mouseFlag = true;

var Point = function(c, r, rota)
{

    this.x, this.y;
    this.centerX = c.x;
    this.centerY = c.y;
    this.radian = rota * (Math.PI / 180);
    this.radius = r;

    this.speed = Math.random() * 5 + 5;
    this.r = Math.random() * 2 + 1;
    this.rota = 0;


    this.update = function(){
        var plus = Math.cos(this.rota * (Math.PI / 180)) * this.r;

        this.radius += plus

        var cos = Math.cos(this.radian) * this.radius;
        var sin = Math.sin(this.radian) * this.radius;

        this.x = cos + this.centerX;
        this.y = sin + this.centerY;

        this.rota += this.speed;

        if(this.rota > 360){ this.rota -= 360; };
    }  
}

function initialize(){
    var rota = 360 / MAX;
    var i;
    var x;
    for(i = 0; i < MAX; i++)
    {
        point[i] = new Point(CENTER, RADIUS, rota * i);
    }
    for(x = 0; x < MAX; x++)
    {
        point1[x] = new Point(CENTER2, RADIUS, rota * x);
    }
}


function update(){
    for(var i = 0; i < MAX; i++)
    {
        point[i].update();
    }
    for(var x = 0; x < MAX; x++)
    {
        point1[x].update();
    }

    draw1();
    draw();
}

function draw1(){  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(mouseFlag){
        ctx.fiiStyle = "rgba(0, 255, 0, 0.5)";
    }else{
        ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
        ctx.lineWidth = 1;
    }

    ctx.beginPath();

    var xc1 = (point1[0].x + point1[MAX - 1].x) / 2;
    var yc1 = (point1[0].y + point1[MAX - 1].y) / 2;

    ctx.moveTo(xc1, yc1);

    for(var x = 0; x < MAX - 1; x++){

        var xc = (point1[x].x + point1[x + 1].x + 10) / 2;
        var yc = (point1[x].y + point1[x + 1].y + 10) / 2;

        ctx.quadraticCurveTo(point1[x].x, point1[x].y, xc, yc)
    }

    ctx.quadraticCurveTo(point1[x].x, point1[x].y, xc1, yc1);

    ctx.closePath();

    if(mouseFlag){
        ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
        ctx.fill();
    }else{
        ctx.stroke();
    }
console.log("draw1")

    if(mouseFlag){ return; };

    for(x = 0; x < MAX; x++){
        ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
        ctx.beginPath();
        ctx.arc(point1[x].x, point1[x].y, 2, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    }
}
function draw(){  
    if(mouseFlag){
        ctx.fiiStyle = "rgba(0, 255, 0, 0.5)";
    }else{
        ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
        ctx.lineWidth = 1;
    }

    ctx.beginPath();

    var xc1 = (point[0].x + point[MAX - 1].x) / 2;
    var yc1 = (point[0].y + point[MAX - 1].y) / 2;

    ctx.moveTo(xc1, yc1);

    for(var i = 0; i < MAX - 1; i++){

        var xc = (point[i].x + point[i + 1].x) / 2;
        var yc = (point[i].y + point[i + 1].y) / 2;

        ctx.quadraticCurveTo(point[i].x, point[i].y, xc, yc)
    }

    ctx.quadraticCurveTo(point[i].x, point[i].y, xc1, yc1);

    ctx.closePath();

    if(mouseFlag){
        ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
        ctx.fill();
    }else{
        ctx.stroke();
    }

console.log("draw")
    if(mouseFlag){ return; };

    for(i = 0; i < MAX; i++){
        ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
        ctx.beginPath();
        ctx.arc(point[i].x, point[i].y, 2, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    }
}

function changeFlag(){
    mouseFlag = (mouseFlag) ? false : true;
}

window.onload = function(e){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    point = [];
    point1 = [];

    initialize();

    timer = setInterval(update, 1000 / FPS);
}

window. addEventListener("click", changeFlag);

