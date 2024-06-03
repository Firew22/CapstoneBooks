import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButtons from '../componenets/BackButtons'; // Ensure this path is correct
import Spinner from '../componenets/Spinner'; // Ensure this path is correct

function ShowBooks() {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:3000/books/${id}`)
            .then(res => {
                setBook(res.data);
                setLoading(false);
            })
            .catch(() => {
                console.log('error');
                setLoading(false);
            });
    }, [id]); 

    return (
        <div className='p-4'>
            <BackButtons />
            <h1 className='text-3xl my-4'>Show Book</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Id</span>
                        <span>{book._id}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Title</span>
                        <span>{book.title}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Author</span>
                        <span>{book.author}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Published Year</span>
                        <span>{book.publishedYear}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Created At</span>
                        <span>{new Date(book.createdAt).toLocaleString()}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
                        <span>{new Date(book.updatedAt).toLocaleString()}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShowBooks;