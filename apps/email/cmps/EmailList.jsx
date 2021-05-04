import { EmailPreview } from './EmailPreview.jsx'

export function EmailList({ emails }) {

    return (
        <div className="email-list">
            {emails.map(email => <EmailPreview email={email} key={email.id} />)}
        </div>
    )
}