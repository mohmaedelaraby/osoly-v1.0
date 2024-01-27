import React from 'react'
import { useLocation } from 'react-router-dom';

const EditOwner =()=> {

  const {state} = useLocation();
  const { id, name } = state;
  return (
    <div> {id} -- {name}  </div>
  )
}

export default EditOwner