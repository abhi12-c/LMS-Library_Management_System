import React from 'react';
import './Return.css';
import { toast } from 'react-toastify';
import { students as allstudents } from '../../constants/students'
import { books as allbooks } from '../../constants/books'
import { dateDiff } from "../../Helper";

class Return extends React.Component {

    constructor() {
        super()
        this.state = {
            header: <thead></thead>,
            bookHeader: <thead></thead>,
            Student: [],
            submit: false,
            currentStudent: [],
            issueBookByStudent: [],
            currentStudentId: ""
        };
    }

    functionInit = () => {
        this.setState({
            header: <thead id="header">
                <tr>
                    <th scope="col">Stuent Name</th>
                    <th scope="col">Student RollNumber</th>
                    <th scope="col">Student Id</th>
                    <th scope="col">Number Of books</th>
                    <th scope="col"></th>
                </tr>
            </thead>,
            bookHeader: <thead id="header">
                <tr>
                    <th scope="col">Book Id</th>
                    <th scope="col">Book Name</th>
                    <th scope="col">Semester</th>
                    <th scope="col">Issue Date</th>
                    <th scope="col"></th>
                </tr>
            </thead>
        });

        let getissueDetails = localStorage.getItem("isueDetails");
        getissueDetails = JSON.parse(getissueDetails);

        if (getissueDetails.length) {
            let allStudent = allstudents;
            let allSttudentArray = getissueDetails.map(el => { return el.student_id })
            console.log("allSttudentArray", allSttudentArray)
            let studentListToSow = allStudent.filter(el => allSttudentArray.includes(el.collge_id))
            console.log("list to show : ", studentListToSow)
            this.setState({ Student: studentListToSow })
        }
    }

    componentDidMount() {
        this.functionInit()
    }



    getNumberOfBooks = (studentId, total = false) => {
        try {
            let getissueDetails = localStorage.getItem("isueDetails");
            getissueDetails = JSON.parse(getissueDetails);
            if (getissueDetails.length) {
                let getNumberOfIssuedBooks = getissueDetails.filter(el => el.student_id == studentId)
                if (getNumberOfIssuedBooks.length) {
                    return total ? getNumberOfIssuedBooks[0].book_issue : getNumberOfIssuedBooks[0].book_issue.length
                }
            }
            return 0
        } catch (error) {
            console.log("error in get count ", error)
            return 0;
        }

    }


    returnIt = details => {
        try {
            let getissueDetails = localStorage.getItem("isueDetails");
            getissueDetails = JSON.parse(getissueDetails);
            if (getissueDetails.length) {
            console.log("id", details);
            let checkForStudentIndex = getissueDetails.findIndex(el => el.student_id == this.state.currentStudentId);
            let tempData = getissueDetails[checkForStudentIndex]["book_issue"].filter(el => el.book_id == details.id)
            let getIssueDateDiff = dateDiff(tempData[0].issue_date);
            if(getIssueDateDiff > 10) {
                let fine = (getIssueDateDiff-10)*10;
                toast.warn("The issue date is longer then 10 days you have to submit fine of Rs. "+ fine);
                return;
            }
            let tetmpBookData = this.state.issueBookByStudent;
            tetmpBookData = tetmpBookData.filter(el => el.id != details.id);
            this.setState({ issueBookByStudent: tetmpBookData })
            toast.success(details.name + " returned by student " + this.state.currentStudentId);
    
            // Remove from local storage
                if (checkForStudentIndex > -1) {
                    getissueDetails[checkForStudentIndex]["book_issue"] = getissueDetails[checkForStudentIndex]["book_issue"].filter(el => el.book_id != details.id);
                }
                localStorage.setItem("isueDetails", JSON.stringify(getissueDetails));
            }
        } catch (error) {
            console.log("Error in returnit finction", error);
            toast.error("Oops ! Something went wrong.")
        }

    }

    submitAction = () => {
        if (!this.state.currentStudentId) {
            toast.warn("Please enter the student id")
            return;
        }
        let checkForStudentId = allstudents.filter(el => el.collge_id == this.state.currentStudentId)
        if (!checkForStudentId || checkForStudentId.length < 1) {
            toast.error("Invalid student id");
            return;
        }
        let checkForIssuStudentId = this.state.Student.filter(el => el.collge_id == this.state.currentStudentId);
        if (!checkForIssuStudentId || checkForIssuStudentId.length < 1) {
            toast.warn("Current Student didn't issued any book.");
            return;
        }
        let getNumberOfBooksList = this.getNumberOfBooks(this.state.currentStudentId, true);
        let getNumberOfBooksListtempAr = [];
        getNumberOfBooksList.map(el => getNumberOfBooksListtempAr.push(el.book_id))
        let tempData = allbooks.filter(el => getNumberOfBooksListtempAr.includes(el.id));
        this.setState({ issueBookByStudent: tempData, submit: true })
        console.log("getNumberOfBooksList", tempData)

    }

    getIssueDate = (bookId) => {
        try {
            let getissueDetails = localStorage.getItem("isueDetails");
            getissueDetails = JSON.parse(getissueDetails);
            getissueDetails = getissueDetails.filter(el => el.student_id == this.state.currentStudentId)[0];
            let getDate = getissueDetails.book_issue.filter(el => el.book_id == bookId);
            return getDate[0].issue_date;
        } catch (error) {
            console.log("Error in getting issue date  : ", error)
            return "N/A"
        }
    }

    render() {
        return (
            <div id='return' className="text-center">
                <div>
                    <input className="form-control sel" type="text" placeholder="Enter Student ID" onChange={e => this.setState({ currentStudentId: e.target.value })} id="sid" min="1"></input>
                    <button className="btn btn-success" onClick={this.submitAction}>Submit</button>
                </div><br />
                {this.state.submit ?
                    <>
                        <table id="rResults" className="table table-hover">
                            {this.state.header}
                            <tbody>
                                {this.state.Student.map((el) => {
                                    if (el.collge_id == this.state.currentStudentId)
                                        return (
                                            <tr key={el.collge_id}>
                                                <td>{el.name.toUpperCase()}</td>
                                                <td>{el.roll_numbner}</td>
                                                <td>{el.collge_id}</td>
                                                <td>{this.getNumberOfBooks(el.collge_id)}</td>
                                            </tr>
                                        );
                                })}
                            </tbody>
                        </table>
                        <hr />
                        <table id="rResults" className="table table-hover">
                            {this.state.bookHeader}
                            <tbody>
                                {console.log("this.state.issueBookByStudent", this.state.issueBookByStudent)}
                                {this.state.issueBookByStudent.map((el) => {

                                    return (
                                        <tr key={el.id}>
                                            <td>{el.id}</td>
                                            <td>{el.name}</td>
                                            <td>{el.semester}</td>
                                            <td>{this.getIssueDate(el.id)}</td>
                                            <td><button className="btn btn-success" onClick={() => this.returnIt(el)}>Return</button></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </> : ""}
            </div>
        );
    }

}

export default Return;