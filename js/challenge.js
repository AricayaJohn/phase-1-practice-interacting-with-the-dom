//global variable set up from index.html
const counter = document.getElementById("counter")
const minusButton = document.getElementById("minus")
const plusButton = document.getElementById("plus")
const heartButton = document.getElementById("heart")
const pauseButton = document.getElementById("pause")
const commentList = document.getElementById("list");
const likes = document.querySelector(".likes")
const commentForm = document.getElementById("comment-form")
const commentInput = document.getElementById("comment-input")
let count = 0
let paused = false;
let intervalID;

plusButton.addEventListener("click", incrementCounter);
minusButton.addEventListener("click", decrementCounter);
heartButton.addEventListener("click", addlike);
commentForm.addEventListener("submit", addComment);
pauseButton.addEventListener("click", function(){
    paused = !paused;
    if (paused) {
        pauseCounter();
    }
});
//Functions
// - See the timer increment every second once the page has loaded.
function counterValue () {
    counter.innerText = count;
}
function startCounter () {
    intervalID = setInterval(incrementCounter, 1000);
}

// - Manually increment and decrement the counter using the plus and minus buttons.
function incrementCounter() {
    count++;
    counterValue();
}
function decrementCounter() {
    count--;
    counterValue();
}
// - "Like" an individual number of the counter. I should see the count of the
//   number of "likes" associated with that number displayed.
function addlike() {
    const li = document.createElement("li");
    li.innerText = `${count} has been liked 1 time`
    likes.appendChild(li);
}

// - Pause the counter, which should:
//   - pause the counter
//   - disable all buttons except the pause button
//   - switch the label on the button from "pause" to "resume"
// - Click the "resume" button to restart the counter and re-enable the buttons.
function pauseCounter () {
    clearInterval(intervalID);
    disableButtons();
  pauseButton.innerText = "Resume";
  pauseButton.removeEventListener("click", pauseCounter);
  pauseButton.addEventListener("click", resumeCounter);
}

function resumeCounter() {
  enableButtons();
  pauseButton.innerText = "Pause";
  pauseButton.removeEventListener("click", resumeCounter);
  pauseButton.addEventListener("click", pauseCounter);
  startCounter();
}

function disableButtons() {
  minusButton.disabled = true;
  plusButton.disabled = true;
  heartButton.disabled = true;
}

function enableButtons() {
  minusButton.disabled = false;
  plusButton.disabled = false;
  heartButton.disabled = false;
}

// - Leave comments on my gameplay, such as: "Wow, what a fun game this is."
function addComment(e) {
    e.preventDefault();
    const p = document.createElement("p");
    p.innerText = commentInput.value;
    commentList.appendChild(p)
}
startCounter();