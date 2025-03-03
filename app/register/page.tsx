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
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <Form onSubmit={handleSubmit} className="mt-5">
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>
                            <Form.Group controlId="email" className="mt-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email"/>
                            </Form.Group>
                            <Form.Group controlId="password" className="mt-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"/>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-4 w-100">Submit</Button>
                            {err && (
                                <div className='text-warning mt-2'>
                                    {err}
                                </div>
                            )}
                            {message && <Alert className="mt-3">{message}</Alert>}
                        </Form>
                        <div className="mt-3 text-center">
                            Already have an account? <Link href='/signin'>Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
