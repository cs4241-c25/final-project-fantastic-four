import React from 'react';
import Events from '@/components/eventList';
import { Form } from 'react-bootstrap';
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
            <label htmlFor="nameInput">Enter Name:</label>
            <input 
            id="nameInput"
            type="text"
            placeholder="Guest's Name"
            style={{
                marginLeft: "10px",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc"
            }}
        />
        <button>Add guest</button>
      </div>
            <Events
                eventID = {eventID}
            />
        </>
    );
  }