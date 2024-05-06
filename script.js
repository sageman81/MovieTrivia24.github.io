document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const gameContainer = document.getElementById('trivia'); // Corrected typo
    const startScreen = document.getElementById('startScreen');
    const questionEl = document.getElementById('question');
    const answerButtons = document.querySelectorAll('.answer'); // Corrected to select all answer buttons
    const pointsEl = document.getElementById('pointsCounter');
    const feedbackEl = document.getElementById('feedback');
    const timerDisplay = document.getElementById('timerDisplay');
    const questionImage = document.getElementById('questionImage');

    let points = 0;
    let timer;
    let timeLeft = 30; // Corrected typo
    let currentQuestionIndex = 0;
    let hasAnswered = false;

   
        let questions = [
            {
                question: "What year was the Godfather released?",
                answers: ["1969", "1972", "1978", "1980"],
                correctAnswer: "1972",
                image: "https://images5.alphacoders.com/615/615040.jpg" //place gf image here
            },
        
            {
                question: "Who directed 'Pulp Fiction'?",
                answers: ["Steven Spielberg", "James Cameron", "Martin Scorcesse", "Quentin Tarantino"],
                correctAnswer: "Quentin Tarantino",
                image: "https://filmcolossus.com/wp-content/uploads/2023/05/VideoScreenshot-File1Jz369WSLD80-Vidcloud-6542-e1684891485948.jpg"//pulp fiction image
            },
        
            {
                question: "What does Jack Burton like to say in 'Big Trouble in Little China'?",
                answers: ["It's all in the reflexes.", "I love the smell of Napalm in the morning.", "All work and no play makes Jack a dull boy.", "I'm too old for this..."],
                correctAnswer: "It's all in the reflexes.",
                image: "https://worldfilmgeek.files.wordpress.com/2019/04/bigtroubleinlittlechina-still.jpg"
            },
        
            {
                question: "What is Darth Vader's famous line from 'The Empire Strikes Back'?",
                answers: ["Luke, I am your father.", "Luke, I'm your father.", "No, I am your father.", "I ain't your daddy!"],
                correctAnswer: "No, I am your father.",
                image: "https://images6.alphacoders.com/584/584828.jpg"
            },
        
            {
                question: "Who was almost cast to star in the Terminator before Arnold Schwarzenegger got the role?",
                answers: ["Sylvester Stallone", "Jean-Claude Van Damme", "O.J. Simpson", "Hulk Hogan"],
                correctAnswer: "O.J. Simpson",
                image: "https://images.squarespace-cdn.com/content/v1/59e512ddf43b55c29c71b996/3f10e1fc-e608-49af-86ce-b86d7ccadf73/TERMSE_SIDEA-22.jpg?format=1500w"
        
            }
        ];
    
   

    function startGame() {
        points = 0; // Reset points
        currentQuestionIndex = 0; // Reset question index
        startScreen.style.display = 'none';
        gameContainer.style.display = 'block';
        setQuestion();
        updatePointsDisplay();
    }

    function setQuestion() {
        resetState(); // Reset game state, including clearing the timer and setting `hasAnswered` to false.
        let currentQuestion = questions[currentQuestionIndex];
        questionEl.textContent = currentQuestion.question;
        questionImage.src = currentQuestion.image;
    
        answerButtons.forEach((button, index) => {
            button.classList.remove('hide'); // Ensure all buttons are visible.
            if (index < currentQuestion.answers.length) {
                button.textContent = currentQuestion.answers[index];
                button.disabled = false; // Re-enable the button for the new question.
                button.onclick = () => {
                    if (!hasAnswered) {
                        selectAnswer(currentQuestion.answers[index], currentQuestion.correctAnswer);
                        hasAnswered = true; // Prevent further answers until the next question.
                        answerButtons.forEach(btn => btn.disabled = true); // Disable further clicks.
                    }
                };
            } else {
                button.classList.add('hide'); // Hide extra buttons if not needed.
            }
        });
        startTimer(); // Start the countdown for the new question.
    }
    

    function showQuestion(question) {
        questionEl.textContent = question.question;
        questionImage.src = question.image;
        answerButtons.forEach((button, index) => {
            if (question.answers[index]) {
                button.textContent = question.answers[index];
                button.classList.remove('hide');
                button.onclick = () => selectAnswer(question.answers[index], question.correctAnswer);
            } else {
                button.classList.add('hide'); // Hide extra buttons if not needed
            }
        });
        startTimer();
    }

    function resetState() {
        clearInterval(timer);
        feedbackEl.textContent = '';
        hasAnswered = false; // Allow answering for the new question.
        timeLeft = 30;
        updateTimerDisplay();
        // No need to disable buttons here; they will be re-enabled in setQuestion.
    }
    

    function selectAnswer(selectedAnswer, correctAnswer) {
        let isCorrect = selectedAnswer === correctAnswer;
        points += isCorrect ? 1 : Math.max(0, points - 1); // Update points correctly
        feedbackEl.textContent = isCorrect ? "Correct! Your points: " + points : "Incorrect! You lost a point! Your points: " + points;
        updatePointsDisplay();
        setTimeout(moveToNextQuestion, 2000); // Wait 2 seconds before moving to the next question
    }
    

    function moveToNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            setQuestion();
        } else {
            endGame();
        }
    }

    function startTimer() {
        updateTimerDisplay();
        timer = setInterval(function() {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                feedbackEl.textContent = "Time's up!";
                setTimeout(moveToNextQuestion, 2000);
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        timerDisplay.textContent = timeLeft;
    }

    function updatePointsDisplay() {
        pointsEl.textContent = 'Points: ' + points;
    }

    function endGame() {
        alert("Quiz complete! Total Score: " + points);
        startScreen.style.display = 'flex';
        gameContainer.style.display = 'none';
        // Reset game to start or display a final screen
    }

    startButton.addEventListener('click', startGame);
});
