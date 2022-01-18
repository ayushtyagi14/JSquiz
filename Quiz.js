(function () {
    function buildQuiz() {
        const output = [];         // Variable to store HTML output

        myQuestions.forEach(
            (currentQuestion, questionNumber) => {                               // For Each Questions.....
                const answers = [];     // For store list of possible answers

                for (letter in currentQuestion.answers) {  // For each available answer
                    answers.push(
                        `<label>
                     <input type="radio" name="question${questionNumber}" value="${letter}">
                     ${letter} :
                     ${currentQuestion.answers[letter]}
                    </label>`
                    );
                }

                output.push(
                    `<div class="slide">
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>
                </div>`
                );
            }
        )

        quizContainer.innerHTML = output.join('');           // Combine the output list into one string of HTML
    }

    var timeLeft = 30;
    var elem = document.getElementById('some_div');

    var timerId = setInterval(countdown, 1000);

    function countdown() {
        if (timeLeft == -1) {
            clearTimeout(timerId);
            doSomething();
        } else {
            elem.innerHTML = timeLeft + ' seconds remaining';
            timeLeft--;
        }
    }

    function showResult() {
        const answerContaniers = quizContainer.querySelectorAll('.answers');

        let numCorrect = 0;

        myQuestions.forEach(
            (currentQuestion, questionNumber) => {
                const answerContanier = answerContaniers[questionNumber];
                const selector = `input[name=question${questionNumber}]:checked`;
                const userAnswer = (answerContanier.querySelector(selector) || {}).value;

                if (userAnswer === currentQuestion.correctAnswer) {
                    numCorrect++;

                    answerContaniers[questionNumber].style.color = 'lightgreen';
                }
                else {
                    answerContaniers[questionNumber].style.color = 'red';
                }
            }
        )

        resultContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

    function showSlide(n) {

        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if (currentSlide === 0) {
            previousButton.style.display = 'none';
        }
        else {
            previousButton.style.display = 'inline-block';
        }
        if (currentSlide === slides.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block'
        }
        else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    const quizContainer = document.getElementById("quiz")
    const resultContainer = document.getElementById("result")
    const submitButton = document.getElementById("submit")

    const myQuestions = [
        {
            question: "Javascript is an _______ language?",
            answers: {
                a: "Object-Oriented",
                b: "Object-Based",
                c: "Procedural",
                d: "None of the above"
            },
            correctAnswer: "a"
        },
        {
            question: "Which of the following keywords is used to define a variable in Javascript?",
            answers: {
                a: "var",
                b: "let",
                c: "Both a and b",
                d: "None of the above"
            },
            correctAnswer: "c"
        },
        {
            question: "Which of the following methods is used to access HTML elements using Javascript?",
            answers: {
                a: "getElementById()",
                b: "getElementByClassName()",
                c: "Both a and b",
                d: "None of the above"
            },
            correctAnswer: "c"
        },
    ];


    buildQuiz()   // display quiz right away

    // Pagination

    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide")
    let currentSlide = 0;

    showSlide(currentSlide)

    submitButton.addEventListener("click", showResult);
    previousButton.addEventListener("click", showPreviousSlide)
    nextButton.addEventListener("click", showNextSlide)
})();
