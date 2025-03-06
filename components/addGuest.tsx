'use client'
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {Form, Button} from 'react-bootstrap'

export default function AddGuestForm({eventID, getGuests}: {eventID: string, getGuests: () => void}) {
    const [guestName, setGuestName] = useState(""); 
    const { status, data } = useSession()
      if (status === "loading") {
        return 
      }
    
    if(status == 'authenticated'){
      console.log(data)
      const user = data.user!.id.toString()
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          try {
              const response = await fetch('/api/addGuest', {
                  method: 'POST',
                  body: JSON.stringify({
                      name: guestName,
                      eventID: eventID,
                      addedById: user,
                      addedByName: data.user!.name
                  }),
              });
              if (!response.ok) {
                  setGuestName(""); 
                  //throw new Error(`HTTP error! status: ${response.status}`);
              }
              getGuests();
              setGuestName(""); 
          } catch (error) {
              console.error('Error adding guest:', error);
          }
      };

      return (
          <>
              <Form onSubmit={handleSubmit} className="guest-form">
                  <div className="row justify-content-center">
                      <div className="col-12 col-md-5">
                          <Form.Group className="mb-3" controlId="formGuestName">
                              <Form.Label>Enter Name:</Form.Label>
                              <Form.Control
                                  type="text"
                                  placeholder="Guest's Name"
                                  value={guestName}
                                  onChange={(e) => setGuestName(e.target.value)}
                              />
                          </Form.Group>
                          <Button type="submit" variant="primary" className="w-10">
                              Add Guest
                          </Button>
                      </div>
                  </div>
              </Form>
          </>
      );
  }}