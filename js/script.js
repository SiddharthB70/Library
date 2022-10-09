const addButton = document.getElementById("add-book");
const submitButton = document.getElementById("form-submit");
const formLayer = document.querySelector(".book-form");
const mainContainer = document.querySelector(".main-container");


addButton.addEventListener("click",()=>buttonFunction(addButton));
submitButton.addEventListener("click",()=>{
    const textInputs = document.querySelectorAll(`input[type="text"]`);
    for(let textInput of textInputs){
        if(textInput.checkValidity()==false)
            return;
    }
    buttonFunction(submitButton);
    addBookCard();
});

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

function addBookCard(){
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    mainContainer.appendChild(bookCard);

}

