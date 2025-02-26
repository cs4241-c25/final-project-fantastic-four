'use client'
import { Form, Button, Alert } from 'react-bootstrap'
import React from 'react'
import Link from 'next/link'

export default function Register() {
    const [message, setMessage] = React.useState('')
    const [err, setErr] = React.useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setMessage('')
        setErr('')
        
        const name = document.getElementById('name') as HTMLInputElement
        const email = document.getElementById('email') as HTMLInputElement
        const password = document.getElementById('password') as HTMLInputElement

        e.preventDefault();
        const account = {
            name: name.value,
            email: email.value,
            password: password.value
        }
        try {
            const response = await fetch('api/auth/register', {
                method: 'POST',
                body: JSON.stringify(account)
            });

            if (response.status == 409) {
                setErr('Account already exists for that email address')
            }else if(response.ok){
                setMessage('Account created! Awaiting administrator approval')
            }else{
                setErr('An error occurred')
            }
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email"/>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"/>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
                <div className='text-warning'>
                    {err}
                </div>
                {message ? <Alert>{message}</Alert> : ''}
            </Form>
            Already have an account?<Link href='/signin'> Sign In</Link>
        </>
    );
}
