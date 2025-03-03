import React from 'react';
import Events from '@/components/eventList';
import AddGuestForm from '@/components/addGuest';
export default async function Page( 
    {
    params,
    }: {
    params: Promise<{ eventID: string }>
    }) {
    const eventID = (await params).eventID
    
    return (
        <>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <AddGuestForm
                eventID = {eventID}
            />
        </div>
            <Events
                eventID = {eventID}
            />
        </>
    );
  }