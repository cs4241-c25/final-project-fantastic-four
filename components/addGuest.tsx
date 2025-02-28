'use client'
import { useState } from 'react';
import {Form, Button} from 'react-bootstrap'

export default function AddGuestForm() {
    const [guestName, setGuestName] = useState(""); 
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setGuestName(event.target.value); 
    };
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault(); 
      console.log("Guest Added:", guestName);
      // You can send `guestName` to an API here 
    };

    return (
        <>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Enter Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Guest's Name"
              value={guestName}
              onChange={handleInputChange} // Track user input
            />
          </Form.Group>
  
          <Button type="submit" variant="primary">
            Add Guest
          </Button>
        </Form>
      </>
    );
}