import { Button, Col, Form, Row } from "react-bootstrap"
import type Event from '@/types/event'
import React, { Dispatch, SetStateAction } from "react"

export const EventEditItem = ({
    event, 
    getEvents,
    setEdit}: {
    event: Event, 
    getEvents: () => Promise<void>, 
    setEdit: Dispatch<SetStateAction<string>>
  }) => {
    const [name, setName] = React.useState(event.name)
    const [date, setDate] = React.useState(event.date)

    const updateEvent = async (_id: string) => {
      const response = await fetch('/api/events/update', {
        method: 'POST',
        body: JSON.stringify({"id": _id, 'name': name, 'date': date})
      });
  
      if (response.ok) {
        await getEvents();
        setEdit('')
      }else{
        const err = await response.json()
        alert(err.message)
      }
    } 

    return(
      <Form onSubmit={(e) => {e.preventDefault(); updateEvent(event._id.toString())}}>
          <Row>
            <Col as='b'>
                <Form.Group controlId="formEventName">
                  <Form.Control
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}/>
                </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formEventDate">
                    <Form.Control 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}/>
                </Form.Group>
            </Col>
            <Col>
              <Button type='submit'>Submit</Button>
            </Col>
            <Col></Col>
            <Col></Col>
        </Row>
      </Form>
    )
}