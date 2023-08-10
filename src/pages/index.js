import React, { useState, useEffect } from 'react';
import { TextField, Typography } from '@mui/material';
import { get } from '../database/databaseUtils.js'




const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await get(null, "locations");
        var unique = [...new Map(data.map(item => [item.name, item])).values()]; 
        setLocations(unique);
      } catch (error) {
        console.log('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredHotels = locations.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleResultClick = (location) => {
    // TODO: correct way to redirect?
    window.location.href = `/reviews/${location.name}`;
  };

  return (
    <div>
      <Typography variant="h4" component="div" sx={{ mb: 2, mt: 2 }}>
        ביקורות הגנש
      </Typography>

      <TextField
        label="חיפוש"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchInputChange}
        sx={{ mb: 2 }}
      />
      {filteredHotels.map((location) => (
        <div
          key={location.id}
          onClick={() => handleResultClick(location)}
          style={{
            cursor: 'pointer',
            marginBottom: '16px',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        >
          <Typography variant="h6" component="div">
            {location.region} - {location.name}
          </Typography>
          <Typography variant="body1">{location.description}</Typography>
        </div>
      ))}
    </div>
  );
};

export default Home;
