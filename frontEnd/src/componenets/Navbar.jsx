import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout }) => {
    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">
                    BOOKS
                </Link>
                <div className="flex space-x-4">
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition duration-300"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/signin"
                                className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                className="text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition duration-300"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;