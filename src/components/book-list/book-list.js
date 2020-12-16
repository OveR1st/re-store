import React, { Component } from 'react';
import './book-list.css';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import withBookstoreService from '../hoc';
import { booksLoaded, booksRequested } from '../../actions';
import { compose } from '../../utils/';

class BookList extends Component {

  componentDidMount () {
    // 1. receive data
    console.log(this.props); 
    const { bookstoreService, booksLoaded, booksRequested } = this.props;
    booksRequested();
    bookstoreService.getBooks()
      .then((data) => {
        // 2. dispatch action to store
        booksLoaded(data)
      })
  }


  render(){
    const { books, loading } = this.props;

    if (loading) {
      return <Spinner />
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

const mapStateToProps = ({books, loading}) => {
  return { books, loading };
}

const mapDispatchToProps =  {
   booksLoaded,
   booksRequested
}

export default compose (
  withBookstoreService(),
  connect(mapStateToProps,mapDispatchToProps),
)(BookList);

