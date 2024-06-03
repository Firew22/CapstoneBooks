import React,{useState, useEffect } from 'react'
import BackButtons from '../componenets/BackButtons'
import Spinner from '../componenets/Spinner'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'


const EditBook = () => {
    // State hooks to manage the form input values and loading status
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams(); // Get the book id from the URL

    useEffect(() => {
        // Fetch the book details from the API when the component mounts
        setLoading(true); // Set loading to true before making the API call
        axios.get(`http://localhost:3000/books/${id}`)
            .then(res => {
                // Set the form input values with the fetched book data
                setTitle(res.data.title);
                setAuthor(res.data.author);
                setPublishedYear(res.data.publishedYear);
                setLoading(false); // Set loading to false after the response is received
            })
            .catch(err => {
                console.log(err);
                setLoading(false); // Set loading to false if there's an error
            });
    }, [id]); // Dependency array to run the effect when `id` changes

    // Function to handle editing the book
    const handleEditBook = () => {
        // Check if all fields are filled
        if (!title || !author || !publishedYear) {
            alert('Please fill all fields');
            return;
        }

        const data = {
            title,
            author,
            publishedYear
        };

        setLoading(true); // Set loading to true before making the API call
        axios.put(`http://localhost:3000/books/${id}`, data)
            .then(res => {
                setLoading(false); // Set loading to false after the response is received
                navigate('/'); // Navigate to the home page after successfully saving the book
            })
            .catch(err => {
                setLoading(false); // Set loading to false if there's an error
                console.log(err);
            });
    };

    return (
        <div className='p-4'>
            {/* Back button to navigate to the previous page */}
            <BackButtons />
            <h1 className='text-3xl my-4'>Edit Book</h1>
            {/* Show spinner while loading */}
            {loading && <Spinner />}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div>
                    <label className='text-xl mr-4 text-gray-500'>Title</label>
                    <input
                        type='text'
                        id='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border-2 border-gray-500 px-4 w-full'
                    />
                </div>
                <div>
                    <label className='text-xl mr-4 text-gray-500'>Author</label>
                    <input
                        type='text'
                        id='author'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className='border-2 border-gray-500 px-4 w-full'
                    />
                </div>
                <div>
                    <label className='text-xl mr-4 text-gray-500'>Published Year</label>
                    <input
                        type='text'
                        id='publishedYear'
                        value={publishedYear}
                        onChange={(e) => setPublishedYear(e.target.value)}
                        className='border-2 border-gray-500 px-4 w-full'
                    />
                </div>
                {/* Button to save the book */}
                <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditBook;