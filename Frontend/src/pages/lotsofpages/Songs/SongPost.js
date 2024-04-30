/*COPY PASTE */
/*
"name": "string",
  "length": {
    "ticks": 0
  },
  "albumId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "genres": "string"

*/
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Songpost = () => {
  const [postData, setPostData] = useState({
    Id: '',
    Title: '',
    Author: '',
    Category: '',
    Content: '',
    Image: '',
    CreatedTime: new Date(),
  });

  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setPostData({ ...postData, Category: selectedCategory });

      const response = await fetch('http://localhost:5144/api/Post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      }).then(navigate('/'));

      if (response.ok) {
        console.log('Post successfully submitted!');
      } else {
        console.error('Error submitting post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e, fieldName) => {
    setPostData({ ...postData, [fieldName]: e.target.value });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    
    <form onSubmit={handleFormSubmit} className='p-5 text-center'>
      <h1>New Post</h1>
      <div className='row'>
        <div className='col'>
        </div>
      <div className='form-group row col-6 text-center'>
        <input
            type="text"
            className="form-control mt-2"
            placeholder="Author"
            value={postData.Author}
            onChange={(e) => handleChange(e, 'Author')}
            required
          />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Title"
          value={postData.Title}
          onChange={(e) => handleChange(e, 'Title')}
          required
        />
        <textarea
          className="form-control mt-2"
          placeholder={postData.Content || "Content"}
          value={postData.Content}
          onChange={(e) => handleChange(e, 'Content')}
          rows={8} // Set the number of visible rows
          required
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="ImageURL"
          value={postData.Image}
          onChange={(e) => handleChange(e, 'Image')}
          required
        />
        
            <button className="btn btn-outline-light dropdown-toggle d-inline mb-2 mt-2" type="button" data-bs-toggle="dropdown" aria-expanded="false" required>
              {selectedCategory || 'Category'}
            </button>
            <div>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#" onClick={() => handleCategorySelect('Sport')}>Sport</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handleCategorySelect('Animal')}>Animal</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handleCategorySelect('Nature')}>Nature</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handleCategorySelect('Portrait')}>Portrait</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handleCategorySelect('B@W')}>B@W</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handleCategorySelect('Art')}>Art</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handleCategorySelect('Travel')}>Travel</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handleCategorySelect('Macro')}>Macro</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handleCategorySelect('Food')}>Food</a></li>
            </ul>
            </div>
            
        <button type="submit" className="btn btn-outline-primary d-inline mb-2"><i class="bi bi-check2"></i> Post</button>
        <button className="btn btn-outline-secondary d-inline mb-2" onClick={() => navigate('/')}><i class="bi bi-arrow-left"></i> Back</button>
      </div>
      <div className='col'>
      </div>
      </div>
    </form>
  );
};

export default Songpost;