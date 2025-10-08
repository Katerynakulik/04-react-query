import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <Formik
          initialValues={{ query: "" }}
          onSubmit={(values, { resetForm }) => {
            const topic = values.query.trim();

            if (!topic) {
              toast.error("Please enter your search query.");
              return;
            }

            onSearch(topic);
            resetForm();
          }}
        >
          {() => (
            <Form className={css.form}>
              <Field
                className={css.input}
                type="text"
                name="query"
                autoComplete="off"
                placeholder="Search movies..."
                autoFocus
              />
              <button className={css.button} type="submit">
                Search
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </header>
  );
}
