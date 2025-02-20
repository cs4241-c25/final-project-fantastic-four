import { User } from "next-auth"
import { useRouter } from "next/navigation"
import React from "react"
import { Button, Col, ListGroup, Row } from "react-bootstrap"

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

    return(
        <ListGroup>
                {data.filter((user) => user.name != 'admin').map(({name, email}) => (
                    <ListGroup.Item key={email}>
                        <Row>
                            <Col as='b'>{name}</Col>
                            <Col>{email}</Col>
                            <Col>
                                <Button>Revoke List Access</Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
        </ListGroup>
    );
}