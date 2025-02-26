'use client'
import {ListGroup, Button, Col, Row} from 'react-bootstrap'
import {useEffect, useState} from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([])
  const { data } = useSession()

  async function getEvents() {
    const response = await fetch('api/getEvents');
    const data = await response.json();
    setEvents(data);
  }

  useEffect(() => {
    getEvents();
  }, []);

  const activate = async (id: string) => {
    const response = await fetch('/api/activate', {
      method: 'POST',
      body: JSON.stringify({"id": id})
    });

    if (response.ok) {
      await getEvents();
    }
  }

  return (
    <>
      <ListGroup>
        {events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((event) => (
            <ListGroup.Item key={event._id.toString()}>
              <Row>
                <Col><h2>{event.name}</h2></Col>
                <Col><p>{event.date}</p></Col>
                {data?.user!.role === 'admin' ?
                    <Col><Button
                        onClick={() => activate(event._id.toString())}>{event.isActive ? "Deactivate" : "Activate"}</Button></Col>
                    : <Col><p>{event.isActive ? "Active" : "Not Active"}</p></Col>}
              </Row>
            </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}