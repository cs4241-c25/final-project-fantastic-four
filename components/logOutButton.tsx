'use client'
import { signOut, useSession } from "next-auth/react"
import {Button} from 'react-bootstrap'

export default function LogOutButton() {
  const { status, data } = useSession({
    required: true,
})

  if (status === "loading") {
    return 
  }
  return (
    <>
      <Button onClick={() => signOut()}>
        Log Out<b> {data.user!.name}</b>
      </Button>
    </>
  );
}
