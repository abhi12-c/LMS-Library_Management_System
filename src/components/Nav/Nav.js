import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faBookOpen, faBook, faBookmark } from '@fortawesome/free-solid-svg-icons'

class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
    }

    state = {};

    update() {
        this.setState(this.state);
    }

    render() {
        return (
            <div id='nav'>

                <span>LIBRARY MANAGEMENT SYSTEM</span>
                <ul>
                    <li style={window.location.pathname === '/' ? { display: 'none' } : { display: 'inline-block' }}><Link to='/' onClick={this.update}><FontAwesomeIcon icon={faHome} />&nbsp;
                        Home</Link></li>
                    <li style={window.location.pathname === '/books' ? { display: 'none' } : { display: 'inline-block' }}><Link to='/books' onClick={this.update}><FontAwesomeIcon icon={faBook} />&nbsp;Books</Link></li>
                    <li style={window.location.pathname === '/issue' ? { display: 'none' } : { display: 'inline-block' }}><Link to='/issue' onClick={this.update}><FontAwesomeIcon icon={faBookOpen} />&nbsp;Issue Book</Link></li>
                    <li style={window.location.pathname === '/return' ? { display: 'none' } : { display: 'inline-block' }}><Link to='/return' onClick={this.update}><FontAwesomeIcon icon={faBookmark} />&nbsp;Return Book</Link></li>
                    <li style={window.location.pathname === '/search' ? { display: 'none' } : { display: 'inline-block' }}><Link to='/search' onClick={this.update}> <FontAwesomeIcon icon={faSearch} />&nbsp;Search</Link></li>
                </ul>
            </div>
        );
    }
}

export default Nav;