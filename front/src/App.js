import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Provider } from 'react-redux'
import Store from './redux/store'

import MainPage from "./pages/MainPage"
import DBPage from "./pages/DBPage"



const App = () => {
    return (
        <Provider store={Store}>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/db" element={<DBPage />} />
                </Routes>
            </Router>
        </Provider>
        
        
    )
}


export default App