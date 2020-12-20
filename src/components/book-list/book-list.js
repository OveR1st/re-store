import React, { Component } from 'react';
import './book-list.css';
import { compose } from '../../utils/';

import ErrorIndicator from '../error-indicator';
import BookListItem from '../book-list-item';
import Spinner from '../spinner';

import withBookstoreService from '../hoc';
import { connect } from 'react-redux';

import { fetchBooks } from '../../actions';

const BookList = ({ books }) => {
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

class BookListContainer extends Component {

  componentDidMount () {
    this.props.fetchBooks();
  }


  render(){
    const { 
      books,
      loading,
      error } = this.props;

    if (loading) {
      return <Spinner />
    }

    if(error) {
      return <ErrorIndicator />
    }

    return <BookList books={books}/>
  }
}



const mapStateToProps = ({ books, loading, error }) => { // получение объекта state в компонент
  return { books, loading, error };
}

const mapDispatchToProps = (dispatch, { bookstoreService }) => { // для отправки действий в reducer 
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch)
  }
}

export default compose (
  withBookstoreService(),
  connect(mapStateToProps,mapDispatchToProps),
)(BookListContainer);

