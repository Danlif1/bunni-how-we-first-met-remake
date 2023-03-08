function setup() {
  bottom = 400;
  right = 400;
  left = 0;
  ceilling = 0;
  translatedX = 130;
  translatedY = 130;
  createCanvas(right, bottom);
  bunni1 = new bunni(70,70,30);
  // land = {centerX,centerY,radius,Color}
  landList = [];
  land1 = new Land(70,70,100,70,'lime');
  append(landList,land1);
  land2 = new Land(100,100,70,70,'lime');
  append(landList,land2);
  bubbleList = [];
  bubble = new bubble(20,20,'shop');
  append(bubbleList,bubble);

}
function draw() {
  background(220);
  translate(translatedX,translatedY);
  if(landList.length < 10){
    createLand(random(400),random(400),random(50,100),random(50,100),'lime');
  } else if(landList.length === 10) {
    createLand(130,130,70,70,'lime');
  }
  for(let i = 0; i < landList.length; i++){
    landList[i].display();
  }
  for(let i = 0; i < bubbleList.length; i++){
    bubbleList[i].display();
  }
  for(let i = 0; i < bubbleList.length; i++){
    bubbleList[i].checkClick();
  }
  bunni1.display();
  bunni1.move();
}

function createLand(x,y,w,h,c){
  land = new Land(x,y,w,h,c);
  append(landList,land);
}


function checkPoint(x, y, h, w, a, b) {
 
    let res = ((x-a)*(x-a))/(w*w/4)+((y-b)*(y-b))/(h*h/4);
    return res;
}
function checker(land,a,b,r){
  let helper = r/Math.sqrt(2);
  let x = land.x;
  let y = land.y;
  let h = land.h;
  let w = land.w;
  if(checkPoint(x,y,h,w,a-r,b) >= 1){
    return false;
  } else if(checkPoint(x,y,h,w,a,b+r) >= 1){
    return false;
  } else if(checkPoint(x,y,h,w,a,b-r) >= 1){
    return false;
  } else if(checkPoint(x,y,h,w,a+r,b) >= 1){
    return false;
  } else if(checkPoint(x,y,h,w,helper+a,helper+b) >= 1){
    return false;
  } else if(checkPoint(x,y,h,w,-helper+a,helper+b) >= 1){
    return false;
  } else if(checkPoint(x,y,h,w,-helper+a,-helper+b) >= 1){
    return false;
  } else if(checkPoint(x,y,h,w,helper+a,-helper+b) >= 1){
    return false;
  } else {
    return true;
  }
}
 
class Land{
  // x,y = place on screen, w,h =  ellipse width and height, c = color
  constructor(x,y,w,h,c){ 
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }
  display() {
    fill(this.c);
    ellipse(this.x,this.y,this.w,this.h);
  }
  
}
class bunni{
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.r = 10
    this.insideList = [];
    this.itemList = [];
    this.speed = 5;
  }
  InLand(placeX = this.x, placeY = this.y){
    let tempList = [];
    let helper = this.r/Math.sqrt(2);
    for(let i = 0; i < landList.length; i++){
      let land = landList[i];
      if (checker(land,placeX,placeY,this.r)){
        append(tempList,i);
      }
    }
    this.insideList = tempList;
    fill('blue')
    circle(placeX,placeY,10);
    if(this.insideList.length){
      return true;
    } else {
      return false;
    }
  }
  move() {
    if(mouseIsPressed){
      var placeX = (this.x*29+mouseX-translatedX)/30;
      var placeY = (this.y*29+mouseY-translatedY)/30;
      
      if (this.InLand(placeX,placeY)){ //checkIfIn(placeX,placeY)){
        this.x = placeX;
        this.y = placeY;
        translatedX = bottom/2 - this.x;
        translatedY = right/2 - this.y;
      } else {
        // wait
      }
    }
  }

  display() {
    fill('white');
    stroke('black');
    circle(this.x, this.y, this.r*2);
  }
}
class bubble{
  constructor(x,y,s){
    this.x = x;
    this.y = y;
    this.s = s;
    this.r = 10;
  }
  checkClick(){
    if(mouseIsPressed){
      if(checkPoint(this.x,this.y,this.r*2,this.r*2,mouseX-translatedX,mouseY-translatedY) <= 1){
        let index = bubbleList.indexOf(this);
        append(bunni1.itemList,bubbleList[index]);
        bubbleList.splice(index,1);
      }
    }
  }
  display(){
    fill('purple');
    circle(this.x,this.y,this.r*2);
    if(this.s === 'shop'){
      fill('red');
      circle(this.x,this.y,this.r)
    }
  }
}
class shop{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.r = 15;
    this.c = 'red'
  }
  display(){
    fill(this.c);
    stroke('black');
    circle(this.x,this.y, this.r*2)
  }
}
