//***Visual elements are remixed from 
//Daniel Shiffman's tutorials on Youtube: The Coding Train (9.22:Custome Shapes; Coding Challenge #88 Snowfall, 
//Home page tutorial 
//Emotion detector remix from  
//***Other technical skills learned from 
//Karen Ann's tutorials, Slave to the Algorithm course at RMIT; Danial Shiffman's tutorials from The Coding Train (Youtube);
//

//Sound + Slider
//let songs = [angrySong, sadSong, neutralSong, surprisedSong, happySong];
let mode;
let angrySong;
let sadSong; 
let neutralSong;
let surprisedSong;
let happySong;
//let slider; 
let soundButtonOn;
let soundButtonOff;

// Angry + Neutral
let stars = [];
let waves = [];

// Suprised
let blooming =[];
let gravity;

// Happy
let dot = {x: 0, y: 0};
let col = {r: 255, g: 255, b: 0 };

// Sad
let snow = [];
let gravity2;

let zOff = 0;
let spritesheet;
let textures = [];

let homepage;


let ctracker;
let videoInput;
let capture;
// let ec, emotionData;
let ec = new emotionClassifier();
ec.init(emotionModel);
let emotionData = ec.getBlank();


function preload() {
  ec = new emotionClassifier();
  emotionData = ec.getBlank();
  ec.init(emotionModel);
  spritesheet = loadImage('sadnesspattern.png');
  homepage = loadImage ('homepage.png');
  soundButtonOn = loadImage('soundButtonOn.png');
  soundButtonOff = loadImage ('soundButtonOff.png');
  
  happySong = loadSound('music/DanceMonkeyCut.mp3');
  //surprisedSong = loadSound('music/BoogieWoogieCut.mp3');
  //neutralSong = loadSound('music/BachCut.mp3');
  //sadSong = loadSound('music/MotCoiDiVeCut.mp3');
  //angrySong = loadSound('music/DiesIraeCut.mp3');
  
  //songs[4] = loadSound('music/DanceMonkeyCut.mp3');
  //songs[3] = loadSound('music/BoogieWoogieCut.mp3');
  //songs[2] = loadSound('music/BachCut.mp3');
  //songs[1] = loadSound('music/MotCoiDiVeCut.mp3');
  //songs[0]= loadSound('music/DiesIraeCut.mp3');
}

function setup() {
  mode = 0;
  textSize(21);
// set up canvas + camera  
  //let cnv = createCanvas(window.innerWidth,window.innerHeight);
  let cnv = createCanvas(1720,1080);
  cnv.position(0,0);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();
  
  // set up emotion Angry
  for (let i = 0; i< 50; i++) {
  let x = random(100);
  let y = random(100);
  stars[i] = new Star(x, y);
} 
  
  // set up emotion Neutral
  for (let i = 0; i< 50; i++) {
  let x = random(100);
  let y = random(100);
  waves[i] = new Wave(x, y);
} 
  // set up Sadness
  gravity = createVector(0, 0.3);
  for (let x = 0; x < spritesheet.width; x += 128) {
    for (let y = 0; y < spritesheet.height; y += 128) {
      let img = spritesheet.get(x, y, 128, 128);
      image(img, x, y);
      textures.push(img);
    }
  }

  for (let i = 0; i < 400; i++) {
    let x = random(width);
    let y = random(height);
    let design = random(textures);
    snow.push(new Snowflake(x, y, design));
  }
  
  // set up Surprised
  gravity= createVector(0,0.2);
  
// setup tracker
  pModel.shapeModel.nonRegularizedVectors.push(9);
  pModel.shapeModel.nonRegularizedVectors.push(11);
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(capture.elt);
  noStroke();
  
}

function draw() {
  clear ();
if (mode == 0) {
  background(0);
  //translate(400, 100);
  translate(400, 0);
  //text ('Press enter to start',0,0);
  image(homepage, 0,0, 800,500);
}
if (mode == 1) {
  background (0);
   // set up slider 
  //slider = createSlider(0,1,0.5,0.01);
  //slider.position (40,800);
  //slider.style ('width', '320px');
  
 image(soundButtonOff, 0, 800, 50, 50);
  fill(255);
  // scale(-1, 1);
  image(capture, 0, 0, 320, 240);
  
   //set sound Volume
  //happySong.setVolume(slider.value());
  //for (let i = 0; i <= songs.length; i++){
  //songs[i].setVolume(slider.value());
  //}
  
  
  //surprisedSong.setVolume(slider.value());
  //neutralSong.setVolume(slider.value());
  //sadSong.setVolume(slider.value());
  //angrySong.setVolume(slider.value());
  
  // get array of face marker positions [x, y] format
  let positions = ctracker.getCurrentPosition();
  for (let i = 0; i < positions.length; i++) {
    ellipse(positions[i][0], positions[i][1], 5, 5);// draw ellipse at each position point
  }  
  let cp = ctracker.getCurrentParameters();
  let er = ec.meanPredict(cp);
    showResults(er);
}
}

