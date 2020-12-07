console.log('welcome to notes app')
showNotes();

//getting name from user
let name = localStorage.getItem("name");
// console.log(name)
if (name == null) {
    name = prompt("Enter Your Good Name");
    document.getElementById("name").innerHTML = name;
    localStorage.setItem("name", name);
}
else {
    document.getElementById("name").innerHTML = name;
}

// add a note to localStorage when user clicks on add note
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addText = document.getElementById("addText");
    let addtitle = document.getElementById("addtitle");
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addtitle.value,
        text: addText.value,
        date: new Date()
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = "";
    addtitle.value = "";
    // console.log(notesObj)
    showNotes();
})


// function to show element from localstorage and populating all notes 
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
        
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="notecard card my-2 mx-2" style="width: 21rem;">
        <div class="card-body">
          <div class="dateTime">
                    <span id="date">${element.date}</span>
            </div>
            <h5 class="card-title"> ${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
        document.getElementById("first").innerHTML="";
    }
    else {
        notesElm.innerHTML = `Nothing to show...`;
        document.getElementById("first").innerHTML="Write Your First Note"
    }
}


// function to delete a note 
function deleteNote(index) {
    // console.log(index)
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


// function for search
let search = document.getElementById('searchText');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    // console.log(inputVal);
    let notecard = document.getElementsByClassName("notecard");
    Array.from(notecard).forEach(function (element) {
        let cardText = element.getElementsByTagName("p")[0].innerText;
        if (cardText.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})
