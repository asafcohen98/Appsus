import { utilsService } from '../../../services/utils-service.js'
import { storageService } from '../../../services/storage-service.js'

const KEY = 'notesDB'

export const notesService = {
    query,
    createNote,
    updateNoteTxt,
    getNoteById,
    updateTodos,
    removeTodo
}

var notes = storageService.loadFromStorage(KEY) || _createNotes()

function query(filterBy) {
    if (notes) {
        if (filterBy) {
            const { keyword } = filterBy
            const filteredNotes = notes.filter(note => {
                const { title, txt, url, label, todos } = note.info
                return title.includes(keyword) || txt.includes(keyword) || url.includes(keyword)
                    || label.includes(keyword) || todos.some(todo => todo.txt.includes(keyword))
            })
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
        info: {
            txt: 'Fullstack Me Baby!',
            url: '',
            title: '',
            label: '',
            todos: []
        },
        style: {
            backgroundColor: 'green',
            color: '#1111',
            fontSize: '1rem',
        }
    }, {
        id: utilsService.makeId(),
        type: "NoteImg",
        isPinned: false,
        info: {
            txt: '',
            url: 'https://images6.fanpop.com/image/photos/39900000/IMG-6250-PNG-kion-39961687-1024-577.png',
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
        info: {
            txt: '',
            url: '',
            label: 'Todos for today',
            todos: [
                { id: utilsService.makeId(), txt: 'lo ohev lasot dvrims dsadsadasdsaadsasdsa', doneAt: null },
                { id: utilsService.makeId(), txt: 'Do this dsadsadasdasdadsada', doneAt: new Date() }]
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

// That function update specific note todos
function updateTodos(note, todos) {
    note.info.todos = todos
    _saveNotesToStorage()
    return Promise.resolve()
}

// That function remove the todo from specific note
function removeTodo(note, todo) {
    const { todos } = note.info
    const todoIdx = todos.indexOf(todo)
    todos.splice(todoIdx,1)
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

