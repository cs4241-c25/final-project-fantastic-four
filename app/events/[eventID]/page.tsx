import {ListGroup} from 'react-bootstrap'
import Guest from '@/types/guest'; 
import React from 'react';
import Events from '@/components/eventList';
export default async function Page( 
    {
    params,
    }: {
    params: Promise<{ eventID: string }>
    }) {
    const eventID = (await params).eventID
    
    
    
    
    return (
      
        <Events
        eventID = {eventID}
        />

    );
  }