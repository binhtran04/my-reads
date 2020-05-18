import React from 'react';
import { debounce } from 'lodash';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Main } from './pages/Main';
import { Search } from './pages/Search';

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: [],
    searchTerm: '',
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.setState((prev) => {
        // Update the shelf on the searched books
        const udpatedSearchedBooks = prev.searchedBooks.map((item) => {
          if (item.id === book.id) {
            return { ...item, shelf };
          }
          return item;
        });

        // check if the book is already in the books list
        const found = prev.books.find((b) => b.id === book.id);

        // if found, just update the shelf;
        // otherwise, push the book to the books list
        if (found) {
          return {
            books: prev.books.map((item) => {
              if (item.id === book.id) {
                return { ...item, shelf };
              }
              return item;
            }),
            searchedBooks: udpatedSearchedBooks,
          };
        } else {
          return { books: prev.books.concat([{ ...book, shelf }]), searchedBooks: udpatedSearchedBooks };
        }
      });
    });
  };

  handleSeachTermChange = (event) => {
    const searchTerm = event.target.value;
    this.setState({ searchTerm });
    this.debouncedSearch(searchTerm);
  };

  search = (searchTerm) => {
    BooksAPI.search(searchTerm)
      .then((response) => {
        if (response.error) {
          this.setState({ searchedBooks: [] });
        } else {
          const searchedBooks = response
            .filter((item) => {
              // filter broken books
              return item.authors && item.imageLinks;
            })
            .map((sb) => {
              // Get the correct shelf for searched books
              // since the API does not return the shelf properties
              const found = this.state.books.find((b) => b.id === sb.id);
              if (found) return found;
              return sb;
            });

          this.setState({
            searchedBooks,
          });
        }
      })
      .catch(() => {
        this.setState({
          searchTerm: '',
          searchedBooks: [],
        });
      });
  };

  debouncedSearch = debounce(this.search, 500);

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact render={() => <Main books={this.state.books} onUpdateBook={this.updateBook} />} />
            <Route
              path="/search"
              render={() => (
                <Search
                  onUpdateBook={this.updateBook}
                  onSearchTermChange={this.handleSeachTermChange}
                  searchTerm={this.state.searchTerm}
                  searchedBooks={this.state.searchedBooks}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default BooksApp;
