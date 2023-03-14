import React from "react";
import "./Books.css";
import { books as allbooks } from "../../constants/books";
class Books extends React.Component {
  state = {
    header: (
      <thead id="header">
        <tr>
          <th scope="col">Book Name</th>
          <th scope="col">Author</th>
          <th scope="col">Total Count</th>
          <th scope="col">Semester No</th>
        </tr>
      </thead>
    ),
    books: allbooks,
  };



  render() {
    return (
      <div id="books">
        <span id="heading">AVAILABLE BOOKS</span>
        <table id="results" className="table text-center table-hover">
          {this.state.header}
          <tbody>
            {this.state.books.map((el) => {
              return (
                <tr key={el.id}>
                  <td>{el.name.toUpperCase()}</td>
                  <td>{el.author}</td>
                  <td>{el.count}</td>
                  <td>{el.semester}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Books;
