import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://realtime-database-7c979-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);

const database = getDatabase(app);

const shoppingListDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value;
    push(shoppingListDB, inputValue)  
    clearInputField()  
    
})

onValue(shoppingListDB, function(snapshot){
   
    if(snapshot.exists()){
        let shopArray = Object.entries(snapshot.val())
        clearListForNewList();
        console.log(snapshot.val());
        for(let i = 0; i < shopArray.length; i++){
            let shopping = shopArray[i]
            appendList(shopping)
        }

    }
    else{
        shoppingListEl.innerHTML = "No items yet..."
    }
    
})

function clearInputField(){
    inputFieldEl.value = " "

}

function clearListForNewList(){
    shoppingListEl.innerHTML = " "

}

function appendList(item){
    let shopID = item[0]
    let shopIDValue = item[1]
   
    let newEl = document.createElement("li");
    newEl.textContent = shopIDValue

    newEl.addEventListener("dblclick", function(){
        let extLocationInDB = ref(database, `shoppingList/${shopID}`)
        remove(extLocationInDB)
    })
    shoppingListEl.append(newEl)
}


