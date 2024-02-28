import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setData(response.data);
        setFilteredData(response.data);
        console.log(response.data)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const initialValues = {
    searchQuery: ''
  };

  const validation = Yup.object().shape({
      searchQuery: Yup.string()
          .required('Search query is required')
          .matches(/^[a-zA-Z\s]*$/, 'Search query should not contain numbers or special characters')
      

      
  });

  const handleSubmit = (values) => {
    const filtered = data.filter(item =>
      item.title.toLowerCase().includes(values.searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div className="search-page">
      <h1 className="mt-5 mb-4">Search Page</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <Field type="text" name="searchQuery" className="form-control" placeholder="Enter search query" />
            <ErrorMessage name="searchQuery" component="div" className="text-danger" />
          </div>
          <button type="submit" className="btn btn-primary">Search</button>
        </Form>
      </Formik>
      {loading ? <p>Loading...</p> :
        filteredData.length === 0 ? <p>No results found</p> :
          <ul className="list-group mt-4">
            {filteredData.map(item => (
              <li key={item.id} className="list-group-item">{item.title}</li>
            ))}
          </ul>
      }
    </div>
  );
};

export default SearchPage;
