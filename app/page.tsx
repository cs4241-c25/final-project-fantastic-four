'use client'
import {ListGroup, Button, Col, Row} from 'react-bootstrap'
import {useEffect, useState} from "react";
import Event from '../types/event';
import moment from 'moment';
import { useSession } from "next-auth/react";
import { ObjectId } from 'mongodb';
import Link from 'next/link'

export default function Home() {
  const [events, setEvents] = useState<Event[]>([])
  const { data } = useSession()

  async function getEvents() {
    const response = await fetch('/api/events');
    const data = await response.json();
    setEvents(data);
  }

  useEffect(() => {
    getEvents();
  }, []);

  const activate = async (id: string) => {
    const response = await fetch('/api/events/activate', {
      method: 'POST',
      body: JSON.stringify({"id": id})
    });

    if (response.ok) {
      await getEvents();
    }
  }

  const delEvent = async (_id: ObjectId) => {
    const response = await fetch('/api/events/delete', {
      method: 'POST',
      body: JSON.stringify({"_id": _id})
    });

    if (response.ok) {
      await getEvents();
    }
  } 

  return (
    <>
      <div className="page-container">
        <main className="container">
          <ListGroup>
            {events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((event) => (
                <ListGroup.Item key={event._id.toString()}>
                  <Row>
                    <Col as='h2'>
                      <Link href={`/events/${event._id.toString()}`} className="nav-link">
                        {event.name}
                      </Link>
                    </Col>
                    <Col><p>{event.date}</p></Col>
                    {data?.user!.role === 'admin' ?
                        <Col><Button
                            onClick={() => activate(event._id.toString())}>{event.isActive ? "Deactivate" : "Activate"}</Button></Col>
                        : <Col><p>{event.isActive ? "Active" : "Not Active"}</p></Col>}
                    <Col>{data?.user!.role === 'admin' ?
                      <Button variant='danger' onClick={() => delEvent(event._id)}>Delete</Button> : ''}
                    </Col>
                  </Row>
                </ListGroup.Item>
            ))}
          </ListGroup>
        </main>
      </div>
    </>
  );
}