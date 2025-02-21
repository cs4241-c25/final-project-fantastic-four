'use client'
import { Form, Button } from 'react-bootstrap'
import React from 'react'
import Link from 'next/link'
import { getCsrfToken } from 'next-auth/react'
import { SignInError } from '@/components/signInError'

export default function SignIn() {
    const [csrf, setCsrf] = React.useState('')

    const getCsrf = async () => {
        const token = await getCsrfToken()
        if(token) setCsrf(token)
    }

    React.useEffect(() => {
        getCsrf()
    }, [])

    return (
        <>
            <Form action='/api/auth/callback/credentials' method='post'>
                <Form.Group controlId="csrfToken">
                    <Form.Control type="hidden" name="csrfToken" defaultValue={csrf}/>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="email"/>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password"/>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
                <SignInError/>
            </Form>
            {'Dont have an account?'}<Link href='/register'> Register</Link>
        </>
    );
}
