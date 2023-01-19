import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavBar from './elements/NavBar'

import Home from './pages/Home'
import RegProduct from './pages/RegProduct'
import RegProvid from './pages/RegProvid'
import ListProduct from './pages/ListProduct'
import ListProvid from './pages/ListProvid'


function App() {
    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route path='/regproduct' element={<RegProduct/>}/>
                <Route path='/listproduct' element={<ListProduct/>}/>
                <Route path='/regprovid' element={<RegProvid/>}/>
                <Route path='/listprovid' element={<ListProvid/>}/>
            </Routes>
        </Router>
    );
}

export default App;
