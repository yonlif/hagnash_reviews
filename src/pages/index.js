import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { get, locations_database } from '../database/databaseUtils.js'
import { BlackBorderTextField } from '../components/BlackBorderTextField.js'


const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await get(null, locations_database);
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

  const filteredLocations = locations.filter((location) => {
      const lc_name = location.name.toLowerCase()
      const lc_region = location.region.toLowerCase()
      const lc_sq = searchQuery.toLowerCase()
      return `${lc_region} - ${lc_name}`.includes(lc_sq)
    }
  );

  const handleResultClick = (location) => {
    // TODO: correct way to redirect?
    window.location.href = `/reviews/${location.name}`;
  };

  return (
    <div>
      <Typography variant="h4" component="div" sx={{ mb: 2, mt: 2, fontWeight: 'medium' }}>
        ביקורות הגנש
      </Typography>

      <BlackBorderTextField
        label="חיפוש"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchInputChange}
        sx={{ mb: 2 }}
      />
      {filteredLocations.map((location) => (
        <div
          key={location.id}
          onClick={() => handleResultClick(location)}
          style={{
            cursor: 'pointer',
            marginBottom: '16px',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            borderColor: 'black',
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
