let items = [] // Making new empty array

const itemsDiv = document.getElementById("items") // Linking HTML stuff and making it accessible here
const input = document.getElementById("itemInput")
const storageKey = "items" //this is what allows each div to be stored in local storage
function renderItems() {
    itemsDiv.innerHTML = null //clear the content inside

    for(const [idx, item] of Object.entries(items)) { //make a for loop to go over every item in the array
        //for a new note, first make a container and a paragraph
        const container = document.createElement("div")
        container.style.marginBottom = "10px"

        const text = document.createElement("p")
        text.style.display = "inline"
        text.style.marginRight = "10px"
        text.textContent = item;

        //create a delete button for the note as well

        const button = document.createElement("button")
        button.textContent = "Delete"
        button.onclick = () => removeItem(idx)

        //add the text and the button to the container
        container.appendChild(text)
        container.appendChild(button)

        //add the container to the array

        itemsDiv.appendChild(container)
    }

}

function loadItems() {
    const oldItems = localStorage.getItem(storageKey) //get the div from local storage
    if (oldItems) { // if an item exists, add it to the items[] array
        items = JSON.parse(oldItems) 
    }
    renderItems() // then render it
}

function saveItems() {
    const stringItems = JSON.stringify(items) //change it into the JSON format so it can be stored
    localStorage.setItem(storageKey, stringItems) // first value is how to identify it, second it what to store
}

function addItem() {
    const value = input.value //take value from the input box in HTML
    if (!value) {  //if its empty, send an alert
        alert("You cannot add an empty item")
        return
    }

    items.push(value) //add this value to the array
    renderItems() // render the new array of items
    input.value = "" // change the input box text back to nothing
    saveItems() // save all the changes made
}

function removeItem(idx) { //remove item
    items.splice(idx, 1) //remove an item from the array at the index 'idx' and the 1 means only remove that item
    renderItems() // render the new array
    saveItems() //save changes made 
}


document.addEventListener("DOMContentLoaded", loadItems) //not sure how to explain, but basically tracks whats happening in the page