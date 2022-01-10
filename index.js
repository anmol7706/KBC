// Dom elements


let countdown = document.getElementById("timer");
let question_display = document.getElementById("question_display");
let optionA_display = document.getElementById("optionA_display");
let optionB_display = document.getElementById("optionB_display");
let optionC_display = document.getElementById("optionC_display");
let optionD_display = document.getElementById("optionD_display");
let time = 20;
let index = 0;
let all_options = document.querySelectorAll("[data-options]");
let submit_btn = document.getElementById("submit_btn");
let start_btn = document.getElementById("start_btn");
let screen = document.getElementById("main");
let lose_text = document.getElementById("lose");
let restart = document.getElementById("restart");
let lose1 = false;
let lose2 = false;
let win = false;

// For restarting the game

function res_func(){
    location.reload();
}

restart.addEventListener("click" , res_func);

// starting the game function

function start_game() {
    screen.classList.add("show");
    start_btn.remove();
    let x = setInterval(function () {
        countdown.innerText = time;
        time--;
        if (time == -1) {
            countdown.innerText = "You Lose";
            clearInterval(x);
            lose1 = true;
            lose2 = false;
            win = false;
            endgame(lose1, lose2, win)
        }
    }, 1000);
}

//Ending the Game function

function endgame(lose_1, lose_2, win_1) {
    if (lose_1 == true && (lose_2 && win_1) == false) {
        screen.classList.remove("show");
        lose_text.innerHTML = "You Lose ! <br><br> You Ran Out Of Time Better Luck Next Time";
        restart.classList.add("show");
    }
    else if( (lose_1 && lose_2) == false && win_1 ==true){
        screen.classList.remove("show");
        lose_text.innerHTML = "You Won The Game <br> <br> Congratulation!!!";
        restart.classList.add("show");
    }
    else if( (lose_1 && win_1) == false && lose_2 ==true){
        screen.classList.remove("show");
        lose_text.innerHTML = "You Lose!! <br> <br> You Gave The Wrong Answer";
        restart.classList.add("show");
    }
}

//adding event listener to start button and calling the start game function

start_btn.addEventListener("click", start_game)


// fetching questions.json  

fetch("questions.json")
    .then(response => {
        return response.json()
    }
    )
    .then(data => {
        print_ques(data, index); //  calling the print_ques function and passing the fetched data and initial index to the print_ques function
    });

function print_ques(files, i) {
    question_display.innerText = files[i].question;
    optionA_display.innerText = files[i].options.option1;
    optionB_display.innerText = files[i].options.option2;  // updating innertext of the buttons and question span tag and showing it on the browser screen 
    optionC_display.innerText = files[i].options.option3;
    optionD_display.innerText = files[i].options.option4;
    for (items of all_options) {
        items.addEventListener("click", (e) => {            // adding event listener click to all the options button
            option_txt = e.target.innerText;                      
            if (option_txt == files[i].correctoption && i < 9) {
                console.log(option_txt);
                print_ques(files, i + 1);                       
                time = 20;
            }
            else if (i == 9 && option_txt == files[i].correctoption) {
                console.log(option_txt)
                lose1 = false;
                lose2 = false;
                win = true;
                endgame(lose1 , lose2 , win)          // calling endgame function and passing appropriate arguments
            }
            else{
                lose1 = false;
                lose2 = true;
                win = false;
                endgame(lose1 , lose2 , win)
            }
        })
    }
}
