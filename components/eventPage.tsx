'use client'
import React from 'react';
import Events from '@/components/eventList';
import AddGuestForm from '@/components/addGuest';
import Guest from '@/types/guest';
import { useSearchParams } from 'next/navigation';

export default function Page() {
    const eventID = useSearchParams().get('eventID');
    const [guests, setGuests] = React.useState<Guest[]>([]);
    const [eventStatus, setEventStatus] = React.useState<boolean | null>(null);

    // Fetch guests
    async function getGuests() {
        const response = await fetch('/api/getList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ eventID })
        });
        const data = await response.json();
        setGuests(data);
    }

    // Delete a guest
    const delGuest = async (_id: string) => {
        const response = await fetch('/api/deleteGuest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id })
        });

        if (response.ok) {
            await getGuests();
        }
    };

    // Find event and check if it's active
    const findEvent = async (_id: string) => {
        const response = await fetch('/api/findEventById', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id })
        });

        if (response.ok) {
            const data = await response.json();
            setEventStatus(data.isActive); // Assuming response includes an isActive flag
        } else {
            setEventStatus(false); // Event not found or error
        }
    };

    // Fetch guests when the component mounts
    React.useEffect(() => {
        getGuests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Check event status when eventID changes
    React.useEffect(() => {
        if (eventID) {
            findEvent(eventID);
        }
    }, [eventID]); // Re-run this effect when eventID changes

    return (
        <>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                {eventStatus === true && <AddGuestForm eventID={eventID!} getGuests={getGuests}/>}
                {eventStatus === false && <p>Event inactive!</p>}
            </div>
            <Events guests={guests} delGuest={delGuest}/>
        </>
    );
}
