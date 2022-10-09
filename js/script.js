const addButton = document.getElementById("add-book");
const submitButton = document.getElementById("form-submit");
const formLayer = document.querySelector(".book-form");
// buttons.forEach((button)=>{
//     if(button.id == "add-book"){
//         button.addEventListener("click",(e)=>{
//             clickAnimation(button);
//             displayFormLayer(button);
//         }) 
//     }
//     if(button.id == "form-submit"){
//         button.addEventListener("")
//     }    
// })

addButton.addEventListener("click",()=>{buttonFunction(addButton)});
submitButton.addEventListener("submit",()=>buttonFunction(submitButton));

function buttonFunction(button){
    clickAnimation(button);
    displayFormLayer(button);
}

function displayFormLayer(button){
    if(button.id == "add-book"){
        formLayer.style = "opacity: 1; height: 100vh;";    
    }
    if(button.id == "form-submit"){
        formLayer.style = "opacity: 0; height: 100vh;"
        setTimeout(()=>{
            formLayer.style = "";
        },500,formLayer);
    }
}

function clickAnimation(button){
    button.classList.add("button-clicked");
    setTimeout(()=>{
        button.classList.remove("button-clicked");
    },100,button);
}


