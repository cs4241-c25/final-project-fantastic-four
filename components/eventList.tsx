'use client'
import {ListGroup} from 'react-bootstrap'
import Guest from '@/types/guest'; 
import React from 'react';

export default function Events({eventID}: {eventID: string}) {

    const [guests, setGuests] = React.useState<Guest[]>([])

    async function getGuests() {
      const response = await fetch('/api/getList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({eventID}),
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
          {guests.filter(guest => guest.eventID.toString() === eventID ).map((guest) => (
              <ListGroup.Item key={guest._id.toString()}>
                <h2> {guest.name} </h2>
              </ListGroup.Item>
          ))}
        </ListGroup>
      </>
    );}

