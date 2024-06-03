import React,{useState} from 'react'
import BackButtons from '../componenets/BackButtons'
import Spinner from '../componenets/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const CreateBooks = () => {
    // State hooks to manage the form input values and loading status
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function to handle saving the book
    const handleSaveBook = () => {
        const data = {
            title,
            author,
            publishedYear
        };
        setLoading(true); // Set loading to true before making the API call
        axios.post('http://localhost:3000/books', data)
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
            <h1 className='text-3xl my-4'>Create Book</h1>
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
                <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default CreateBooks;