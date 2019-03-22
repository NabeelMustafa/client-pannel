import React from 'react'
import { Link } from "react-router-dom";
import './layout.css';

export default () => {
  return (
    <div>
        <Link to='/client/add' className="btn  btn-block">
            <i className="fas fa-plus"></i>Add new client
        </Link> 
    </div> 
  )
}