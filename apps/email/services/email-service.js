import { storageService } from '../../../services/storage-service.js'
import { utilsService } from '../../../services/utils-service.js'


const KEY = 'emailsDB'
var emails = storageService.loadFromStorage(KEY) || []



export const emailsService = {
    query,
    getEmailById,
}

function query(filterBy) {
    if (emails.length) {
        if (filterBy) {
            const { keyword } = filterBy
            const filteredEmails = emails.filter(email => {
                return email.subject.includes(keyword) || email.body.includes(keyword)
            })
            return Promise.resolve(filteredEmails)
        }
        return Promise.resolve(emails)
    }
    _loadEmails()
    return Promise.resolve(emails)
}

function _loadEmails() {
    createEmail('adiv@get.com', 'some good looking headline', 'some body', true);
    createEmail('adiv@fun.com', 'some headline', utilsService.makeLorem(15));
    createEmail('adiv@fun.com', 'some headline', utilsService.makeLorem(15));
    createEmail('adiv@fun.com', 'some headline', utilsService.makeLorem(15));
    createEmail('adiv@fun.com', 'some headline', utilsService.makeLorem(15));
    createEmail('adiv@fun.com', 'some headline', utilsService.makeLorem(15));
    createEmail('adiv@fun.com', 'some headline', utilsService.makeLorem(15));
    createEmail('adiv@fun.com', 'some headline', utilsService.makeLorem(15));
    createEmail('adiv@fun.com', 'some headline', utilsService.makeLorem(15));
    createEmail('adiv@fun.com', 'some headline', utilsService.makeLorem(15));
    createEmail('adiv@fun.com', 'some headline', utilsService.makeLorem(15));
    createEmail('adiv@fun.com', 'some headline', utilsService.makeLorem(15));
    createEmail('adiv@fun.com', 'some headline', utilsService.makeLorem(15));
    createEmail('adiv@fun.com', 'some headline', utilsService.makeLorem(15));
    createEmail('adiv@fun.com', 'some headline', utilsService.makeLorem(15));
    createEmail('adiv@fun.com', 'some headline', utilsService.makeLorem(15));
    createEmail('adiv@fun.com', 'some headline', utilsService.makeLorem(15));
    createEmail('adiv@fun.com', 'some headline', utilsService.makeLorem(15));
    createEmail('adiv@fun.com', 'some headline', utilsService.makeLorem(15));
    createEmail('adiv@fun.com', 'some headline', utilsService.makeLorem(15));
    createEmail('adiv@fun.com', 'some headline', utilsService.makeLorem(15));
    _saveEmailsToStorage()   
}

function createEmail(towards, subject, body, isRead = false) {
    emails.push({
        id: utilsService.makeId(),
        isRead,
        isChecked: false,
        towards,
        subject,
        body,
        sentAt: new Date()
    });
}

function getEmailById(emailId) {
    const email = emails.find(email => emailId === email.id)
    return Promise.resolve(email)
}

// function checkBookExist(googleBook) {
//     const isBookExist = books.some(book => book.id === googleBook.id)
//     return Promise.resolve(isBookExist)
// }

function _saveEmailsToStorage() {
    storageService.saveToStorage(KEY, emails)
}