'use client'
import {ListGroup} from 'react-bootstrap'
import Guest from '@/types/guest'; 
import React from 'react';

export default function Events({guests}: {guests: Guest[]}) {

    return (
      <>
        <ListGroup>
          {guests.map((guest) => (
              <ListGroup.Item key={guest._id.toString()}>
                <h2> {guest.name} </h2>
              </ListGroup.Item>
          ))}
        </ListGroup>
      </>
    );}

