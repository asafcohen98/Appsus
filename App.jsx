const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

import { AppHeader } from './cmps/AppHeader.jsx'
import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { MissBook } from './apps/books/MissBook.jsx'
import { MissEmail } from './apps/email/MissEmail.jsx'
import { MissKeep } from './apps/keep/MissKeep.jsx'


export function App() {
    return (
        <Router>
            <header>
                <AppHeader />
            </header>
            <main>
                <Switch>
                    <Route component={MissBook} path="/book" />
                    <Route component={MissEmail} path="/email" />
                    <Route component={MissKeep} path="/keep" />
                    <Route component={ About} path="/about" />
                    <Route component={Home} path="/" />
                </Switch>
            </main>
            <footer>

            </footer>
        </Router>
    )
}
