'use client'
import {useEffect, useState} from "react";
import Event from '../types/event';
import { EventListItem } from '@/components/eventListItem';
import { EventEditItem } from '@/components/eventEditItem';
import { ListGroup, Container } from 'react-bootstrap';

export default function Home() {
  const [events, setEvents] = useState<Event[]>([])
  const [edit, setEdit] = useState('')

  async function getEvents() {
    const response = await fetch('/api/events');
    const data = await response.json();
    setEvents(data);
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
      <>
        <div className="container">
          <Container fluid className="party-list-container">
            <ListGroup variant="flush">
              {events
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((event) => (
                      <ListGroup.Item key={event._id.toString()} className="party-list-item">
                        {edit == event._id.toString() ? (
                            <EventEditItem
                                event={event}
                                getEvents={getEvents}
                                setEdit={setEdit}
                            />
                        ) : (
                            <EventListItem
                                event={event}
                                getEvents={getEvents}
                                setEdit={setEdit}
                            />
                        )}
                      </ListGroup.Item>
                  ))}
            </ListGroup>
          </Container>
        </div>
      </>
  );
}