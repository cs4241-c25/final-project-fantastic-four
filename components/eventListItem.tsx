import { Button, Col, Row } from "react-bootstrap"
import type Event from '@/types/event'
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"
import { useSession } from "next-auth/react"
import React from "react"

export const EventListItem = ({
    event, 
    getEvents,
    setEdit}: {
    event: Event, 
    getEvents: () => Promise<void>, 
    setEdit: Dispatch<SetStateAction<string>>
  }) => {
    const { data } = useSession()
  
    const activate = async (id: string) => {
      const response = await fetch('/api/events/activate', {
        method: 'POST',
        body: JSON.stringify({"id": id})
      });
  
      if (response.ok) {
        await getEvents();
      }
    }
  
    const delEvent = async (_id: string) => {
      const response = await fetch('/api/events/delete', {
        method: 'POST',
        body: JSON.stringify({"_id": _id})
      });
  
      if (response.ok) {
        await getEvents();
      }
    } 

    return(
        <Row>
            <Col as='b'>
                <Link href={`/events/?eventID=${event._id.toString()}`} className="nav-link">
                    {event.name}
                </Link>
            </Col>
            <Col><p>{event.date}</p></Col>
            {data?.user!.role === 'admin' ?
                <Col><Button
                    onClick={() => activate(event._id.toString())}>{event.isActive ? "Deactivate" : "Activate"}</Button></Col>
                : <Col><p>{event.isActive ? "Active" : "Not Active"}</p></Col>}
            <Col>{data?.user!.role === 'admin' ? 
                <Button onClick={() => setEdit(event._id.toString())}>Edit</Button> : ''}
            </Col>
            <Col>{data?.user!.role === 'admin' ? 
                <Button variant='danger' onClick={() => delEvent(event._id.toString())}>Delete</Button> : ''}
            </Col>
        </Row>
    )
}