const questions = [
  {
    question: "What tool can place or destroy blocks automatically?",
    answers: ["agent", "the agent"],
    concept: "minecraft coding",
    image: "images/mc1.png"
  },
  {
    question: "Which block is used to store information like score or level?",
    answers: ["variable", "variables"],
    concept: "variables",
    image: "images/mc2.png"
  },
  {
    question: "Which block runs code a fixed number of times?",
    answers: ["repeat", "for loop", "loop"],
    concept: "loops",
    image: "images/mc3.png"
  },
  {
    question: "Which block checks a condition, such as if the player is holding an item?",
    answers: ["if", "if block", "conditional"],
    concept: "conditionals",
    image: "images/mc4.png"
  },
  {
    question: "Which coding concept helps the game behave differently depending on the player's action?",
    answers: ["conditional", "if", "if-else","selection"],
    concept: "conditionals",
    image: "images/mc6.png"
  },
  {
    question: "Which function gives a surprise number or result?",
    answers: ["random", "pick random"],
    concept: "randomisation",
    image: "images/mc5.png"
  },
  {
    question: "What does this loop do 10 times?",
    answers: ["place block", "places a block", "build", "places dirt blocks","place a block"],
    concept: "loops",
    image: "images/mc7.png"
  },
  {
    question: "What happens if the player is touching gold?",
    answers: ["win", "you win", "you win!", "say you win!" "say you win", "add score"],
    concept: "conditionals",
    image: "images/mc8.png"
  },
  {
    question: "What happens when you use 'set variable to random 1 to 5'?",
    answers: ["random number", "gets a random number", "sets variable randomly", "sets a random number between 1 and 5","picks a random number"],
    concept: "randomisation",
    image: "images/mc9.png"
  },
  {
    question: "Which concept lets you remember and change values like lives or time?",
    answers: ["variables", "variable"],
    concept: "variables",
    image: "images/mc10.png"
  }
];

const conceptWWW = {
  "minecraft coding": "You understand how to use Minecraft coding tools like the Agent.",
  "variables": "You can use variables to store and update information in your game.",
  "loops": "You understand how to repeat actions using loops.",
  "conditionals": "You can use if/if-else statements to make decisions in your code.",
  "randomisation": "You know how to use random values to add unpredictability to your game."
};

const conceptEBI = {
  "minecraft coding": "Practise using the Agent to place and destroy blocks with precision.",
  "variables": "Revisit how to create, update and display variables like score or lives.",
  "loops": "Review how to use 'repeat' blocks to control how many times code runs.",
  "conditionals": "Revisit how 'if' statements check conditions and run code when true.",
  "randomisation": "Practise using 'pick random' blocks and applying them in decision making."
};

const challengeTasks = {
  "minecraft coding": "CHALLENGE: Use the Agent to build a house or dig a tunnel automatically.",
  "variables": "CHALLENGE: Create a variable that tracks how many times a player jumps.",
  "loops": "CHALLENGE: Use a loop to place torches every 5 blocks in a line.",
  "conditionals": "CHALLENGE: Make your game say 'You're safe!' only if the player wears diamond armour.",
  "randomisation": "CHALLENGE: Use a random block to spawn a different mob each time a button is pressed."
};

let currentQuestion = 0;
let score = 0;
let correctConcepts = [];
let incorrectConcepts = [];

const questionText = document.getElementById("question-text");
const answerInput = document.getElementById("answer-input");
const submitBtn = document.getElementById("submit-btn");
const feedback = document.getElementById("feedback");
const questionImage = document.getElementById("question-image");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const scoreDisplay = document.getElementById("score");
const wwwList = document.getElementById("www-list");
const ebiList = document.getElementById("ebi-list");
const challengeList = document.getElementById("challenge-list");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = `Q${currentQuestion + 1}: ${q.question}`;
  answerInput.value = "";
  feedback.textContent = "";
  questionImage.src = q.image || "";
}

submitBtn.addEventListener("click", () => {
  const q = questions[currentQuestion];
  const userAnswer = answerInput.value.trim().toLowerCase();

  if (q.answers.some(ans => userAnswer === ans.toLowerCase())) {
    feedback.textContent = "Correct!";
    score++;
    if (!correctConcepts.includes(q.concept)) correctConcepts.push(q.concept);
  } else {
    feedback.textContent = `Incorrect. The correct answer was: ${q.answers[0]}`;
    if (!incorrectConcepts.includes(q.concept)) incorrectConcepts.push(q.concept);
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    setTimeout(() => loadQuestion(), 1000);
  } else {
    setTimeout(() => showResults(), 1000);
  }
});

function showResults() {
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";
  scoreDisplay.textContent = `You got ${score} out of ${questions.length}.`;

  (correctConcepts.length > 0 ? correctConcepts.slice(0, 3) : ["none"]).forEach(concept => {
    const li = document.createElement("li");
    li.textContent = conceptWWW[concept] || "You gave it a go! Keep practising.";
    wwwList.appendChild(li);
  });

  (incorrectConcepts.length > 0 ? incorrectConcepts.slice(0, 3) : ["none"]).forEach(concept => {
    const li = document.createElement("li");
    li.textContent = conceptEBI[concept] || "Well done! Review any concepts you found tricky.";
    ebiList.appendChild(li);
  });

  if (incorrectConcepts.length > 0) {
    incorrectConcepts.slice(0, 2).forEach(concept => {
      const li = document.createElement("li");
      li.textContent = challengeTasks[concept];
      challengeList.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.textContent = "You got full marks – try designing your own quiz using MakeCode!";
    challengeList.appendChild(li);
  }
}

loadQuestion();