import React from 'react'
import Card from './card'
import desarrolladores from './Json/desarrolladores.json'
//import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import Volver from "./Volver"


function Cards() {
  return (
    <div className='container d-flex justify-content-center h-100'>
      <div className='row'>
        {
          desarrolladores.map(des => (
            <div className='col-md-4' key={des.id}>
            <Card edad={des.edad} title={des.title} imagen={des.imagen} text={des.text} repositorio={des.repositorio}/>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default Cards
