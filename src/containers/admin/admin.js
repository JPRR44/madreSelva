import React from 'react';
import Admin from '../../components/admin/admin';
import Navbar from '../../components/navbar/navbar';
import './admin.scss'

const AdminPage = () => {
  return(
    <div className='Admin'>
      <Navbar/>
      <div className='Title'>MADRESELVA</div>
      <div className='Subtitle'>Ecosistema de educación artística</div>
      <Admin/>
    </div>
  )
}

export default AdminPage;