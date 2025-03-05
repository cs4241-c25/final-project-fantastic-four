'use client'
import { ListGroup, Button } from 'react-bootstrap';
import Guest from '@/types/guest'; 
import React from 'react';
import { useSession } from 'next-auth/react';

export default function Events({ guests, delGuest }: { guests: Guest[], delGuest: (id: string) => void }) {
  const { data } = useSession();
    return (
      <>
        <ListGroup>
          {guests.map((guest) => (
            <ListGroup.Item key={guest._id.toString()} className="d-flex justify-content-between align-items-center">
              <div className="flex-grow-1 d-flex justify-content-between">
                <b>{guest.name}</b>
                <span className="text-center w-25">{guest.addedByName}</span>
              </div>
              {(data?.user?.role === 'admin' || data?.user?.id === guest.addedById) && (
        <Button
          variant="danger"
          onClick={() => delGuest(guest._id.toString())}
        >
          Remove Guest
        </Button>
        )}  
            </ListGroup.Item>
          ))}
        </ListGroup>
      </>
    );
}