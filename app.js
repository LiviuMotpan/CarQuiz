const start = document.querySelector("#start");
const startBtn = document.querySelector("#start-btn");
const quiz = document.querySelector("#quiz");
const quizContent = document.querySelector("#quiz-content");
const correct = document.querySelector("#correct");
const wrong = document.querySelector("#wrong");
const score = document.querySelector("#score");
const progressBar = document.querySelector("#progress-bar");
const timer = document.querySelector("#timer");
const timerRanOut = document.querySelector("#timer-ran-out");

const questions = [
    {
        q: "What car brand is this?",
        img: "q1.jpg",
        options: ["BMW", "Mercedes-Benz", "Audi", "Volkswagen"],
        correct: "Mercedes-Benz"
    },
    {
        q: "In what country is this car manufactured?",
        img: "q2.jpg",
        options: ["Germany","China","India","USA"],
        correct: "USA"
    },
    {
        q: "What Tesla model is this?",
        img: "q3.jpg",
        options: ["S","3","X","Y"],
        correct: "S"
    }
];

let gameStarted = false;
let questionNumber = 0;
let correctAns = 0;
let timerValue = 10;

startBtn.addEventListener("click",(e)=> {
    gameStarted = true;
    start.style.display = "none";
    showQuestion(questions[questionNumber])
})

function showQuestion(q) {
    timer.innerHTML = `<p>10 s</p>`
    timerValue = 10;
    timer.style.display = "flex";
    progressBar.firstElementChild.style.width = `${Math.round((questionNumber+1)/questions.length*100)}%`;
    progressBar.style.display = "flex";
    quiz.style.display = "flex";
    quizContent.innerHTML = `
        <img src="images/${q.img}" alt="Quiz Image">
        <h1>${q.q}</h1>
    `;
    let optionsBtn = document.createElement("div");
    optionsBtn.classList.add("options");
    q.options.forEach(option=> {
        let op = document.createElement('button');
        op.classList.add("option");
        op.innerHTML = `${option}`;
        optionsBtn.appendChild(op);
    })
    quizContent.appendChild(optionsBtn);

    let options = document.querySelectorAll(".option");
    let interval = setInterval(()=> {
        if(timerValue > 0) {
            timerValue-=1;
            timer.innerHTML = `<p>${timerValue} s</p>`;
        }else {
            clearInterval(interval);
            checkAnswer("",q.correct);
        }
    },1000)
    options.forEach(op=> op.addEventListener("click",()=> {
        clearInterval(interval);
        checkAnswer(op.textContent,q.correct)
    }))
}

function checkAnswer(response,correctAnswer) {
    
    if(response === correctAnswer) {
        correct.style.display = "flex";
        correctAns++;
    }else if(response == "") {
        timerRanOut.style.display = "flex";
    }else {
        wrong.style.display = "flex";
    }
    setTimeout(()=> {
        if(questionNumber < questions.length-1) {
            showQuestion(questions[++questionNumber]);
        }else {
            timer.innerHTML = ""
            quizContent.innerHTML = ``;
            quizContent.style.display = "none";
            progressBar.style.display = "none";
            timerRanOut.style.display = "none";
            timer.style.display = "none";
            let correctPercentage = Math.round(correctAns/questions.length*100);
            score.innerHTML = `
                <p>Quiz Completed !</p>
                <h1>${correctPercentage < 50 ? "You could've done even better": correctPercentage < 75 ? "Good Joob" : "Very well done"}</h1>
                <h3>${correctAns} correct out of ${questions.length}</h3>
                <button id="retry">Retry the quiz</button>
            `;
            let retry = document.getElementById("retry");
            retry.addEventListener("click",()=> {  
                location.reload();
            })
        }
        wrong.style.display = "none";
        correct.style.display = "none";
    },3000);
}