import React, { useState, useEffect } from 'react';
import stringSimilarity from 'string-similarity'; // Install string-similarity package

function Search() {
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    // Fetch song data from the API endpoint
    fetch('https://localhost:7106/api/Song/allsong')
      .then(response => response.json())
      .then(data => setSongs(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = event => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter songs based on forgiving matches and sort by similarity score
    const forgivingMatches = songs.filter(song => {
      const nameSimilarity = song.name ? stringSimilarity.compareTwoStrings(query, song.name.toLowerCase()) : 0;
      const artistSimilarity = song.artist ? stringSimilarity.compareTwoStrings(query, song.artist.toLowerCase()) : 0;
      return nameSimilarity > 0.125 || artistSimilarity > 0.125;
    }).sort((a, b) => {
      const nameSimilarityA = a.name ? stringSimilarity.compareTwoStrings(query, a.name.toLowerCase()) : 0;
      const artistSimilarityA = a.artist ? stringSimilarity.compareTwoStrings(query, a.artist.toLowerCase()) : 0;
      const nameSimilarityB = b.name ? stringSimilarity.compareTwoStrings(query, b.name.toLowerCase()) : 0;
      const artistSimilarityB = b.artist ? stringSimilarity.compareTwoStrings(query, b.artist.toLowerCase()) : 0;
      const similarityA = Math.max(nameSimilarityA, artistSimilarityA);
      const similarityB = Math.max(nameSimilarityB, artistSimilarityB);
      return similarityB - similarityA;
    });

    setFilteredSongs(forgivingMatches);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search songs..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <ul>
        {filteredSongs.map(song => (
          <li key={song.id}>
            <div>{song.name}</div>
            <div>{song.artist}</div>
            <div>{song.length}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;