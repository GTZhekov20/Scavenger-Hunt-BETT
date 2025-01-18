document.getElementById("submit").addEventListener("click", function () {
    const answer = document.getElementById("answer").value.trim().toLowerCase();
    const correctAnswer = "hi"; // Expected decoded answer
  
    if (answer === correctAnswer) {
      document.getElementById("popup").classList.remove("hidden");
    } else {
      alert("Incorrect! Try again.");
    }
  });
  
  function closePopup() {
    document.getElementById("popup").classList.add("hidden");
  }
  