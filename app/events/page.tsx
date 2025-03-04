'use client'
import React from 'react';
import Events from '@/components/eventList';
import AddGuestForm from '@/components/addGuest';
import Guest from '@/types/guest';
import { useSearchParams } from 'next/navigation';
export default function Page( ){
 
    const eventID = useSearchParams().get('eventID')
    
    const [guests, setGuests] = React.useState<Guest[]>([])
    async function getGuests() {
        const response = await fetch('/api/getList', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({eventID}),
        });
        const data = await response.json();
        setGuests(data);
    }

    React.useEffect(() => {
        getGuests();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <AddGuestForm
                eventID = {eventID!}
                getGuests = {getGuests}
            />
        </div>
            <Events
                guests = {guests}
            />
        </>
    );
}
