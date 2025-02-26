'use client'
import { MemberList } from "@/components/memberList"
import AddEventButton from "@/components/addEventButton"
import { useSession } from "next-auth/react"
import { Container, Row } from "react-bootstrap"

export default function Home() {
  const { status, data } = useSession()
  
  if (status === "loading") {
    return 
  }

  if(data?.user!.role != 'admin'){
    return 'Access Denied'
  }
  
  return (
    <Container>
      <Row>
        <AddEventButton/>
      </Row>
      <MemberList/>
    </Container>
  );
}
