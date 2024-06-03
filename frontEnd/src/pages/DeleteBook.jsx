import React,{useState, useEffect } from 'react'
import BackButtons from '../componenets/BackButtons'
import Spinner from '../componenets/Spinner'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'

function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Function to handle deleting the book
  const handleDeleteBook = () => {
    setLoading(true);
    axios.delete(`http://localhost:3000/books/${id}`)
      .then(() => {
        setLoading(false); // Set loading to false after the response is received
        navigate('/'); // Navigate to the home page after successfully deleting the book
      })
      .catch((error) => {
        setLoading(false); // Set loading to false if there's an error
        alert('Error deleting');
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButtons />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div>
        <p>Are you sure you want to delete this book?</p>
        <button
          className='bg-sky-800 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-full mr-4'
          onClick={handleDeleteBook}
        >
          Yes
        </button>
        <button
          className='bg-sky-800 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-full'
          onClick={() => navigate('/')}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default DeleteBook;