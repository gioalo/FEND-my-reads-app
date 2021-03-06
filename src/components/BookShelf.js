import React from 'react';
import BooksList from './BooksList';
import PropTypes from 'prop-types';

class BookShelf extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired
  }

  groupByShelf(array, property) {
    return array.filter(book=>{
      if(book.shelf === property) {
        return book;
      }
      return false;
    });
  }

  render(){

    // Adding filter categories problematically please write any suggestions
    // on how to implement the filter component for the list of books better
    // const shelves =  [{name:'currentlyReading'},{name:'wantToRead'},{name:'read'}];
    const categories = this.props.getCategories();

    // NOTE: please if you change activeCategory state from the App component to something else
    // dont forget to make that change/update here 'all'
    const filterByShelf = categories.filter(shelf => {
      if(this.props.category === 'all') {
        return shelf;
      } else if (shelf === this.props.category) {
        return shelf;
      } else {
        return false;
      }
    });

    return (
      <React.Fragment>

        {

          filterByShelf.map(shelf => (

            <div className="bookshelf" key={shelf} id={shelf}
              style={{
                backgroundColor: `${shelf === 'currentlyReading' ? '#fafafa': shelf === 'read' ? '#eee' : '#f5f5f5'}`
              }}
            >
              <h2 className="bookshelf-title">{shelf.replace(/([a-z])([A-Z])/g, "$1 $2")} <span>{this.props.counter(shelf)}</span> </h2>
              <div className="bookshelf-books">
                <BooksList
                  updateBookShelf={this.props.updateBookShelf}
                  books={this.groupByShelf(this.props.data, shelf)}
                  />
              </div>
            </div>

          ))
      }
      </React.Fragment>
    )
  }

}

export default BookShelf