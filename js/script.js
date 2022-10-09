const addButton = document.getElementById("add-book");
const submitButton = document.getElementById("form-submit");
const formLayer = document.querySelector(".book-form");
const mainContainer = document.querySelector(".main-container");
const form = document.querySelector("form");
let myLibrary = [];


addButton.addEventListener("click",()=>buttonFunction(addButton));
submitButton.addEventListener("click",setSubmitButton);

function setSubmitButton(){
    const textInputs = document.querySelectorAll(`input[type="text"]`);
    for(let textInput of textInputs){
        if(textInput.checkValidity()==false)
            return;
    }
    buttonFunction(submitButton);
    getFormValues();
    setTimeout(clearInput,500);
    addBookCard();
    submitButton.removeEventListener("click",setSubmitButton);
    setTimeout(()=>{
        submitButton.addEventListener("click",setSubmitButton);
    },501)
}

function buttonFunction(button){
    clickAnimation(button);
    displayFormLayer(button);
}

function displayFormLayer(button){   
    if(button.id == "add-book"){
        formLayer.classList.add("visible");
        setTimeout(()=>{
            formLayer.style = "opacity: 1"
        },1)    
    }
    if(button.id == "form-submit"){
        formLayer.style = "opacity: 0";
        setTimeout(()=>{
            formLayer.style = "";
            formLayer.classList.remove("visible");
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
    const cardInformation = getCardInformation(); 
    bookCard.classList.add("book-card");
    bookCard.appendChild(cardInformation);
    mainContainer.appendChild(bookCard);
}

function getFormValues(){
    const inputs = document.querySelectorAll("input");
    let book = new Book(inputs[0].value,inputs[1].value,inputs[2].value,inputs[3].checked)
    addBookToLibrary(book);
}

function Book(title,author,pages,status){
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this.Status = status;
}

function addBookToLibrary(book){
    myLibrary.push(book);
}

function clearInput(){
    form.reset();
}

function getCardInformation(){
    const list = document.createElement("dl");
    const presentBook = myLibrary.at(-1);
    console.log(myLibrary);
    console.log(presentBook);
    for(let key in presentBook){
        const dd = document.createElement("dd");
        const dt = document.createElement("dt");
        dt.textContent = key;
        if(key == "Status"){
            console.log(presentBook[key])
            if(presentBook[key])
                dd.textContent = "Read";
            else
                dd.textContent = "In-Progress";
        }
        else
            dd.textContent = presentBook[key];
        list.appendChild(dt);
        list.appendChild(dd);
    }
    list.classList.add("card-layout");
    return list;
}

