//make sure HTTPS is checked
var ctracker;
var videoInput;
var capture;
var soundFile;
var dot = {
  x: 100,
  y: 50,
};
var col = {
  r: 255,
  g: 0,
  b: 0
};

// var ec, emotionData;
var ec = new emotionClassifier();
ec.init(emotionModel);
var emotionData = ec.getBlank();

function preload() {
  ec = new emotionClassifier();
  emotionData = ec.getBlank();
  ec.init(emotionModel);
}

function setup() {
  createCanvas(690, 640);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide()
  // setup camera capture
  // videoInput = createCapture(VIDEO);
  // videoInput.size(600, 140);
  // videoInput.position(0, 0);
  // videoInput.addEventListener('canplay', enablestart, false);


  //hide video feed if you want
  // videoInput.hide();


  var cnv = createCanvas(1800, 1240);
  cnv.position(0, 0);

  // setup tracker

  pModel.shapeModel.nonRegularizedVectors.push(9);
  pModel.shapeModel.nonRegularizedVectors.push(11);
  ctracker = new clm.tracker();
  ctracker.init(pModel);

  ctracker.start(capture.elt);

  noStroke();
}

function draw() {
  background (0,100);

  fill(255,255,255);
  noStroke(0);
dot.x = random(0,width);
dot.y = random(0,height);
col.r = random (150,250);
col.g = random (150,250);
col.b = random (150,250);
fill (col.r,col.g,col.b);
ellipse (dot.x, dot.y, 50, 50);
dot.x = random(0,width);
dot.y = random(0,height);
col.r = random (125,250);
col.g = 0;
col.b = random (20,150);
fill (col.r,col.g,col.b);
ellipse (dot.x, dot.y, 120, 120);
dot.x = random(0,width);
dot.y = random(0,height);
col.r = random (125,250);
col.g = random (150,250);
col.b = 0;
fill (col.r,col.g,col.b);
ellipse (dot.x, dot.y, 25, 25);

  
  // scale(-1, 1);
  // image(videoInput, 0, 0, width, height)
  image(capture, 0, 0, 320, 240);

  // get array of face marker positions [x, y] format
  var positions = ctracker.getCurrentPosition();

  for (var i = 0; i < positions.length; i++) {
    // draw ellipse at each position point
    ellipse(positions[i][0], positions[i][1], 5, 5);
  }
  var cp = ctracker.getCurrentParameters();
  var er = ec.meanPredict(cp);
  // var emotionData = ec.getBlank();

  // var ec = new emotionClassifier();
  // ec.init(emotionModel);
  // emotionData = ec.getBlank();
  // console.log(er[3]);
    // console.log(er[0].value);

    showResults(er)



}

function showResults(er) {

  // console.log(er)
  
  textSize(35);
  if(er[0] !== undefined){
      text(er[0].emotion, 50, 300);
      rect(0, 300, er[0].value*1000, 30);
      fill(150);
    
      text(er[1].emotion, 50, 400);
      rect(0, 400, er[1].value*1000, 30);
      fill(210,245,217);
      
      text(er[2].emotion, 50, 500);
      rect(0, 500, er[2].value*1000, 30);
      fill(230,207,200);
     
     text(er[3].emotion, 50, 600);
      rect(0, 600, er[3].value*1000, 30);
      fill(0,255,30);
      
      text(er[4].emotion, 50, 700);
      rect(0, 700, er[4].value*1000, 30);
      fill(0,200,130);
      
      text(er[5].emotion, 50, 800);
      rect(0, 800, er[5].value*1000, 30);
      fill(0,255,255);
  }
  
}
