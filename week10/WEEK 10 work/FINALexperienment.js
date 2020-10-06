var beat;
var analyzer; 
let ctracker;
let videoInput;
let capture;
let soundFile;
let dot = {
  x: 100,
  y: 50,
};
let col = {
  r: 255,
  g: 0,
  b: 0
};

// let ec, emotionData;
let ec = new emotionClassifier();
ec.init(emotionModel);
let emotionData = ec.getBlank();

function preload() {
  ec = new emotionClassifier();
  emotionData = ec.getBlank();
  ec.init(emotionModel);
}

function setup() {
// set up canvas + camera  
  let cnv = createCanvas(1800, 1240);
  cnv.position(0,0);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();

  
// setup tracker
  pModel.shapeModel.nonRegularizedVectors.push(9);
  pModel.shapeModel.nonRegularizedVectors.push(11);
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(capture.elt);
  noStroke();
}

// set up sound
beat = loadSound('data/beat.mp3');
analyzer= new p5.Amplitude();
analyzer.setInput(beat);
song.loop();

function draw() {
  background (0);
  fill(255,255,255);
 //noStroke(0);
//dot.x = random(0,width);
//dot.y = random(0,height);
//col.r = random (150,250);
//col.g = random (150,250);
//col.b = random (150,250);
//fill (col.r,col.g,col.b);
//ellipse (dot.x, dot.y, 50, 50);
//dot.x = random(0,width);
//dot.y = random(0,height);
//col.r = random (125,250);
//col.g = 0;
//col.b = random (20,150);
//fill (col.r,col.g,col.b);
//ellipse (dot.x, dot.y, 120, 120);
//dot.x = random(0,width);
//dot.y = random(0,height);
//col.r = random (125,250);
//col.g = random (150,250);
//col.b = 0;
//fill (col.r,col.g,col.b);
//ellipse (dot.x, dot.y, 25, 25);

  
  // scale(-1, 1);
  // image(videoInput, 0, 0, width, height)
  image(capture, 0, 0, 320, 240);

  // get array of face marker positions [x, y] format
  let positions = ctracker.getCurrentPosition();
  for (let i = 0; i < positions.length; i++) {

   // draw ellipse at each position point
    ellipse(positions[i][0], positions[i][1], 5, 5);
  }
  let cp = ctracker.getCurrentParameters();
  let er = ec.meanPredict(cp);
    showResults(er);
  var volume=analyzer.getLevel();//this will extract the volume of the beat
  
}

function showResults(er) {

  // console.log(er)
  
  textSize(35);
  if(er[0]!== undefined){
      //ANGRY er0
      fill(210,45,217);
      text(er[0].emotion, 50, 300);
      rect(0, 300, er[0].value*1000, 30);
      if (er[0].value*1000 > 450){
      beat.play();
      volume=(er[0].value*1000);
      ellipse (random(width),random(height),100,100);
      }
      // DISGUSTED er1
      fill(0,120, 200);
      text(er[1].emotion, 50, 400);
      rect(0, 400, er[1].value*1000, 30);
      if (er[1].value*1000 > 450){
      ellipse (random(width),random(height),100,100);
      }
      
      //FEAR
      fill(210,245,217);
      text(er[2].emotion, 50, 500);
      rect(0, 500, er[2].value*1000, 30);
      if (er[2].value*1000 > 450){
      ellipse (random(width),random(height),100,100);
      }
      //SAD looking down turn head 
      fill(230,207,200);
      text(er[3].emotion, 50, 600);
      rect(0, 600, er[3].value*1000, 30);
      if (er[3].value*1000 > 450){
      ellipse (random(width),random(height),100,100);
      }
      
      // SURPRISE er4 
      fill(0,255,30);
      text(er[4].emotion, 50, 700);
      rect(0, 700, er[4].value*1000, 30);
      if (er[4].value*1000 > 450){
      ellipse (random(width),random(height),100,100);
      }
      // HAPPY Er5
      fill(120,0,200);
      text(er[5].emotion, 50, 800);
      rect(0, 800, er[5].value*1000, 30);
      if (er[5].value*1000 > 450){
      ellipse (random(width),random(height),100,100);
      }
  }
}
 
