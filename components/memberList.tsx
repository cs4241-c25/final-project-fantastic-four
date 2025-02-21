import { useRouter } from "next/navigation"
import React from "react"
import { Button, Col, ListGroup, Row } from "react-bootstrap"
import {User} from '@/types/user'

export const MemberList = () => {
    const [data, setData] = React.useState([] as User[])
    const router = useRouter()
    
    const getUsers = async () => {
        const response = await fetch('/api/users', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }})

            if(response.status == 403){
                router.replace('/')
                return
            }

            if(response.status == 200){
                const users = await response.json()
                setData(users)
            }
    }

    React.useEffect(() => {
        getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const approve = () => {
        return
    }

    const revoke = () => {
        return
    }

    return(
        <ListGroup>
                {data.map(({name, email, verified}) => (
                    <ListGroup.Item key={email}>
                        <Row>
                            <Col as='b'>{name}</Col>
                            <Col>{email}</Col>
                            <Col>{verified ? 
                                <Button>Approve List Access</Button> : 
                                <Button>Revoke List Access</Button>
                                }
                            </Col>
                            <Col>
                                <Button>Delete User</Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
        </ListGroup>
    );
}