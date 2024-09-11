const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
    // Retrieve notes from localStorage and insert into the container
    notesContainer.innerHTML = localStorage.getItem("notes") || '';
    // Reassign event listeners to the loaded notes
    assignListeners();
}

function updateStorage() {
    // Save the current notes to localStorage
    localStorage.setItem("notes", notesContainer.innerHTML);
}

function assignListeners() {
    // Reassign event listeners to all current notes
    const notes = document.querySelectorAll(".input-box");

    notes.forEach(note => {
        note.querySelector('img').addEventListener('click', (e) => {
            e.target.parentElement.remove();
            updateStorage();
        });

        note.addEventListener('keyup', () => {
            updateStorage();
        });
    });
}

createBtn.addEventListener("click", () => {
    // Create a new note with a delete button
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute('contenteditable', 'true');
    img.src = "assets/images/delete.png";

    // Append the new note to the container and save it
    notesContainer.appendChild(inputBox).appendChild(img);
    updateStorage();
    assignListeners(); // Reassign listeners to the new note
});

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

// Load existing notes on page load
showNotes();
