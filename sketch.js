
var ball;
var trash;
var powerbar;
var heightOfthrow=0;
var wasItThrown=false;
var didItLand = false;
var didItReachTheTop = false;
var returnToStart = false;
var minRange = 900;
var maxRange = 1200;
var inTheRange = false;
var didItHit = false;
var powerStop;
var level=1;
/*var office;
function preload(){
  office = loadImage("office.png");
}*/
function setup() {
  createCanvas(1000,645);
  ball= new Paper();
  trash = new Bin();
  powerbar = new Power();
}

function draw() {
  background(190);
  fill(0);
  stroke(100);
  strokeWeight(1);
  textSize(60);
  text("Level: " + level, 0,10, width,height);
  noStroke();
  fill(255);
  ellipse(500,570,50,50);
  trash.draw();
  if(level>2){
      trash.move();
  }

  if(!didItHit){
   ball.draw(); 
  }
  
  powerbar.draw();
  //if(wasItThrown && ball.y>560-heightOfthrow){
  if(wasItThrown&& !returnToStart){
    if(ball.y> 560+heightOfthrow && !didItReachTheTop){
    //if the ball was thrown, well then the ball's throw funciton should be called, but, the throw function should stop being called after it reaches the peak of the throw right?
    //so how do we know if it reached the peak yet? well we know that ball.y will give you the y coordinate of the ball and that the desired y coordinate of the top of the
    //throw will be the initial y position-heightofthrow
      ball.throw();
    }
    if(ball.y<560+heightOfthrow){
      didItReachTheTop=true;
    }
    if(didItReachTheTop && !returnToStart){
      ball.falling();

    }
  }

  if(ball.y>height){
    ball.y=570;
    returnToStart=true;
    didItReachTheTop=false;
    wasItThrown=false;
    inTheRange=false;
    if(didItHit){
      level++;

      minRange+=5;
      maxRange-=5;
    }
    didItHit=false;
  }
}
function Paper(){
  this.x=500;
  this.y=570;
  this.changeinY = 0;
  this.draw=function(){
    fill(255)
    ellipse(this.x,this.y,50,50);
  }
  this.throw = function(){
    print("throw function happened");
      this.y-=10;
  }
  this.falling = function(){
    print("the ball fell");
    this.y+=10;
    if(inTheRange){
      print("in the range detected");
      if(this.x > trash.x-20 && this.x< trash.x+20 &&this.y > trash.y){
        didItHit=true;
        print("hit was detected");
      }
    }
  }

}
function Bin(){
  this.x=500;
  this.y=150;
  this.draw=function(){
    stroke(100);
    fill(100);
    rect(this.x-50, this.y, 100,100);
    stroke(100);
    strokeWeight(5);
    fill(0);
    ellipse(this.x,this.y,100,40);
    stroke(100);
    fill(100);
    noStroke();
    ellipse(this.x,this.y+100,100,40);
    ellipse(70,70);
  }
  this.move=function(){
    this.x=500+50*level*(sin(millis()/(1000-level*50)));
  }

}
function Power(){
  this.x=50;
  this.y=500;
  this.totalpwr=150;
  this.powerheight;
  this.draw=function(){
    this.totalpwr=150*-1*Math.abs(sin(millis()/(300-level*50)));
    if(!wasItThrown){
      this.powerheight=this.totalpwr;
    }
    if(wasItThrown){
      this.powerheight=powerStop;
    }
    fill(0,0,0)
    rect(this.x-5, this.y-100,20,150);
    strokeJoin(ROUND);
    stroke(255,0,0);
    strokeWeight(10);
    fill(255,0,0)
    rect(this.x,this.y+50,12,this.powerheight)
    noStroke();
    fill(0,0,0)
    ellipse(this.x-5,this.y+50-minRange/10,10,10);
    ellipse(this.x-5,this.y+50-maxRange/10,10,10);

  }
}
function mousePressed(){
  if(!wasItThrown){
  print("mouse was pressed");
  heightOfthrow = powerbar.totalpwr*10;
  print(heightOfthrow);
  returnToStart = false;
  didItHit=false;
  if (heightOfthrow < -minRange && heightOfthrow > -maxRange){
    inTheRange = true;
  }
  //1
  //heightofhtrow should be the total amount of change the y coordinate of the ball will experience
  //the bigger the totalpwr the bigger the height of the throw, but height of throw should not = the total pwr exactly otherwise
  //the highest throw the ball will ever do is only 100 pixels (because totalpwr never gets bigger than 100)
  wasItThrown=true;
  powerStop=powerbar.totalpwr;
}
}
