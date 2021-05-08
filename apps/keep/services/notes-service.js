import { utilsService } from '../../../services/utils-service.js'
import { storageService } from '../../../services/storage-service.js'

const KEY = 'notesDB'

export const notesService = {
    query,
    createNote,
    updateNoteTxt,
    getNoteById,
    updateTodos,
    removeTodo,
    updateDoneTodo,
    addTodo,
    updateNoteLabel,
    updatePin,
    updateArchive,
    removeNote,
    changeNoteColor
}

var notes = storageService.loadFromStorage(KEY) || _createNotes()

function query(filterBy) {
    if (notes) {
        if (filterBy) {
            const { keyword, ctg } = filterBy
            let filteredNotes = null
            // category filter
            if(ctg === 'archive'){
                filteredNotes = notes.filter(note => note.isArchived)
            }else{
                filteredNotes = notes
            }
            if (keyword) {
                filteredNotes = filteredNotes.filter(note => {
                    const { title, txt, url, todos } = note.info
                    return title.toLowerCase().includes(keyword) || txt.toLowerCase().includes(keyword) || url.toLowerCase().includes(keyword)
                        || todos.some(todo => todo.txt.toLowerCase().includes(keyword))
                })
            }
            return Promise.resolve(filteredNotes)
        }
        return Promise.resolve(notes)
    }
    _createNotes()
    return Promise.resolve(notes)
}

// That function creating notes for data test:
function _createNotes() {
    notes = [{
        id: utilsService.makeId(),
        type: 'NoteText',
        isPinned: false,
        isArchived: false,
        info: {
            txt: 'Fullstack Me Baby!',
            url: '',
            title: '',
            label: '',
            todos: []
        },
        style: {
            backgroundColor: '#ffff',
            color: '#1111',
            fontSize: '1rem',
        }
    }, {
        id: utilsService.makeId(),
        type: "NoteImg",
        isPinned: true,
        isArchived: false,
        info: {
            txt: '',
            url: 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2015/10/12220511/puppy-800x534.jpg',
            title: 'Me playing Mi',
            label: '',
            todos: []
        },
        style: {
            backgroundColor: '#ffff',
            color: '#1111',
            fontSize: '1rem',
        }
    },
    {
        id: utilsService.makeId(),
        type: "NoteImg",
        isPinned: true,
        isArchived: false,
        info: {
            txt: '',
            url: 'https://images.unsplash.com/photo-1546587348-d12660c30c50?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fG5hdHVyYWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
            title: 'Me playing Mi',
            label: '',
            todos: []
        },
        style: {
            backgroundColor: '#ffff',
            color: '#1111',
            fontSize: '1rem',
        }
    },
    {
        id: utilsService.makeId(),
        type: 'NoteTodos',
        isPinned: false,
        isArchived: false,
        info: {
            txt: '',
            title: '',
            url: '',
            label: 'Todos',
            todos: [
                { id: utilsService.makeId(), txt: 'Do that', doneAt: null },
                { id: utilsService.makeId(), txt: 'Do this', doneAt: new Date() },
                { id: utilsService.makeId(), txt: 'Finish css', doneAt: new Date() },
                { id: utilsService.makeId(), txt: 'Go to sleep', doneAt: new Date() },
                { id: utilsService.makeId(), txt: 'Finish animations', doneAt: new Date() }]
        },
        style: {
            backgroundColor: '#ffff',
            color: '#1111',
            fontSize: '1rem',
        }
    },
    {
        id: utilsService.makeId(),
        type: 'NoteVideo',
        isPinned: false,
        isArchived: false,
        info: {
            txt: '',
            url: '',
            title: '',
            ytId: 'gOMhN-hfMtY',
            label: '',
            todos: []
        },
        style: {
            backgroundColor: '#ffff',
            color: '#1111',
            fontSize: '1rem',
        }
    },
    {
        id: utilsService.makeId(),
        type: 'NoteVideo',
        isPinned: false,
        isArchived: false,
        info: {
            txt: '',
            url: '',
            title: '',
            ytId: 'hRK7PVJFbS8',
            label: '',
            todos: []
        },
        style: {
            backgroundColor: '#ffff',
            color: '#1111',
            fontSize: '1rem',
        }
    },
    {
        id: utilsService.makeId(),
        type: 'NoteVideo',
        isPinned: false,
        isArchived: false,
        info: {
            txt: '',
            url: '',
            title: '',
            ytId: '3PJmE-ucx_o',
            label: '',
            todos: []
        },
        style: {
            backgroundColor: '#ffff',
            color: '#1111',
            fontSize: '1rem',
        }
    }
    ]
    _saveNotesToStorage()
}

