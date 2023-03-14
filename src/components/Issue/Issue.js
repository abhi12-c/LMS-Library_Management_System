import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './Issue.css';
import { books as allbooks } from "../../constants/books";
import { students as allstudents } from '../../constants/students'
import {formatDate} from "../../Helper"
class Books extends React.Component {
    constructor() {
        super()
        this.state = {
            header: <thead></thead>,
            books: [],
            placeholderId: null,
            placeholderSemister: null,
            currentId: null,
            currentSemister: null,

        };
    }


    fetchData = () => {


        let allBookTemp = allbooks
        let tempData = allBookTemp;
        let getSem = document.getElementById("select").value
        if (this.state.placeholderSemister) {
            tempData = allBookTemp.filter(el => el.semester == this.state.placeholderSemister)
        }
        if (tempData.length) {
            toast.dismiss()
            this.setState({ books: tempData })
        } else {
            this.setState({ books: [] })
            toast.warn("Mo book found for selected options.")
        }


    }

    componentDidMount() {
        this.setState({
            header: <thead id="header">
                <tr>
                    <th scope="col">Book Name</th>
                    <th scope="col">Author</th>
                    <th scope="col">Count</th>
                    <th scope="col">Semester</th>
                </tr>
            </thead>,
        });
    }

    issueIt = el => {
        let studentId = this.state.placeholderId;
        if (!studentId) {
            toast.warn("Please enter the student id")
            return;
        }
        let checkForStudentId = allstudents.filter(el => el.collge_id == studentId)
        if (!checkForStudentId || checkForStudentId.length < 1) {
            toast.error("Invalid student id");
            return;
        }

        let getissueDetails = localStorage.getItem("isueDetails");
        getissueDetails = JSON.parse(getissueDetails);
        if (getissueDetails.length) {
            let checkForStudentIndex = getissueDetails.findIndex(el => el.student_id == studentId);
            if (checkForStudentIndex > -1) {
                if (getissueDetails[checkForStudentIndex]["book_issue"].includes(el.id)) {
                    toast.warn(el.name + "is already issued to " + studentId);
                    return;
                }
                if (getissueDetails[checkForStudentIndex]["book_issue"].length > 4) {
                    toast.warn(" 5 books is already issued to " + studentId);
                    return;
                }
                getissueDetails[checkForStudentIndex]["book_issue"].push({ issue_date: formatDate(new Date()), book_id: el.id })
            } else {
                getissueDetails.push({
                    student_id: studentId,
                    book_issue: [{ issue_date: formatDate(new Date()), book_id: el.id }]
                })
            }
        } else {
            getissueDetails.push({
                student_id: studentId,
                book_issue: [{ issue_date: formatDate(new Date()), book_id: el.id }]
            })
        }
        localStorage.setItem("isueDetails", JSON.stringify(getissueDetails));
        toast.success(el.name + " issued to " + studentId)

    }




    render() {
        return (
            <div id='issue' className="text-center">
                <div>
                    <input className="form-control sel" type="text" placeholder="Enter Student ID" id="id" min="1" onChange={(e) => this.setState({ placeholderId: e.target.value })}></input>
                    <select className="form-control sel" id="select" defaultValue="Select Semester" onChange={(e) => this.setState({ placeholderSemister: e.target.value })}>
                        <option value="Select Semester">Select Semester</option>
                        <option value="1">1st Sem</option>
                        <option value="2">2nd Sem</option>
                        <option value="3">3rd Sem</option>
                        <option value="4">4th Sem</option>
                        <option value="5">5th Sem</option>
                        <option value="6">6th Sem</option>
                        <option value="7">7th Sem</option>
                        <option value="8">8th Sem</option>
                    </select>
                    <button className="btn btn-success" onClick={this.fetchData}>Submit</button>
                </div>
                {this.state.books.length ?
                    <table id="results" className="table table-hover">
                        {this.state.header}
                        <tbody>
                            {this.state.books.map((el) => {
                                return (
                                    <tr key={el.id}>
                                        <td>{el.name.toUpperCase()}</td>
                                        <td>{el.author}</td>
                                        <td>{el.count}</td>
                                        <td>{el.semester}</td>
                                        <td><button className="btn btn-primary" onClick={() => this.issueIt(el)}>Issue</button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    : ""}
            </div>
        );
    }

}

export default Books;