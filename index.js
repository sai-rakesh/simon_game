// initializing the level
var level=1;
// creating the array of colors
var buttonColor=["green","red","yellow","blue"];
// creating a empty array for userclicked patter
var userClickedPattern = [];
// random pattern generated array
var gamePattern=[];
// New sequence function
function newSequence(){
  $("h2").hide();
  // When ever a newSequence is genarated the userClickedPattern must be empty
  userClickedPattern=[];
  // Random number is generated from 0-3 to select the color from the button-color array
  var randomNumber= Math.floor(Math.random()*4);
  var randomColorChosen = buttonColor[randomNumber];
  // push the new color to the gamePattern
  gamePattern.push(randomColorChosen);
  //click animation
  $("#"+randomColorChosen).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  //soundtrack
  soundTrack(randomColorChosen);
}
// Button clicked
$(".btn").click(function(){
  // setting the button color to new variable by using this. method
  var userChosenColor = $(this).attr("id");
  // pushing it to the userClicked Pattern array
  userClickedPattern.push(userChosenColor);
  // Playing the soundtrack by using track function
  soundTrack(userChosenColor);
  animatePress(userChosenColor);
  // To check the answer we are go to pass the userClickedPattern.length-1 as parameter
  checkAnswer(userClickedPattern.length-1);
})
function checkAnswer(currentLevel){
  // first checking wheather the index at current userClickedPattern and gamePattern are same or not
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
      //checking the length of both the clickpattern and gamePattern
      if(userClickedPattern.length===gamePattern.length){
        // Increasing the length
        level++;
        //setting the h1 accordingly
        $('h1').text('Level '+level);
        // going back to the new sequence
        setTimeout(newSequence,1000);
      }
    }
    else{
      // failing functions
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},150)
    $("h1").text("Game Over, Press Any Key to Restart");
    $("h2").toggle();
    level=1;
    gamePattern=[];
  }
}
function animatePress(currentColor){
  // button clicked pressed animation
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){$("#"+currentColor).removeClass("pressed");}, 100);
}
function soundTrack(randomColorChosen){
  // sound track setting
    var audio = new Audio('sounds/'+randomColorChosen+'.mp3');
    audio.play();
}
// click any button for desktops or laptops
$(document).keypress(function(){
  $("h1").text("Level "+level);
  newSequence();
})
// click here button for smart phones
if($('h1').text()==="Press A Key to Start"){
$('h2').click(function(){
  $("h1").text("Level "+level);
  newSequence();
})
}
