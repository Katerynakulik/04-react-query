import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchMovies } from "../../services/movieService";
import type { MoviesHttpResponse } from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import { Toaster, toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
function App() {
  const [selectedMovie, setSelectedMovie] = useState<null | Movie>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isSuccess } = useQuery<MoviesHttpResponse>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim().length > 0,
    placeholderData: (prev: MoviesHttpResponse | undefined) => prev,
  });
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };
  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const handleCloseModal = () => {
    setSelectedMovie(null);
  };
  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };
  useEffect(() => {
    if (isSuccess && data?.results.length === 0) {
      toast.error("No movies found for your search.");
    }
  }, [isSuccess, data]);
  return (
    <div>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {data && data.results.length > 0 && (
        <>
          <MovieGrid movies={data.results} onSelect={handleSelectMovie} />

          {data.total_pages > 1 && (
            <ReactPaginate
              pageCount={data.total_pages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              forcePage={page - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}

      <Toaster position="top-right" />
    </div>
  );
}
export default App;
