function Blooming (){
  
  this.blooming = new Particle (random(1800),300,true);
  this.exploded = false;
  this.particles = [];
  this.done = function (){
    if (this.exploded && this.particles.length === 0){
    return true;
    } else {
      return false; 
    }
  }
  this.update = function (){
    if (!this.exploded){
    this.blooming.applyForce(gravity);
    this.blooming.update();
    if (this.blooming.vel.y >=0){
      this.exploded = true;
      this.explode();
      } 
    }
  for (let i = 0; i < this.particles.length; i ++){
    this.particles[i].applyForce(gravity);
    this.particles[i].update();
  }
  }
  
  this.explode = function (){
     for (let i = 0; i < 100; i ++) {
      let p = new Particle(this.blooming.pos.x,this.blooming.pos.y);
      this.particles.push(p);
    }     
  }
  this.show = function (){
    if (!this.exploded){
    this.blooming.show();
    }
    for (let i = 0; i < this.particles.length; i ++){
    this.particles[i].show();
   }
 
  }
  
}
