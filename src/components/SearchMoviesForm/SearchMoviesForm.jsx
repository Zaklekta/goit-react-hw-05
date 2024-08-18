import { Field, Formik, Form } from "formik";
import css from "./SearchMoviesForm.module.css";
const INITIAL_VALUES = { searchQuery: "" };

const SearchMoviesForm = ({ onSearch }) => {
  const handleSubmit = (values, actions) => {
    console.log(values);
    onSearch(values.searchQuery);
    actions.resetForm();
  };

  return (
    <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <Field className={css.input} type="text" name="searchQuery" />
        <button className={css.submitBtn} type="submit">
          Search
        </button>
      </Form>
    </Formik>
  );
};

export default SearchMoviesForm;
