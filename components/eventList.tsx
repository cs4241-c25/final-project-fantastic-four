'use client'
import { ListGroup, Button } from 'react-bootstrap';
import Guest from '@/types/guest'; 
import React from 'react';
import { useSession } from 'next-auth/react';

export default function Events({ guests, delGuest }: { guests: Guest[], delGuest: (id: string) => void }) {
  const { data } = useSession();
    return (
        <>
            <ListGroup className="guest-list-container">
                {guests.map((guest) => (
                    <ListGroup.Item key={guest._id.toString()} className="guest-list-item">
                        <div className="guest-item-content">
                            <span className="guest-name">{guest.name}</span>
                            <span className="added-by">{guest.addedByName}</span>
                        </div>
                        {(data?.user?.role === 'admin' || data?.user?.id === guest.addedById) && (
                            <Button
                                variant="danger"
                                className="remove-guest-button"
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