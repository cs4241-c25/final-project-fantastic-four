'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import {Button} from 'react-bootstrap'

export default function LogButton() {
  const { status, data } = useSession()

  if (status === "loading") {
    return 
  }

  if(status == 'authenticated'){
    console.log(data)
    return (
      <>
        <Button className="navbar-button" onClick={() => signOut()}>
          Log Out<b> {data.user!.name}</b>
        </Button>
      </>
    ); 
  }else{
    return (
      <>
        <Button className="navbar-button" onClick={() => signIn()}>
          Log In
        </Button>
      </>
    );
  }
}
