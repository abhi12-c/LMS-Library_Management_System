import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './search.css';
import { books as allbooks } from "../../constants/books";
import { students as allstudents } from '../../constants/students'
class Books extends React.Component {
    constructor() {
        super()
        this.state = {
            header: <thead></thead>,
            books: allbooks,
            placeholderId: null,
            placeholderSemister: null,
            currentId: null,
            currentSemister: null
        };
    }


    fetchData = () => {


        let allBookTemp = allbooks
        let tempData = allBookTemp;
        if (this.state.placeholderId) {
            tempData = allBookTemp.filter(el => el.id == this.state.placeholderId)
        }

        this.setState({ books: tempData })

    }

    componentDidMount() {
        this.setState({
            header: <thead id="header">
                <tr>
                    <th scope="col">Book ID</th>
                    <th scope="col">Book Name</th>
                    <th scope="col">Author</th>
                    <th scope="col">Number</th>
                    <th scope="col">Semester</th>
                </tr>
            </thead>,
        });
    }



    render() {
        return (
            <div id='issue' className="text-center">
                <div>
                    <input className="form-control sel" type="text" placeholder="Enter Book ID" id="id" min="1" onChange={(e) => this.setState({ placeholderId: e.target.value })}></input>
                    <button className="btn btn-success" onClick={this.fetchData}>Submit</button>
                </div>
                <table id="results" className="table table-hover">
                    {this.state.header}
                    <tbody>
                        {this.state.books.length ?
                            <>
                                {this.state.books.map((el) => {
                                    return (
                                        <tr key={el.id}>
                                            <td>{el.id}</td>
                                            <td>{el.name.toUpperCase()}</td>
                                            <td>{el.author}</td>
                                            <td>{el.count}</td>
                                            <td>{el.semester}</td>
                                            {/* <td><button className="btn btn-primary" onClick={() => this.issueIt(el)}>Issue</button></td> */}
                                        </tr>
                                    );
                                })}</> : "No Record found" }
                    </tbody>
                </table>
            </div>
        );
    }

}

export default Books;