const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

// Add new note
addBtn.addEventListener("click", () => addNote());

// Function to add a new note
function addNote(text = "") {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
        <div class="tool">
            <i class="fas fa-save save"></i>
            <i class="fas fa-trash trash"></i>
        </div>
        <textarea>${text}</textarea>
    `;

    const save = note.querySelector(".save");
    const trash = note.querySelector(".trash");
    const textarea = note.querySelector("textarea");

    // Save notes to localStorage
    save.addEventListener("click", saveNotes);

    // Handle input changes
    textarea.addEventListener("input", saveNotes);

    // Delete note
    trash.addEventListener("click", () => {
        note.remove();
        saveNotes();
    });

    main.appendChild(note);
}

// Save notes to localStorage
function saveNotes() {
    const notes = document.querySelectorAll(".note textarea");
    const data = Array.from(notes).map(note => note.value);

    if (data.length === 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
}

// Load notes from localStorage
function loadNotes() {
    const lsNotes = JSON.parse(localStorage.getItem("notes"));

    if (lsNotes) {
        lsNotes.forEach(noteText => addNote(noteText));
    }
}

// Initial load
loadNotes();
