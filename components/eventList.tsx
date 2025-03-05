'use client'
import { ListGroup, Button } from 'react-bootstrap';
import Guest from '@/types/guest'; 
import React from 'react';

export default function Events({ guests, delGuest }: { guests: Guest[], delGuest: (id: string) => void }) {
    return (
      <>
        <ListGroup>
          {guests.map((guest) => (
            <ListGroup.Item key={guest._id.toString()} className="d-flex justify-content-between align-items-center">
              <b>{guest.name}</b>
              <Button variant="danger" onClick={() => delGuest(guest._id.toString())}>
                Remove Guest
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </>
    );
}