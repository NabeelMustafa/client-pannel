import React from 'react';
import Clients from '../client/Clients';
import SideBar from './SideBar';
import { Link} from 'react-router-dom';

export default () => {
  return (
    <div>
      <div className="row">
        <div className='col-md-9'>   
        <Clients/>
        </div>
        <div className='col-md-3'> 
        <SideBar />

           
        </div>
      </div>
    </div>
  )
}
