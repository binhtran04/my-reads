import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Book } from '../components/Book';

export const Search = ({ onSearchTermChange, searchTerm, searchedBooks, onUpdateBook }) => {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/" />
        <div className="search-books-input-wrapper">
          {/*
        NOTES: The search from BooksAPI is limited to a particular set of search terms.
        You can find these search terms here:
        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
        you don't find a specific author or title. Every search is limited by search terms.
      */}
          <input type="text" placeholder="Search by title or author" value={searchTerm} onChange={onSearchTermChange} />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchedBooks.map((book) => (
            <li key={book.id}>
              <Book book={book} onUpdateBook={onUpdateBook} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

Search.propTypes = {
  onSearchTermChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  searchedBooks: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
};
