/*COPY PASTE */
/*
https://localhost:7106/api/Song/updatebyid/03de46a3-5f4e-4a5b-bbf1-89fb25bf7142'
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "length": {
    "ticks": 0,
    "days": 0,
    "hours": 0,
    "milliseconds": 0,
    "microseconds": 0,
    "nanoseconds": 0,
    "minutes": 0,
    "seconds": 0,
    "totalDays": 0,
    "totalHours": 0,
    "totalMilliseconds": 0,
    "totalMicroseconds": 0,
    "totalNanoseconds": 0,
    "totalMinutes": 0,
    "totalSeconds": 0
  },
  "albumId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "genre": "string",
  "album": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "released": 0,
    "artistId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "artist": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "albums": [
        "string"
      ],
      "artistSongs": [
        "string"
      ]
    },
    "songs": [
      "string"
    ]
  },
  "artistSongs": [
    {
      "id": 0,
      "artistId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "songId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "artist": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "albums": [
          "string"
        ],
        "artistSongs": [
          "string"
        ]
      },
      "song": "string"
    }
  ],
  "playlistSongs": [
    {
      "id": 0,
      "songId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "playlistId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "playlist": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "playlistSongs": [
          "string"
        ],
        "user": {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "name": "string",
          "playlists": [
            "string"
          ]
        }
      },
      "song": "string"
    }
  ]
}

*/
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function PostModify() {
  const [postData, setPostData] = useState({
    Id: '',
    Title: '',
    Author: '',
    Category: '',
    Content: '',
    Image: '',
  });

  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setPostData({ ...postData, Category: selectedCategory });

      const response = await fetch(`http://localhost:5144/api/Post/${postData.Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        console.log('Post successfully updated!');
        navigate('/');
      } else {
        console.error('Error updating post');
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
        <h1>Modify post</h1>
      <div className='row'>
        <div className='col'>
        </div>
      <div className='form-group row col-6 text-center'>
      <input
          type="text"
          className="form-control mt-2"
          placeholder={postData.Author || "Author"}
          value={postData.Author}
          onChange={(e) => handleChange(e, 'Author')}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder={postData.Title || "Title"}
          value={postData.Title}
          onChange={(e) => handleChange(e, 'Title')}
        />
        <textarea
          className="form-control mt-2"
          placeholder={postData.Content || "Content Placeholder"}
          value={postData.Content}
          onChange={(e) => handleChange(e, 'Content')}
          rows={8} // Set the number of visible rows
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder={postData.Image || "ImageURL"}
          value={postData.Image}
          onChange={(e) => handleChange(e, 'Image')}
        />
        
          
            <button className="btn btn-outline-light dropdown-toggle d-inline mb-2 mt-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">{selectedCategory || 'Category'}</button>
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

export default PostModify;