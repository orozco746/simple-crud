import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Add = () => {

  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    desc: "",
    cover: "",
    price: null
  });

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleClick = async e => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8800/books", book)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='form'>
      <h1>Add New Book</h1>
      <input type="text" placeholder='title' onChange={handleChange} name='title' />
      <input type="text" placeholder='desc' onChange={handleChange} name='desc' />
      <input type="text" placeholder='cover' onChange={handleChange} name='cover' />
      <input type="number" placeholder='price' onChange={handleChange} name='price' />
      <button onClick={handleClick}> Add</button>
    </div>
  )
}

export default Add