'use client'
import { Form, Button } from 'react-bootstrap/'
import React, { useState, useEffect } from 'react'
import {useRouter} from 'next/navigation'
import { useSession } from "next-auth/react";

export default function Home() {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const { data, update } = useSession()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users/update', {
                method: 'POST',
                body: JSON.stringify({ id: data?.user.id, email: email })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log(`Result: ${result}`);
            await update({
                ...data,
                user: {
                    ...data?.user,
                    email: email
                }
            });
            router.push('/account');
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };

    useEffect(() => {
        if (data?.user?.email) {
            setEmail(data.user.email);
        }
    }, [data]);

    return (
        <>
            <h2>Update Account Information</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUserEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Update Email</Button>
                <Button variant="primary" type="submit">Reset Password</Button>
            </Form>
        </>
    );
}
