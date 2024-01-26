import React from 'react'
import { useLocation } from 'react-router-dom';

const OwnerForm =()=> {

  const {state} = useLocation();
  const { id, name,buildings } = state;
  return (
    <div> -- {id} -- {name} -- {buildings.map((item)=>(<>item - {item}</>))}</div>
  )
}

export default OwnerForm