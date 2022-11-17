import React from 'react'
import './cards.css'
import { ListGroup } from 'react-bootstrap'
import { Card } from 'react-bootstrap'



function card({title,edad, imagen, text, repositorio}) {
  return (
    <div className='card text-center bg-dark'>
        <img className='imagen-card' src={imagen} alt='Fake'></img>
      <div className='card-body text-light'>
            <h4 className='card-title'>{title}</h4>
            <ListGroup className="list-group-flush">
            <ListGroup.Item>Edad: {edad}</ListGroup.Item>
            <ListGroup.Item><p className='card-text text-primary'>Intereses: {text}</p></ListGroup.Item>
            <ListGroup.Item><Card.Link href={repositorio}>Mi repositorio</Card.Link></ListGroup.Item>
            </ListGroup>
            
            
      </div>
    </div>
  )
}

export default card
