const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
const choiceContainer1 = document.getElementById("choice-container1");
const choiceContainer2 = document.getElementById("choice-container2");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const allValues = JSON.parse(localStorage.getItem("values")) || [];
console.log(allValues);

const url = `https://opentdb.com/api.php?amount=${allValues.amount}&category=${allValues.category}&difficulty=${allValues.difficulty}&type=${allValues.type}`

let questions = [];

fetch(url)
.then(result => result.json())
.then(response => {
    console.log(response.results);
    questions = response.results.map(loadedQuestion =>{
        loadedQuestion.question
        const formattedQuestion = {
            question: loadedQuestion.question
        };
        const answerChoices = [... loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
        answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);
        
        answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index + 1)] = choice;
        });
        return formattedQuestion;
    });
    startGame();
})
.catch(err => console.log(error));


const CORRECT_BONUS = 1;
const MAX_QUESTIONS = allValues.amount;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    // console.log(availableQuestions);

    getNewQuestion();
    
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};



getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("end.html")
    }
    questionCounter++;
    progressText.innerText = `Question${questionCounter}/${MAX_QUESTIONS}`;
    // console.log((questionCounter / MAX_QUESTIONS) * 100);
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
        if(choice.innerText == "undefined") {
            choiceContainer1.classList.add("hidden");
        }else{
            choiceContainer1.classList.remove("hidden");
        }
        if(choice.innerText == "undefined") {
            choiceContainer2.classList.add("hidden");
        }else{
            choiceContainer2.classList.remove("hidden");
        }
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        //  console.log(e.target);
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        // console.log(selectedAnswer == currentQuestion.answer);
        
        const clasToAply = selectedAnswer == currentQuestion.answer ? "correct"
            : "incorrect";

            if (clasToAply === "correct") {
                incrementScore(CORRECT_BONUS);
            }

            selectedChoice.parentElement.classList.add(clasToAply);
            
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(clasToAply);
                getNewQuestion();
            }, 1000);
    });
});

incrementScore = num =>{
    score += num;
    scoreText.innerText = score;
}