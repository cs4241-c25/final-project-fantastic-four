'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import {Button} from 'react-bootstrap'

export default function Home() {
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    },
  })

  if (status === "loading") {
    return 
  }
  return (
    <>
      <Button onClick={() => signOut()}>
        Log Out
        <br/>
        {data.user!.name}
      </Button>
    </>
  );
}
