'use client'
import { MemberList } from "@/components/memberList"
import AddEventButton from "@/components/addEventButton"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Home() {
  const { status, data } = useSession()
  const router = useRouter()
  
    if (status === "loading") {
      return 
    }

    if(data?.user!.name != 'admin'){
      router.push('/')
    }else{
      return (
        <>
            <AddEventButton/>
            <MemberList/>
        </>
      );
    }
}
