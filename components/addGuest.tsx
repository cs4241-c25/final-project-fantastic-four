'use client'
import { ObjectId } from 'mongodb';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {Form, Button} from 'react-bootstrap'
import Events from './eventList';

export default function AddGuestForm({eventID, getGuests}: {eventID: string, getGuests: () => void}) {
    const [guestName, setGuestName] = useState(""); 
    const { status, data } = useSession()
      if (status === "loading") {
        return 
      }
    
    if(status == 'authenticated'){
      console.log(data)
      let user = data.user!.id.toString()
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          try {
              const response = await fetch('/api/addGuest', {
                  method: 'POST',
                  body: JSON.stringify({
                      name: guestName,
                      eventID: eventID,
                      addedBy: user
                  }),
              });
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              const result = await response.json();
              getGuests();
          } catch (error) {
              console.error('Error adding guest:', error);
          }
      };

      return (
          <>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId='formGuestName'>
              <Form.Label>Enter Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Guest's Name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />
            </Form.Group>
    
            <Button type="submit" variant="primary">
              Add Guest
            </Button> 
          </Form>
        </>
      );
  }}