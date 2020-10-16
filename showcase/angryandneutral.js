class Star {
 constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  
  move() {
    this.x= this.x + random(-20,20);
    this.y= this.y + random(-20,20);

  }
  
  show(){
    //stroke(random(200),random(200),255);
    stroke (255,random(0,51),100);
    strokeWeight (1);
    noFill();
    beginShape();
    for (let a = 0; a < 180; a += 10){
      let x = this.x * sin(a)+ random(320,1800);
      let y = this.y * cos(a)+ random(height);
      vertex (x,y);
    }
    endShape();
}
}
class Wave {
 constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  
  move() {
    this.x= this.x + random(-10,10);
    this.y= this.y + random(-10,10);

  }
  
  show(){
    stroke(random(200),random(200),255,70);
    //stroke (255,70);
    strokeWeight (0.1);
    noFill();
    beginShape();
    for (let a = 0; a < 360; a += 10){
      let x = this.x * sin(a)+ 800;
      let y = this.y * cos(a)+ 540;
      vertex (x,y);
    }
    endShape();
}
}
