function setup() {
  bottom = 400;
  right = 400;
  left = 0;
  ceilling = 0;
  createCanvas(right, bottom);
  bunni1 = new bunni(70,70,30);
  // land = {centerX,centerY,radius,Color}
  landList = [[70,70,50],[150,150,15],[170,170,15],[200,200,35]];
}
function draw() {
  background(220);
  
  for(let i = 0; i < landList.length; i++){
    fill('lime')
    circle(landList[i][0],landList[i][1],landList[i][2]*2);
  }
  bunni1.display();
  bunni1.move();
}

function createLand(x,y,r){
  append(landList,[x,y,r]);
}

class bunni{
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.r = 10
    this.insideList = [];
    this.speed = 5;
  }
  InLand(placeX = this.x, placeY = this.y){
    let tempList = [];
    for(let i = 0; i < landList.length; i++){
      if ((placeX - landList[i][0]) * (placeX - landList[i][0]) +
        (placeY - landList[i][1]) * (placeY - landList[i][1]) <= landList[i][2] * landList[i][2]){
        append(tempList,i);
      }
    }
    this.insideList = tempList;
    if(this.insideList.length){
      return true;
    } else {
      return false;
    }
  }
  move() {
    if(mouseIsPressed){
      var placeX = (this.x*29+mouseX)/30;
      var placeY = (this.y*29+mouseY)/30;
      
      if (this.InLand(placeX,placeY)){ //checkIfIn(placeX,placeY)){
        this.x = placeX;
        this.y = placeY;
      } else {
        // wait
      }
    }
  }

  display() {
    fill('white');
    circle(this.x, this.y, this.r*2);
  }
}
