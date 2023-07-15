// Function to change background color
function changeBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}

// Function to start the stopwatch
function startStopwatch() {
  var startTime = new Date().getTime();
  document.onkeydown = function(event) {
    if (event.keyCode === 32) { // Spacebar
      var endTime = new Date().getTime();
      var reactionTime = (endTime - startTime) / 1000; // in seconds
      reactionTimes3.push(reactionTime); // Store individual reaction time

      changeBackgroundColor('red'); // Change background color back to red
      document.onkeydown = null; // Disable further spacebar presses
      if (currentCountdownIndex < countdowns.length - 1) {
        currentCountdownIndex++;
        setTimeout(nextStep, intervalTimes[currentCountdownIndex] * 1000); // Wait for the next interval
      } else {
        finishTest();
      }
    }
  };
}

// Function to play the audio
function playAudio() {
  var audioPlayer = document.getElementById('audioPlayer');
  audioPlayer.play();
}

// Function to record reaction time and finish the test
function finishTest() {
  document.onkeydown = null; // Disable further key presses
  var total = reactionTimes3.reduce(function(a, b) { return a + b; }, 0);
  var average3 = total / reactionTimes3.length;
  console.log('Reaction Times:', reactionTimes3);
  console.log('Average Reaction Time:', average3.toFixed(3) + ' seconds');
  
  // Retrieve reaction times from local storage for the previous two trials
  var reactionTimes1 = JSON.parse(localStorage.getItem('reactionTimes1')) || [];
  var reactionTimes2 = JSON.parse(localStorage.getItem('reactionTimes2')) || [];

  var resultText = 'Average Reaction Time [AUDIO TEST WITH QUESTIONS]: ' + average3.toFixed(3) + ' seconds<br><br>';
  resultText += 'RESULTS AUTOMATICALLY RECORDED &#10003;<br><br>';
  resultText += 'THANK YOU FOR COMPLETING THE TEST!<br><br>';
  resultText += 'DO NOT REPEAT THE TEST<br><br>';
  resultText += 'Reaction Times [CONTROL]: ' + reactionTimes1.join(', ') + ' seconds<br><br>';
  resultText += 'Reaction Times [AUDIO TEST]: ' + reactionTimes2.join(', ') + ' seconds<br><br>';
  resultText += 'Reaction Times [AUDIO TEST WITH QUESTIONS]: ' + reactionTimes3.join(', ') + ' seconds<br><br>';

  document.getElementById('result').innerHTML = resultText;
  document.getElementById('result').style.color = "white";

  var practiceMessageBox = document.getElementById('practice-message-box');
  practiceMessageBox.style.display = 'none';

  var resultDiv = document.getElementById('result');
  resultDiv.style.display = 'block';

  // Stop the audio
  var audioPlayer = document.getElementById('audioPlayer');
  audioPlayer.pause();

  sendEmail(reactionTimes3); // Pass the reactionTimes array to the sendEmail function

  // Store the reactionTimes3 array in local storage
  localStorage.setItem('reactionTimes3', JSON.stringify(reactionTimes3));
}

// Function to record reaction time and finish the test
function finishTest() {
  document.onkeydown = null; // Disable further key presses
  var total = reactionTimes3.reduce(function(a, b) { return a + b; }, 0);
  var average3 = total / reactionTimes3.length;
  console.log('Reaction Times:', reactionTimes3);
  console.log('Average Reaction Time:', average3.toFixed(3) + ' seconds');


  var resultText = 'Average Reaction Time [AUDIO TEST WITH QUESTIONS]: ' + average3.toFixed(3) + ' seconds<br><br>';
  resultText += 'Reaction Times [AUDIO TEST WITH QUESTIONS]: ' + reactionTimes3.join(', ') + ' seconds<br><br>';
  resultText += 'RESULTS AUTOMATICALLY RECORDED &#10003;<br><br>';
  resultText += '<a class="control-link" href="quiz.html">FILL IN THE BLANK QUIZ</a>';
 
  

  document.getElementById('result').innerHTML = resultText;
  document.getElementById('result').style.color = "white";

  var practiceMessageBox = document.getElementById('practice-message-box');
  practiceMessageBox.style.display = 'none';

  var resultDiv = document.getElementById('result');
  resultDiv.style.display = 'block';

  // Stop the audio
  var audioPlayer = document.getElementById('audioPlayer');
  audioPlayer.pause();

  // Store the reactionTimes3 array in local storage
  localStorage.setItem('reactionTimes3', JSON.stringify(reactionTimes3));
}


// Global variables
var reactionTimes3 = [];
var countdowns = [5.1, 3.6, 3.2, 8.3, 7.2, 3.2, 2.7, 2.5, 3.4, 1];
var intervalTimes = [4.1, 2.1, 2.4, 3.7, 4.2, 2.3, 3.1, 2.1, 1.5, 3.1];
var currentCountdownIndex = 0;

// Set initial background color to red
changeBackgroundColor('red');

// Function to handle each step of the test
function nextStep() {
  // Change background color to green
  changeBackgroundColor('green');
  // Start the stopwatch
  startStopwatch();
}

// Event listener for key presses
document.onkeydown = function(event) {
  if (event.keyCode === 81) { // "Q" key
    // Hide the instructions element
    var instructionsElement = document.getElementById('instructions');
    instructionsElement.style.display = 'none';

    // Hide the header element
    var headerElement = document.getElementById('header');
    headerElement.style.display = 'none';

    // Display the practice test message
    var practiceElement = document.getElementById('practice-message');
    practiceElement.style.display = 'block';

    // Play the audio
    playAudio();

    // Start the countdown
    var countdown = countdowns[currentCountdownIndex];
    setTimeout(nextStep, countdown * 1000);
  }
};
