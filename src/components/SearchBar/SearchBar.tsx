import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  // функція для обробки пошуку (action)
  const handleAction = async (formData: FormData) => {
    const query = formData.get("query")?.toString().trim();

    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

    onSearch(query);
  };

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
            // створюємо FormData вручну і викликаємо action
            const formData = new FormData();
            formData.append("query", values.query);
            handleAction(formData);

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
