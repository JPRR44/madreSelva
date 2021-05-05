import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import './client.scss';
import Button from '@material-ui/core/Button';
import Axios from 'axios'

const Client = () => {
  const url = '';

  // Setting the original dataset to null
  const [data, setData] = useState({
    id: '',
    name: '',
    date: '',
    description: ''

  })
  // Function that generates a random id number and adds it to every submit form
  const randomID = () => {
    var myElement = document.getElementById("id")
    myElement.value = Math.floor((Math.random() * 100) + 1)
    const newData = {...data}
    newData.id = myElement.value
    setData(newData)
  }
  // This makes that the random function is triggered at the moment the page loades
  useEffect(() => {
    randomID()
  }, [])

  // Passes the info from the form to the newData JSON
  const myFunction = (e) => {
    const newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
  }

  // Sends the json to the DB
  const submit = (e) => {
    randomID()
    e.preventDefault()
    console.log(JSON.stringify(data));
    // Axios.post(url,{
    //   id:parseInt(data.id),
    //   name:data.name,
    //   date:data.date,
    //   description:data.description
    // }).then(res=>{
    //   console.log(res.data);
    // })
  }

  return (
    <Container className='ClientContainer' onSubmit={submit}>
      <Form className='ClientForm'>
        <Form.Group >
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={(e) => myFunction(e)} type="text" placeholder="Please enter the Client´s name" id='name' />
        </Form.Group>
        <Form.Group >
          <Form.Label>Date</Form.Label>
          <Form.Control onChange={(e) => myFunction(e)} type="date" placeholder="Enter the date" id='date' />
        </Form.Group>
        <Form.Group >
          <Form.Label>Description</Form.Label>
          <Form.Control onChange={(e) => myFunction(e)} as="textarea" placeholder="Please describe the issue" id='description' />
        </Form.Group>
        <Form.Group style={{ visibility: 'hidden' }}>
          <Form.Label>ID</Form.Label>
          <Form.Control onChange={(e) => myFunction(e)} type="text" placeholder="Please enter the Client´s name" id='id' />
        </Form.Group>
        <Button variant="contained" color="primary" type="submit" className='SubmitBtn'>
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default Client;