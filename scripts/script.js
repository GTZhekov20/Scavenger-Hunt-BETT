// Load and validate the task based on URL parameters
function loadTaskFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const taskId = parseInt(urlParams.get("task"), 10);
  const providedToken = urlParams.get("token");

  // Find the task based on taskId
  const task = tasks.find(t => t.id === taskId);

  // If no task is found or the token is invalid, redirect to the main page
  if (!task || task.token !== providedToken) {
    alert("Invalid task or token! Redirecting to the main page.");
    window.location.href = "../index.html";
    return null;
  }

  // Prompt the user for the activation code
  const userActivationCode = prompt(`Enter the activation code for ${task.title}:`);
  if (userActivationCode !== task.activationCode) {
    alert("Incorrect activation code! Please try again.");
    window.location.href = location.href;
    return null;
  }

  return task;
}

// Check the submitted answer
function handleSubmit(task) {
  document.getElementById("submit").addEventListener("click", function () {
    let isCorrect = false;

    // For multiple-choice tasks
    if (task.options) {
      const selectedOption = document.querySelector('input[name="answer"]:checked');
      if (selectedOption) {
        isCorrect = parseInt(selectedOption.value, 10) === task.correctOption;
      } else {
        alert("Please select an answer!");
        return;
      }
    } else {
      // For text-input tasks
      const answer = document.getElementById("answer").value.trim().toLowerCase();
      isCorrect = answer === task.answer.toLowerCase();
    }

    // Handle correct or incorrect answers
    if (isCorrect) {
      closePopup('correct');
    } else {
      closePopup('wrong')
    }
  });
}

function closePopup(type) {
  document.getElementById('popup').classList.add('hidden');
  if(type === 'correct'){
    www.location.href = '../task-completed.html';
    localStorage.setItem('taskId', taskId);
  }
}

// Main function to initialize the task
function initializeTask() {
  const task = loadTaskFromURL();
  handleSubmit(task);
}

// Run the initialization when the page loads
document.addEventListener("DOMContentLoaded", initializeTask);
