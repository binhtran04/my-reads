import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BookShelf } from '../components/BookShelf';

export const Main = ({ books, onUpdateBook }) => {
  const shelves = {
    currentlyReading: ['Currently Reading', 'currentlyReading'],
    wantToRead: ['Want to Read', 'wantToRead'],
    read: ['Read', 'read'],
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.keys(shelves).map((key) => (
            <BookShelf
              key={key}
              title={shelves[key][0]}
              books={books.filter((b) => b.shelf === key)}
              onUpdateBook={onUpdateBook}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

Main.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
};
