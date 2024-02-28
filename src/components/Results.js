import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSearch } from '../hooks/useSearch';

const SearchForm = () => {
  const { loading } = useSearch();

  const initialValues = {
    title: '',
    completed: ''
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().nullable(),
    completed: Yup.string().nullable()
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {}}
    >
      <Form>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <Field type="text" name="title" className="form-control" />
          <ErrorMessage name="title" component="div" className="text-danger" />
        </div>
        <div className="form-group">
          <label htmlFor="completed">Completed:</label>
          <Field as="select" name="completed" className="form-control">
            <option value="">Select...</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Field>
          <ErrorMessage name="completed" component="div" className="text-danger" />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </Form>
    </Formik>
  );
};

export default SearchForm;
