import React, { useState, useEffect } from 'react';
import TableComponent from './Table';

const DataFetcher = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
console.log(data)
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* Your search input and other components go here */}
      <TableComponent data={data} />
    </div>
  );
};

export default DataFetcher;
