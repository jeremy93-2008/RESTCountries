import * as React from 'react'
import { Home } from './pages/home'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Detail } from './pages/detail'

export function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/detail/:code" element={<Detail />} />
            </Routes>
        </HashRouter>
    )
}
