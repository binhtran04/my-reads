import React from 'react';
import PropTypes from 'prop-types';

export const Book = ({ book, onUpdateBook }) => {
  const handleChangeShelf = (event) => {
    const newShelf = event.target.value;
    onUpdateBook(book, newShelf);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${book.imageLinks.smallThumbnail}")`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select value={book.shelf || 'none'} onChange={handleChangeShelf}>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors.map((author) => (
        <div className="book-authors" key={author}>
          {author}
        </div>
      ))}
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    shelf: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    imageLinks: PropTypes.shape({
      smallThumbnail: PropTypes.string,
      thumbnail: PropTypes.string,
    }),
  }),
  onUpdateBook: PropTypes.func.isRequired,
};
