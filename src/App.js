import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Main } from './pages/Main';
import { Search } from './pages/Search';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({ books });
    });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.setState(({ books }) => {
        return {
          books: books.map((item) => {
            if (item.id === book.id) {
              return { ...item, shelf };
            }
            return item;
          }),
        };
      });
    });
  };

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Route path="/" exact render={() => <Main books={this.state.books} onUpdateBook={this.updateBook} />} />
          <Route path="/search" component={Search} />
        </BrowserRouter>
      </div>
    );
  }
}

export default BooksApp;
