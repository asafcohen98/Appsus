import { utilsService } from '../../../services/utils-service.js'
import { storageService } from '../../../services/storage-service.js'

const KEY = 'notesDB'

export const notesService = {
    query,
    createNote
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
            url: 'http://some-img/me',
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
            label: '',
            todos: [
                { txt: 'Do that', doneAt: null },
                { txt: 'Do this', doneAt: 187111111 }]
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

