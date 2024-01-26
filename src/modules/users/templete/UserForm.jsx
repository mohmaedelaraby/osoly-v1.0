import React from 'react'
import { useLocation } from 'react-router-dom';

const UserForm =()=> {

  const {state} = useLocation();
  const { id, name,email } = state;
  return (
    <div> -- {id} -- {name} -- {email}</div>
  )
}

export default UserForm