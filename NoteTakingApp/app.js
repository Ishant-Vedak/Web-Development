let notes = [] //make empty array for notes
let editingNoteId = null // keeps track of what note is being edited. null when adding a note or set to the note's ID when editing

function loadNotes() {
  const savedNotes = localStorage.getItem('quickNotes') // get an item
  return savedNotes ? JSON.parse(savedNotes) : [] // whatever is got is put into a new empty array
}

function saveNote(event) {
  event.preventDefault() //prevents the page from loading

  const title = document.getElementById('noteTitle').value.trim(); // get the value of the inputs and get rid of whitespace
  const content = document.getElementById('noteContent').value.trim(); // same

  if(editingNoteId) {
    // Update existing Note

    const noteIndex = notes.findIndex(note => note.id === editingNoteId) // finds the index of the note with the matching id in the notes array
    notes[noteIndex] = { // create a note at the index of noteIndex
      ...notes[noteIndex], //... is the spread operator, which means to copy the properties of this note first, then change the ones specified later
      title: title, // setting the title and the content
      content: content
    }

  } else {
    // Add New Note
    notes.unshift({ // adds notes to the start of the array, so new notes appear at the top
      id: generateId(), //return the date of the string i think?
      title: title, //make title and content 
      content: content
    })
  }

  closeNoteDialog() // close the modal
  saveNotes() //save everything
  renderNotes()//render changes
}

function generateId() {
  return Date.now().toString() // not sure why date is being used
}

function saveNotes() {
  localStorage.setItem('quickNotes', JSON.stringify(notes)) //saves stuff to local storage
}

function deleteNote(noteId) {
  notes = notes.filter(note => note.id != noteId) //matches the note with the same noteId
  saveNotes() //save and render changes
  renderNotes()
}

function renderNotes() {
  const notesContainer = document.getElementById('notesContainer'); //notesContainer is the grid where all the notes are rendered

  if(notes.length === 0) { 
    // if no notes are there
    notesContainer.innerHTML = `
      <div class="empty-state">
        <h2>No notes yet</h2>
        <p>Create your first note to get started!</p>
        <button class="add-note-btn" onclick="openNoteDialog()">+ Add Your First Note</button>
      </div>
    `
    return
  }

  //this is the styling of the note when viewing the notesContainer grid?
  notesContainer.innerHTML = notes.map(note => `
    <div class="note-card">
      <h3 class="note-title">${note.title}</h3>
      <p class="note-content">${note.content}</p>
      <div class="note-actions">
        <button class="edit-btn" onclick="openNoteDialog('${note.id}')" title="Edit Note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>
        <button class="delete-btn" onclick="deleteNote('${note.id}')" title="Delete Note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/>
          </svg>
        </button>
      </div>

    </div>
    `).join('') //the .map function makes multiple strings for each of the html elements above in an array, and the .join function joins them into one string
}

function openNoteDialog(noteId = null) {
  const dialog = document.getElementById('noteDialog'); //get all these elements
  const titleInput = document.getElementById('noteTitle');
  const contentInput = document.getElementById('noteContent');

  if(noteId) { 
    // Edit Mode: finds the id of the note being edited, remembers the note id, fills the title and content 
    const noteToEdit = notes.find(note => note.id === noteId)
    editingNoteId = noteId
    document.getElementById('dialogTitle').textContent = 'Edit Note'
    titleInput.value = noteToEdit.title
    contentInput.value = noteToEdit.content
  }
  else {
    // Add Mode: no id is found, which means it adds a note
    editingNoteId = null
    document.getElementById('dialogTitle').textContent = 'Add New Note'
    titleInput.value = ''
    contentInput.value = ''
  }

  dialog.showModal() //show the modal
  titleInput.focus()//moves the cursor in the title input field so the user can start typing immediately

}

function closeNoteDialog() {
  document.getElementById('noteDialog').close() //close the modal
}

function toggleTheme() { //change between light and dark
  const isDark = document.body.classList.toggle('dark-theme') //toggle will add the class if its not there, and remove it if it is there 
  localStorage.setItem('theme', isDark ? 'dark' : 'light') //ternary operator type of thing?
  document.getElementById('themeToggleBtn').textContent = isDark ? '☀️' : '🌙'
}

function applyStoredTheme() {
  if(localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme') //changes the theme but unsure of the syntax
    document.getElementById('themeToggleBtn').textContent = '☀️' //changes the symbol
  }
}

document.addEventListener('DOMContentLoaded', function() { //unsure how the function is able to be here
  applyStoredTheme()
  notes = loadNotes()
  renderNotes() //saves the theme and applies, loads the notes array, and then render

  document.getElementById('noteForm').addEventListener('submit', saveNote) //unsure what either does
  document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme)

  document.getElementById('noteDialog').addEventListener('click', function(event) { //i think if outside the modal then exits
    if(event.target === this) {
      closeNoteDialog()
    }
  })
})