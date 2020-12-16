import React, { Component } from 'react';
import './book-list.css';
import { connect } from 'react-redux';

import ErrorIndicator from '../error-indicator';
import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import withBookstoreService from '../hoc';
import { booksLoaded, booksRequested, booksError } from '../../actions';
import { compose } from '../../utils/';

class BookList extends Component {

  componentDidMount () {
    // 1. receive data
    console.log(this.props); 
    const { bookstoreService, booksLoaded, booksRequested, booksError } = this.props;
    booksRequested();
    bookstoreService.getBooks()
      .then((data) => {
        // 2. dispatch action to store
        booksLoaded(data)
      })
      .catch((err) => booksError(err));
  }


  render(){
    const { books, loading, error } = this.props;

    if (loading) {
      return <Spinner />
    }

    if(error) {
      return <ErrorIndicator />
    }

    return (
      <ul className="book-list">
        {
          books.map( (book) => {
            return <li key={book.id}><BookListItem book={book}/></li>
          })
        }
      </ul>
    );
  }
}

const mapStateToProps = ({ books, loading, error }) => { // получение объекта state в компонент
  return { books, loading, error };
}

const mapDispatchToProps =  { // отправка действий в reducer 
   booksLoaded,
   booksRequested,
   booksError
}

export default compose (
  withBookstoreService(),
  connect(mapStateToProps,mapDispatchToProps),
)(BookList);

