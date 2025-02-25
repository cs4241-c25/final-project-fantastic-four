import React from "react"
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap"
import {User} from '@/types/user'

export const MemberList = () => {
    const [data, setData] = React.useState([] as User[])
    
    const getUsers = async () => {
        const response = await fetch('/api/users', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }});

            if(response.status == 200){
                const users = await response.json()
                setData(users)
            }
    }

    const changeAccess = async (email: string) => {
        const response = await fetch('/api/users/access', {
            method: 'POST',
            body: JSON.stringify({"email": email})
        });

        if (response.ok) {
            await getUsers();
        }
    }

    const verifyUser = async (email: string) => {
        const response = await fetch('/api/users/verify', {
            method: 'POST',
            body: JSON.stringify({"email": email})
        });

        if (response.ok) {
            await getUsers();
        }
    }

    const delUser = async (email: string) => {
        const response = await fetch('/api/users/delete', {
            method: 'POST',
            body: JSON.stringify({"email": email})
        });

        if (response.ok) {
            await getUsers();
        }
    }

    const setRole = async (email: string, role: string) => {
        const response = await fetch('/api/users/setRole', {
            method: 'POST',
            body: JSON.stringify({"email": email, "role": role})
        });

        if (response.ok) {
            await getUsers();
        }
    }

    React.useEffect(() => {
        getUsers()
    }, [])

    return(
        <ListGroup>
                {data.map(({name, email, verified, access, role}) => (
                    <ListGroup.Item key={email}>
                        <Row>
                            <Col as='b'>{name}</Col>
                            <Col>{email}</Col>
                            <Col>{verified ? 
                                access ? 
                                    <Button onClick={() => changeAccess(email)}>Revoke List Access</Button> :
                                    <Button onClick={() => changeAccess(email)}>Approve List Access</Button> :
                                    <Button variant='outline-primary' onClick={() => verifyUser(email)}>Verify User</Button>
                                }
                            </Col>
                            <Col>
                                <Form.Select defaultValue={role} onChange={(e) => setRole(email, e.target.value)}>
                                    <option value="admin">Admin</option>
                                    <option value="member">Member</option>
                                    <option value="door">Door</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Button variant="danger" onClick={() => delUser(email)}>Delete User</Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
        </ListGroup>
    );
}