// That function create note by type and info object
function createNote(type, info) {
    const note = {
        id: utilsService.makeId(),
        type,
        isPinned: false,
        info,
        style: {
            backgroundColor: '#ffff',
            color: '#1111',
            fontSize: '1rem',
        }
    }
    notes.push(note)
    _saveNotesToStorage()
    return Promise.resolve()
}

// That function save notes to storage
function _saveNotesToStorage() {
    storageService.saveToStorage(KEY, notes)
}

// That function update specific note text
function updateNoteTxt(note, newTxt) {
    note.info.txt = newTxt
    _saveNotesToStorage()
    return Promise.resolve()
}


// That funcion get note by id
function getNoteById(noteId) {
    const note = notes.find(note => noteId === note.id)
    return Promise.resolve(note)
}

// That function update todos label when created
function updateNoteLabel(note, label) {
    note.info.label = label
    _saveNotesToStorage()
    return Promise.resolve(label)
}

// That function update note pin (toggle between pinned or not)
function updatePin(note) {
    const noteIdx = notes.indexOf(note)
    notes.splice(noteIdx, 1)
    if (note.isPinned) {
        note.isPinned = false
        notes.push(note)
    } else {
        note.isPinned = true
        notes.unshift(note)
    }
    _saveNotesToStorage()
    return Promise.resolve(note)
}

// That function update note archive (toggle between archive or not)
function updateArchive(note) {
    note.isArchived = note.isArchived ? false : true
    _saveNotesToStorage()
    return Promise.resolve(note)
}

// That function remove note from the notes array
function removeNote(note) {
    const noteIdx = notes.indexOf(note)
    notes.splice(noteIdx, 1)
    _saveNotesToStorage()
    return Promise.resolve()
}

// That function changing note background color 
function changeNoteColor(note, color) {
    const noteIdx = notes.indexOf(note)
    notes[noteIdx].style.backgroundColor = color
    _saveNotesToStorage()
    return Promise.resolve(note)
}





// TODOS SECTION //
///

// That function update specific note todos
function updateTodos(note, todos) {
    note.info.todos = todos
    _saveNotesToStorage()
    return Promise.resolve()
}

// That function remove the todo from specific note todos
function removeTodo(note, todo) {
    const { todos } = note.info
    const todoIdx = todos.indexOf(todo)
    todos.splice(todoIdx, 1)
    note.info.todos = todos
    _saveNotesToStorage()
    return Promise.resolve(todos)
}

// That function toggle between doneAt = null to the current time (mark the todo)
function updateDoneTodo(note, todo) {
    const { todos } = note.info
    const todoIdx = todos.indexOf(todo)
    todos[todoIdx].doneAt = !todos[todoIdx].doneAt ? new Date() : null
    note.info.todos = todos
    _saveNotesToStorage()
    return Promise.resolve(todos)
}

// That function add new todo to specific note todos
function addTodo(note) {
    const newTodo = {
        id: utilsService.makeId(),
        txt: '',
        doneAt: null
    }
    const { todos } = note.info
    todos.push(newTodo)
    note.info.todos = todos
    _saveNotesToStorage()
    return Promise.resolve(todos)
}

























// // That function create text info by user info (NoteText type)
// function _createTextInfo(userInfo){
//     return {txt: userInfo}
// }

// // That function create img info by user info (NoteImg type)
// function _createImgInfo(userInfo){
//     return {url: userInfo, title:null}
// }

// // That function create todos info by user info (NoteTodos type)
// function _createTodosInfo(userInfo){
//     const todos = userInfo.split(',')
//     return todos.map(todo => ({txt:todo, doneAt:null}))
// }

