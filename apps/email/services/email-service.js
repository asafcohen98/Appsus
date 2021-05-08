import { storageService } from '../../../services/storage-service.js'
import { utilsService } from '../../../services/utils-service.js'


const KEY = 'emailsDB'
var emails = storageService.loadFromStorage(KEY) || []

var filteredEmails;

export const emailsService = {
    query,
    getEmailById,
    addEmail,
    getEmails
}

function query(filterBy) {
    if (emails.length) {
        if (!filterBy) return Promise.resolve(emails);

        const { keyword, categories } = filterBy;
        
        if (categories === 'read') {
            filteredEmails = emails.filter(email => { return email.isRead });
        } else if (categories === 'unread') {
            filteredEmails = emails.filter(email => { return !email.isRead });
        } else filteredEmails = emails; //category 'all'

        if (keyword) {
            let emailsRes;
            (filteredEmails.length) ? emailsRes = filteredEmails : emailsRes = emails;

            filteredEmails = emailsRes.filter(email => {
                return email.towards.toLowerCase().includes(keyword) ||
                email.subject.toLowerCase().includes(keyword) ||
                email.body.toLowerCase().includes(keyword)
            })
        }

        if (filteredEmails) return Promise.resolve(filteredEmails);
    }
    _loadEmails()
    return Promise.resolve(emails)
}

function _loadEmails() {
    createEmail('adiv@get.com', 'some good looking headline', 'some body', Date.now(), true);
    createEmail('Yossi@fun.com', 'some headline', utilsService.makeLorem(52), Date.now(), true);
    createEmail('Hamuzim@fun.com', 'some headline12321321', utilsService.makeLorem(300), Date.now(), true);
    createEmail('Tahini@fun.com', 'some headline', utilsService.makeLorem(100), Date.now(), true)
    _saveEmailsToStorage()
}

function addEmail(emailContent) {
    const { towards, subject, body, sentAt } = emailContent;
    createEmail(towards, subject, body, sentAt);
    _saveEmailsToStorage();
    return Promise.resolve()
}

function createEmail(towards, subject, body, sentAt = Date.now(), isRead = false) {
    emails.unshift({
        id: utilsService.makeId(),
        isRead,
        isChecked: false,
        towards,
        subject,
        body,
        sentAt
    });
}

function getEmails() {
    return Promise.resolve(emails);
}

function getEmailById(emailId) {
    const email = emails.find(email => emailId === email.id)
    return Promise.resolve(email)
}

function _saveEmailsToStorage() {
    storageService.saveToStorage(KEY, emails)
}