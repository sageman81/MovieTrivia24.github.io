document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const gameContainer = document.getElementById('trivia');
    const startScreen = document.getElementById('startScreen');
    const questionEl = document.getElementById('question');
    const answerButtons = document.querySelectorAll('.answer');
    const pointsEl = document.getElementById('pointsCounter');
    const feedbackEl = document.getElementById('feedback');
    const timerDisplay = document.getElementById('timerDisplay');
    const questionImage = document.getElementById('questionImage');
    const restartButton = document.getElementById('restartButton');

    let points = 0;
    let timer;
    let timeLeft = 30;
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
    
        },
        {
            question: "What phrase does RoboCop frequently say after apprehending a suspect?",
            answers: ["You have the right to remain silent.", "Hasta la vista, baby.", "I'll be back.", "Dead or alive, you're coming with me."],
            correctAnswer: "Dead or alive, you're coming with me.",
            image: "https://miro.medium.com/v2/resize:fit:996/1*vEEVsy9MyqiuGoZpVhveqw.jpeg"
        },

        {
            question: "What is the name of the resistance leader fighting against the Mars administration in 'Total Recall'?",
            answers: ["Cohaagen", "Kuato", "Richter", "Melnik"],
            correctAnswer: "Kuato",
            image: "https://images.squarespace-cdn.com/content/v1/576a19ba46c3c4a46ff5bb79/df4ff442-072f-46e6-96e5-0140f0c31da4/Kuato.jpg"
        },

        {
            question: "In which city does Blade Runner take place?",
            answers: ["Los Angeles", "New York", "Tokyo", "Kyoto"],
            correctAnswer: "Los Angeles",
            image: "https://flicknerd.com/wp-content/uploads/2023/10/mv5bmtc1nda0mdu5of5bml5banbnxkftztcwotq3ndu4mw4040._v1_.jpg?w=1000&h=700&crop=1"
        },


        {
            question: "What is the name of Superman’s biological father?",
            answers: ["Zod", "Jor-El", "Kal-El", "Non"],
            correctAnswer: "Jor-El",
            image: "https://comiczombie.net/wp-content/uploads/2015/10/superman-the-movie-1978-marlon-brando-as-jor-el-sentences-general-zod-non-and-ursa.jpg"
        },


        {
            question: "Who composed the iconic score for the 1989 'Batman' movie?",
            answers: ["John Williams", "Hans Zimmer", "Danny Elfman", "James Horner"],
            correctAnswer: "Danny Elfman",
            image: "https://i.ytimg.com/vi/t2CjYRuSB3U/sddefault.jpg"
        }


    ];

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);

    function startGame() {
        points = 0;
        currentQuestionIndex = 0;
        startScreen.style.display = 'none';
        gameContainer.style.display = 'block';
        setQuestion();
        updatePointsDisplay();
    }

    function setQuestion() {
        resetState();
        const currentQuestion = questions[currentQuestionIndex];
        questionEl.textContent = currentQuestion.question;
        questionImage.src = currentQuestion.image;

        feedbackEl.textContent = '';
        
        answerButtons.forEach((button, index) => {
            button.style.display = 'block'; // Ensure all buttons are visible
            if (index < currentQuestion.answers.length) {
                button.textContent = currentQuestion.answers[index];
                button.onclick = function() {
                    handleAnswerClick(currentQuestion.answers[index], currentQuestion.correctAnswer);
                };
            } else {
                button.style.display = 'none'; // Hide unused buttons
            }
        });
        startTimer();
    }

    function handleAnswerClick(selectedAnswer, correctAnswer) {
        if (!hasAnswered) {
            selectAnswer(selectedAnswer, correctAnswer);
            hasAnswered = true;
            answerButtons.forEach(btn => btn.disabled = true);
        }
    }

    function selectAnswer(selectedAnswer, correctAnswer) {
        const isCorrect = selectedAnswer === correctAnswer;
        points += isCorrect ? 1 : 0; // Modify as needed if negative points are desired
        feedbackEl.textContent = isCorrect ? "Correct!" : "Incorrect!";
        updatePointsDisplay();
        setTimeout(moveToNextQuestion, 2000);
    }

    function moveToNextQuestion() {
        if (currentQuestionIndex + 1 < questions.length) {
            currentQuestionIndex++;
            setQuestion();
        } else {
            endGame();
        }
    }

    function resetState() {
        clearInterval(timer);
        hasAnswered = false;
        timeLeft = 30;
        updateTimerDisplay();
        answerButtons.forEach(btn => btn.disabled = false);
    }

    function startTimer() {
        timer = setInterval(function() {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                feedbackEl.textContent = "Time's up!";
                moveToNextQuestion();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        timerDisplay.textContent = `${timeLeft} seconds`;
    }

    function updatePointsDisplay() {
        pointsEl.textContent = `Points: ${points}`;
    }

    function endGame() {
        clearInterval(timer);
        gameContainer.style.display = 'none';
        document.getElementById('summaryScreen').style.display = 'flex';
        document.getElementById('finalScore').textContent = `Your final score: ${points}`;
        document.getElementById('correctAnswers').textContent = 'Correct answers: ' + calculateCorrectAnswers();
    }

    function calculateCorrectAnswers() {
        return questions.reduce((acc, question) => acc + (question.userAnswer === question.correctAnswer ? 1 : 0), 0);
    }

    function restartGame() {
        points = 0;
        currentQuestionIndex = 0;
        hasAnswered = false;
        document.getElementById('summaryScreen').style.display = 'none';
        startGame();  // Directly start the game again
    }
});


