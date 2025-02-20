'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import {Button, ListGroup} from 'react-bootstrap'
import {useEffect, useState} from "react";
import Event from '../lib/event';

export default function Home() {
  const [events, setEvents] = useState<Event[]>([])

  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    },
  })

  async function getEvents() {
    const response = await fetch('api/getEvents');
    const data = await response.json();
    setEvents(data);
  }

  useEffect(() => {
    getEvents();
  }, []);

  if (status === "loading") {
    return
  }

  return (
    <>
      <Button onClick={() => signOut()}>
        Log Out
        <br/>
        {data.user!.name}
      </Button>
      <ListGroup>
        {events.map((event) => (
            <ListGroup.Item key={event._id.toString()}>
              <h2>{event.name}</h2>
              <p>Date: {event.date}</p>
              <p>{event.isActive? "Active" : "Not Active"}</p>
            </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}