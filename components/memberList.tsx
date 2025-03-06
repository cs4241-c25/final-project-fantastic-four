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
        <ListGroup className="user-list-container">
            {data.map(({ name, email, verified, access, role }) => (
                <ListGroup.Item key={email} className="user-list-item">
                    <Row className="align-items-center">
                        <Col sm={2} className="user-name">
                            <b>{name}</b>
                        </Col>
                        <Col sm={3} className="user-email">
                            {email}
                        </Col>
                        <Col sm={3} className="user-actions">
                            {verified ? (
                                access ? (
                                    <Button
                                        variant="danger"
                                        onClick={() => changeAccess(email)}
                                        className="action-button"
                                    >
                                        Revoke
                                    </Button>
                                ) : (
                                    <Button
                                        variant="success"
                                        onClick={() => changeAccess(email)}
                                        className="action-button"
                                    >
                                        Approve
                                    </Button>
                                )
                            ) : (
                                <Button
                                    variant="outline-primary"
                                    onClick={() => verifyUser(email)}
                                    className="action-button"
                                >
                                    Verify User
                                </Button>
                            )}
                        </Col>
                        <Col sm={2}>
                            <Form.Select
                                defaultValue={role}
                                onChange={(e) => setRole(email, e.target.value)}
                                className="role-select"
                            >
                                <option value="admin">Admin</option>
                                <option value="member">Member</option>
                                <option value="door">Door</option>
                            </Form.Select>
                        </Col>
                        <Col sm={2}>
                            <Button
                                variant="danger"
                                onClick={() => delUser(email)}
                                className="delete-button"
                            >
                                Delete
                            </Button>
                        </Col>
                    </Row>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}