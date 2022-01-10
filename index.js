let countdown = document.getElementById("timer");
let question_display = document.getElementById("question_display");
let optionA_display = document.getElementById("optionA_display");
let optionB_display = document.getElementById("optionB_display");
let optionC_display = document.getElementById("optionC_display");
let optionD_display = document.getElementById("optionD_display");
let time = 20;
let all_options = document.querySelectorAll("[data-options]");
let index = 0;
var choosed =null;
var correct=null;




function next_ques(file, i) {
    i++;
    question_display.innerText = file[i].question;
    optionA_display.innerText = file[i].options.option1;
    optionB_display.innerText = file[i].options.option2;
    optionC_display.innerText = file[i].options.option3;
    optionD_display.innerText = file[i].options.option4;
    check(file, i)
}


function check(file, i) {
    for (items of all_options) {
            items.addEventListener("click", (event) => {
                let option_text = event.target.innerText;
                console.log(option_text);
                if (option_text == file[i].correctoption) {
                    console.log("Bahut Badhiya");
                    if (i < 9) {
                        next_ques(file, i);
                    }
                    time = 20;
                    console.log(i);
                }
                // else {
                //     console.log("else");
                //     // end_game();
                // }
            })
        console.log(items);
    }
}

// document.getElementById("xyz").addEventListener("click",()=>{
// if(choosed){
//     if(choosed==correct){
//         alert("great");
//         next_ques(  )
//     }
// }
// })

// function check(file , i){
//     correct=file[i].correctoption;
//     for(item in all_options){
//         item.addEventListener("click",(e)=>{
//             choosed = e.target.innerText;
//         })
//     }
// }

function print_ques(file, i) {
    question_display.innerText = file[i].question;
    optionA_display.innerText = file[i].options.option1;
    optionB_display.innerText = file[i].options.option2;
    optionC_display.innerText = file[i].options.option3;
    optionD_display.innerText = file[i].options.option4;
}



// when used data() instead of json() it gave reference error saying data is not a function
// curly braces inside first then did'nt passed the value to next then it show undefined in console

fetch("questions.json")
    .then(response => {
        return response.json()
    }
    )
    .then(data => {
        let x = setInterval(function () {
            countdown.innerText = time;
            time--;
            if (time == -1) {
                countdown.innerText = "You Lose";
                clearInterval(x);
                // endgame()
            }
        }, 1000);

        print_ques(data, index);
        check(data, index);
    });