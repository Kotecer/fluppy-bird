var rectangle;
var Obstacles = [];
var myScore;
var flag = false;
var score = [];
var j = 0;
console.log(j);

function startGame() {
    rectangle = new component(30, 30, "black", 10, 120);
	
    rectangle.gravity = 0.05;
    myScore = new component("20px", "lobster", "red", 10, 20, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        updateGameArea();
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0.2;
	this.bounce = 0.6;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
		var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        } 
		var rockRoof = 0;//myGameArea.canvas.height - this.height;
		if (this.y < rockRoof) {
            this.y = rockRoof;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        } 
	}
    
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        } else 
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < Obstacles.length; i++) {
        if ((rectangle.crashWith(Obstacles[i])) && (!flag)) {
			flag = true;
			console.log(j);
			alert("game over",score);
			location.reload();
            return;
			
        } 
		
		
    }
	
	
	
    myGameArea.clear();
    myGameArea.frameNo += 4;
	j = 100;
    if (myGameArea.frameNo == 2 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        Obstacles.push(new component(10, height, "blue", x, 0));
        Obstacles.push(new component(10, x - height - gap, "yellow", x, height + gap));
    }
    for (i = 0; i < Obstacles.length; i += 1) {
        Obstacles[i].x += -2;
        Obstacles[i].update();
    }
    myScore.text="score: " + myGameArea.frameNo;
    myScore.update();
    rectangle.newPos();
    rectangle.update();
	if (flag){
		return;
	}
	
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    if (!myGameArea.interval) {myGameArea.interval = setInterval(updateGameArea, 20);}

    rectangle.gravity = n;
}



for (var i = 0; i < score.length-1; i++) {
	
}