import type Event from '@/types/event'
import Guest from '@/types/guest';
import React from 'react';
import { ListGroup } from 'react-bootstrap';

export default function Event({event}: {event: Event}) {

    const [guests, setGuests] = React.useState<Guest[]>([])

    async function getGuests() {
      const response = await fetch('/api/getList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({eventID: event._id}),
      });
      const data = await response.json();
      setGuests(data);
    }

    React.useEffect(() => {
      getGuests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        <ListGroup>
          {guests.map((guest) => (
              <ListGroup.Item key={guest._id.toString()}>
                <h2> {guest.firstName} {guest.lastName}</h2>
              </ListGroup.Item>
          ))}
        </ListGroup>
      </>
    );}