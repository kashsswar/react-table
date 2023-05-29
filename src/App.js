import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';

const App = () => {
  const [data, setData] = useState([]);
  const [editedData, setEditedData] = useState([]);

  useEffect(() => {
    fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/reciped9d7b8c.json')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setEditedData(data.map((item) => ({ ...item }))); // Create a copy of the data for editing
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, []);

  const handleReset = () => {
    setEditedData(data.map((item) => ({ ...item })));
  };
  

  return (
    <div className="App">
      <h1>React Table Application</h1>
      <DataTable data={editedData} setEditedData={setEditedData} />
     
    </div>
  );
};

export default App;
