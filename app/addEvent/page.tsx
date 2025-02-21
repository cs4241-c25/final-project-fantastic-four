'use client'
import { Form, Button } from 'react-bootstrap/'
import React, { useState } from 'react'
import Event from '../../lib/event'

export default function Home() {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newEvent: Event = {
            name: eventName,
            isActive: true,
            date: eventDate,
        }
        try {
            const response = await fetch('api/addEvent', {
                method: 'POST',
                body: JSON.stringify(newEvent)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log(`Result: ${result}`);
            window.location.replace('/');
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEventName">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control type="text" value={eventName} onChange={(e) => setEventName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="formEventDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)}></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </>
    );
}
