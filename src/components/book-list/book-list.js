import React, { Component } from 'react';
import './book-list.css';
import { connect } from 'react-redux';

import ErrorIndicator from '../error-indicator';
import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import withBookstoreService from '../hoc';
import { fetchBooks } from '../../actions';
import { compose } from '../../utils/';


class BookList extends Component {

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

const mapDispatchToProps = (dispatch, { bookstoreService }) => { // для отправки действий в reducer 
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch)
  }
}

export default compose (
  withBookstoreService(),
  connect(mapStateToProps,mapDispatchToProps),
)(BookList);

