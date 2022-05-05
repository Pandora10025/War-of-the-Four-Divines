let introBot = new RiveScript();
let characterBot = new RiveScript();
let storyBot = new RiveScript();
let bg
let response = []
let nextButton
let pages = 0
let indexResponses = 0

function preload() {
  introBot.loadFile("intro.txt").then(botLoaded).catch(error);
  characterBot.loadFile("character.txt").then(botLoaded).catch(error);
  storyBot.loadFile("story.txt").then(botLoaded).catch(error);
  
  bg = loadImage("bg.jpg");

}

function botLoaded() {
  console.log("Game loaded!");
  introBot.sortReplies();
  characterBot.sortReplies();
  storyBot.sortReplies();
}

function error(_error) {
  console.log(_error);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("Green");

  response.push("Type 'Start' to begin game.");

  nextButton = createButton("Next");
  nextButton.mousePressed(changePage);
  nextButton.position(width*11/12, height*11/12)


  inputField = createInput();
  inputField.position(width * 2 / 6, height * 3 / 4)
  inputField.hide()

  submitBttn = createButton("Send")
  submitBttn.mousePressed(chat);
  submitBttn.position(width * 3 / 5, height * 3 / 4)
  submitBttn.hide()

}

function mainGame() {
  background(bg);

   textAlign(CENTER)
   textSize(60)
   fill("White")
   stroke(203,195,250)
   strokeWeight(5)
   text("Welcome to The War of the Four Divines", width / 2, height*1/3)

   textSize(24)
   fill("Black")
   strokeWeight(3)
   text("(click 'Next' on the bottom right to continue.)", width/2, height*2/5)
}

function introPage() {
  background(255,182,193)
  // textAlign(CENTER)
  // text("This is the intro page", width / 2, height / 2)

  inputField.show()
  submitBttn.show()


  displayResponses()
  // playerInput()
}

function characterPage() {
  background(203,195,227)
  // textAlign(CENTER)
  // text("This is the character page", width / 2, height / 2)

  // playerInput()
  displayResponses()

}

function storyPage() {
  background(162,228,184)
  // textAlign(CENTER)
  // text("This is the story page", width / 2, height / 2)

  // playerInput()
  displayResponses()
}

function respond(responses) {
  response.push(responses);
  // console.log(repsonses);

  
}

function displayResponses(){
  textAlign(LEFT)
 textSize(18);
 rectMode(CENTER)
 strokeWeight(0)
// for (let i = 0; i < response.length; i++) {
  text(
    response[indexResponses],
    width / 2 + 50 ,
    height / 3 +30,
    width/2,
    height/3)
  // if (width/ 3 + i * 60 + 50 > width) {
  //   response.splice(0, 1);

  // }
// }
}

function changePage() {

  if (pages == 3) {
    pages = 0
  }
  pages++
}

// function playerInput(){
//   inputField = createInput();
//   inputField.position(width*2/6,height*3/4)

//   submitBttn = createButton("Send")
//   submitBttn.mousePressed(chat);
//   submitBttn.position(width*3/5,height*3/4)

//   keyPressed()
// }

function keyPressed() {
  if (keyCode == ENTER) {
    chat()
  }
}

function chat() {

  if (inputField.value()) {
    let input = inputField.value();
    if (pages == 1) {
      introBot.reply("local-user", input).then(respond);
    }
    else if (pages == 2) {
      characterBot.reply("locel-user", input).then(respond);
    }
    else if (pages == 3) {
      storyBot.reply("local-user", input).then(respond);

    }
    inputField.value("")
    indexResponses++
  }
}

function draw() {
  switch (pages) {
    case 0: mainGame()
      break;
    case 1: introPage()
      break;
    case 2: characterPage()
      break;
    case 3: storyPage()
      break;

  }

}
