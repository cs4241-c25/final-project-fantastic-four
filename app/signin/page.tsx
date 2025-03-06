'use client'
import { Form, Button } from 'react-bootstrap'
import React, { Suspense } from 'react'
import Link from 'next/link'
import { getCsrfToken } from 'next-auth/react'
import { SignInError } from '@/components/signInError'
import { useRouter } from 'next/navigation'

export default function SignIn() {
    const [csrf, setCsrf] = React.useState('')
    const router = useRouter();

    const getCsrf = async () => {
        const token = await getCsrfToken()
        if(token) setCsrf(token)
    }

    const handleSubmit = async () => {
       router.push('/');
    }

    React.useEffect(() => {
        getCsrf()
    }, [])

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <Form action='/api/auth/callback/credentials' method='post' onSubmit={handleSubmit} className="mt-5">
                            <Form.Group controlId="csrfToken">
                                <Form.Control type="hidden" name="csrfToken" defaultValue={csrf}/>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control name="email" type="email"/>
                            </Form.Group>
                            <Form.Group controlId="password" className="mt-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" type="password"/>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-4 w-100">Submit</Button>
                            <Suspense fallback={<div>Loading...</div>}>
                                <SignInError/>
                            </Suspense>
                        </Form>
                        <div className="mt-3 text-center">
                            Don&apos;t have an account? <Link href='/register'>Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
