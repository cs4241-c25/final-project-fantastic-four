import { User } from "next-auth"
import { useRouter } from "next/navigation"
import React from "react"
import { Button, Card, CardGroup } from "react-bootstrap"

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
        <CardGroup>
            {data.filter((user) => user.name != 'admin').map(({name, email}) => (
                <Card key={email}>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>
                            {email}
                        </Card.Text>
                        <Button>Revoke List Access</Button>
                    </Card.Body>
                </Card>
            ))}
        </CardGroup>
    );
}