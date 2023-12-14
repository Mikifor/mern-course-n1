import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import { LinksPage } from "./pages/LinksPage.js"
import { CreatePage } from "./pages/CreatePage.js"
import { DetalePage } from "./pages/DetalePage.js"
import { AuthPage } from "./pages/AuthPage.js"

export const useRoutes = isAutenticated => {
    if (isAutenticated) {
        return (
            <Routes>
                <Route path="/links" element={<LinksPage />} exact />
                <Route path="/create" element={<CreatePage />} exact />
                <Route path="/detail/:id" element={<DetalePage />} exact />
                <Route path="/*" element={<Navigate to="/create" />} />
            </Routes >
        )
    }
    return (
        <Routes>
            <Route path="/" element={<AuthPage />} exact />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes >
    )

}
