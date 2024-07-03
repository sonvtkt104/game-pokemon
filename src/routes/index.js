import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, NotFound, GamePokemon } from '../pages'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<GamePokemon />} />
                <Route path="/home" element={<Home />} />
                <Route path="/test" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}