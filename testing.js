import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://realtime-database-7c979-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);

const database = getDatabase(app);

const booksInDB = ref(database, "books")

const booksEl = document.getElementById("booksValue")
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");

addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value;
    push(booksInDB, inputValue) 
    clearTabAfterSubmit()   
})

onValue(booksInDB, function(snapshot){ 
   /**  let bkKey = Object.keys(snapshot.val())
    let allEntry = Object.entries(snapshot.val())*/

    if(snapshot.exists()){
        let bookArray = Object.entries(snapshot.val())
        clearListForNewList()
        console.log(snapshot.val())
        for(let i = 0; i < bookArray.length; i++){
            
            let currentbook = bookArray[i]
            appendList(currentbook)
               
        }     
    }
    else{
        booksEl.innerHTML = "No items here yet..."
    }
})

function appendList(item){
    let bookID = item[0]
    let bookIDValue = item[1]
   
    let newEl = document.createElement("li");
    newEl.textContent = bookIDValue

    newEl.addEventListener("dblclick", function(){
        let extLocationInDB = ref(database, `books/${bookID}`)
        remove(extLocationInDB)
    })
    booksEl.append(newEl)
}

function clearTabAfterSubmit(){
   inputFieldEl.value = " "

}

function clearListForNewList(){
    booksEl.innerHTML = " "

}


