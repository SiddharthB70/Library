const addButton = document.getElementById("add-book");
const submitButton = document.getElementById("form-submit");
const formLayer = document.querySelector(".book-form");
const mainContainer = document.querySelector(".main-container");
const form = document.querySelector("form");
const formCloseButton = document.getElementById("form-close")
let myLibrary = [];


addButton.addEventListener("click",()=>buttonFunction(addButton));
submitButton.addEventListener("click",setSubmitButton);
formCloseButton.addEventListener("click",()=>{
    buttonFunction(formCloseButton);
    setTimeout(clearInput,600);
})

function setSubmitButton(){
    const textInputs = document.querySelectorAll(`input[type="text"]`);
    for(let textInput of textInputs){
        if(textInput.checkValidity()==false)
            return;
    }
    buttonFunction(submitButton);
    if(myLibrary.length == 0){
        setMainContainer();
    }
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
            mainContainer.style = "z-index: -1;"
        },1)    
    }
    if(button.id == "form-submit" || button.id == "form-close"){
        formLayer.style = "opacity: 0";
        setTimeout(()=>{
            formLayer.style = "";
            formLayer.classList.remove("visible");
            mainContainer.style = "";
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
    const cardInformation = getCardInformation(); 
    bookCard.appendChild(cardInformation[0]);
    bookCard.appendChild(createRemoveButton());
    mainContainer.appendChild(bookCard);
    cardInformation[1].addPresentBookCard(bookCard);
}

function getFormValues(){
    const inputs = document.querySelectorAll(".form-container input");
    let book = new Book(inputs[0].value,inputs[1].value,inputs[2].value,inputs[3].checked)
    addBookToLibrary(book);
}

class Book{
    constructor(title,author,pages,status){
        this.Title = title;
        this.Author = author;
        this.Pages = pages;
        this.Status = status;
    }

    addPresentBookCard(card){
        this.card = card;
    }
}

// function Book(title,author,pages,status){
//     this.Title = title;
//     this.Author = author;
//     this.Pages = pages;
//     this.Status = status;
// }

// Book.prototype.addPresentBookCard = function (card){
//     this.card = card;
// }

function addBookToLibrary(book){
    myLibrary.push(book);
}

function clearInput(){
    form.reset();
}

function getCardInformation(){
    const list = document.createElement("dl");
    const presentBook = myLibrary.at(-1);
    for(let key in presentBook){
        if(key == "addPresentBookCard")
            break;
        const dt = document.createElement("dt");
        dt.textContent = key;
        list.appendChild(dt);

        const dd = document.createElement("dd");
        if(key == "Status"){
            list.appendChild(createStatusNode(presentBook[key]));
        }
        else{
            
            dd.textContent = presentBook[key];
            list.appendChild(dd);
        }        
    }
    list.classList.add("card-layout");
    return [list,presentBook];
}


function createStatusNode(status){
    const cardForm = document.createElement("form");
    const statusContainer = document.createElement("p");
    const statusCheck = document.createElement("input");
    const statusLabel = document.createElement("label");
    let statusNum = myLibrary.length;

    cardForm.setAttribute("action","");

    statusCheck.setAttribute("type","checkbox");
    statusCheck.setAttribute("name",`status${statusNum}`);
    statusCheck.setAttribute("id",`status${statusNum}`);
    statusCheck.checked = status;
    statusCheck.addEventListener("click",changeBookStatus);

    statusLabel.setAttribute("for",`status${statusNum}`);
    statusLabel.textContent = `READ IN-PROGRESS`;


    statusContainer.classList.add("status-container");
    statusContainer.appendChild(statusCheck);
    statusContainer.appendChild(statusLabel);
    cardForm.appendChild(statusContainer);
    return cardForm;
}


function changeBookStatus(event){
    const bookCard = event.target.closest(".book-card");
    let bookIndex = findIndex(bookCard);   
    myLibrary[bookIndex]["Status"] = !myLibrary[bookIndex]["Status"];  
}

function findIndex(bookCard){
    return myLibrary.findIndex((book)=>{
        return bookCard.isEqualNode(book.card);
    });
}

function createRemoveButton(){
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove Book";
    removeButton.classList.add("remove-button");
    removeButton.addEventListener("click",removeBook);
    return removeButton;
}

function removeBook(e){
    const bookCard = e.target.closest(".book-card");
    let bookIndex = findIndex(bookCard);
    myLibrary.splice(bookIndex,1,);
    mainContainer.removeChild(bookCard);
    if(myLibrary.length == 0){
        emptyMainContainer();
    }
}

function emptyMainContainer(){
    mainContainer.classList.add("empty");
    mainContainer.textContent = "YOUR LIBRARY IS EMPTY!"
}

function setMainContainer(){
    mainContainer.classList.remove("empty");
    mainContainer.textContent = ""
}

window.onload = ()=>{
    clearInput();
    emptyMainContainer();
}

