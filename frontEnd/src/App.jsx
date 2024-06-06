import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './componenets/Navbar';
import Home from './pages/Home';
import CreateBooks from './pages/CreateBooks';
import DeleteBook from './pages/DeleteBook';
import EditBook from './pages/EditBook';
import ShowBooks from './pages/ShowBooks';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProtectedRoute from './componenets/ProtectedRoute';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/books/create" element={<ProtectedRoute><CreateBooks /></ProtectedRoute>} />
                <Route path="/books/edit/:id" element={<ProtectedRoute><EditBook /></ProtectedRoute>} />
                <Route path="/books/delete/:id" element={<ProtectedRoute><DeleteBook /></ProtectedRoute>} />
                <Route path="/books/details/:id" element={<ProtectedRoute><ShowBooks /></ProtectedRoute>} />
                <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    );
}

export default App;