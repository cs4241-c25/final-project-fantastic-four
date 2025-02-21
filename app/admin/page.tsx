'use client'
import { MemberList } from "@/components/memberList"
import AddEventButton from "@/components/addEventButton"

export default function Home() {
  return (
    <>
        <AddEventButton/>
        <MemberList/>
    </>
  );
}
