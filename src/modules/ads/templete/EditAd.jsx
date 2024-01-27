import React from 'react'
import { useLocation } from 'react-router-dom';

const EditAd =()=> {

  const {state} = useLocation();
  const { id, name } = state;
  return (
    <div> -- {id} -- {name}</div>
  )
}

export default EditAd