function showResults(er) {

  // console.log(er)
  
  textSize(20);
  if(er[0]!== undefined){
      //ANGRY er0
      fill(255,102,102);
      text(er[0].emotion, 50, 290);
      rect(10, 300, er[0].value*400, 20);
      if (er[0].value*400 > 150){
      for (let i = 0; i < stars.length; i++){
        stars[i].move();
        stars[i].show();
      }
      }
     
  //} else if (er[1]!= undefined){
    //SAD er 1
      fill(153,153,255);
      text(er[1].emotion, 50, 390);
      rect(10, 400, er[1].value*400, 20);
      if (er[1].value*400 > 150){
      zOff += 0.1;

  for (flake of snow) {
    let xOff = flake.pos.x / width;
    let yOff = flake.pos.y / height;
    let wAngle = noise(xOff, yOff, zOff) * TWO_PI;
    let wind = p5.Vector.fromAngle(wAngle);
    wind.mult(0.1);

    flake.applyForce(gravity);
    flake.applyForce(wind);
    flake.update();
    flake.render();
  }
      }
  //} else if (er [2]!= undefined){
    //NEUTRAL er 2
      fill(153,255,255);
      text(er[2].emotion, 50, 490);
      rect(10, 500, er[2].value*400, 20);
      if (er[2].value*400 > 100){
       for (let i = 0; i < waves.length; i++){
             waves[i].move();
             waves[i].show();
           }
      }
     
      // HAPPY Er
  //} else if (er [3]!= undefined){
      fill(255,255,153);
      text(er[3].emotion, 50, 590);
      rect(10, 600, er[3].value*400, 20);
      if (er[3].value*400 > 150){
      dot.x = random(320,width); dot.y = random(0,height);
      col.g = random (200,250);
      fill (255,col.g, 0);
      ellipse (dot.x, dot.y, 50, 50);
      dot.x = random(320,width); dot.y = random(0,height);
      col.g = random (150,255);
      ellipse (dot.x, dot.y, 120, 120);
      dot.x = random(320,width); dot.y = random(0,height);
      col.g = random (150,250); 
      point(dot.x, dot.y);
}
       // SURPRISED er3
  //} else if (er [3]!= undefined){
      fill(153,255,153);
      text(er[4].emotion, 50, 690);
      rect(10, 700, er[4].value*400, 20);
      if (er[4].value*400 > 150){
       stroke(153,255,153);
       strokeWeight (4);
      if (random(1)<0.1){
   blooming.push(new Blooming ());
   
 }
 for (let i = blooming.length-1; i>=0; i--){
   blooming[i].update();
   blooming[i].show();
   if (blooming [i].done()){
     blooming.splice (i,1);
 }
 }
      }
  }
}

function keyPressed(){
  if (keyCode === ENTER) { 
  mode = 1;
}
}

//function musicPlay (){
  
function mousePressed(){//triggers on mousepress
  if (happySong.isPlaying()){//check if the song is playing
    happySong.stop();//if it is then stop the song
    happySong.noLoop();
     // set up soundButton
  }
  else{
  image(soundButtonOn,0,800,50,50);//changes fill to red
  happySong.play();// if it isn't then play the song
  happySong.loop();
  }
}
//function mousePressed(){
//  for (let i = 0; i < songs.length; i++){
//  if (songs[i].isPlaying()){//check if the song is playing
//    songs[i].stop();//if it is then stop the song
//    songs[i].noLoop();
//     // set up soundButton
//  image(soundButtonOff, 0, 800, 50, 50);
//  }
//  else{
//  image(soundButtonOn,0,800,50,50);//changes fill to red
//  songs[i].play();// if it isn't then play the song
//  songs[i].loop();
//  }
//}
//}
