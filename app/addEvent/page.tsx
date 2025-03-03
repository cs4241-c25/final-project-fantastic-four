'use client'
import { Form, Button, Col, Row, Container } from 'react-bootstrap/'
import React, { useState } from 'react'
import {useRouter} from 'next/navigation'

export default function Home() {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/events/addEvent', {
                method: 'POST',
                body: JSON.stringify({
                    name: eventName,
                    date: eventDate,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log(`Result: ${result}`);
            router.push('/');
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };
    return (
        <>
            <Container>
                <Row className="justify-content-center">
                    <Col md={4}>
                        <Form onSubmit={handleSubmit} className="mt-5">
                            <Form.Group controlId="formEventName">
                                <Form.Label>Event Name</Form.Label>
                                <Form.Control type="text" value={eventName} onChange={(e) => setEventName(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="formEventDate" className="mt-5">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)}/>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-5">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
