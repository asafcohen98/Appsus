const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { AppHeader } from './cmps/AppHeader.jsx'
import { Home } from './pages/Home.jsx'
import { MissBook } from './apps/books/MissBook.jsx'
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
                {/* TODO missEmail */}
                <Route component={MissKeep} path="/keep" />   
                {/* TODO about */}
                <Route component={Home} path="/" />
                </Switch>
            </main>
            <footer>

            </footer>
        </Router>
    )
}
