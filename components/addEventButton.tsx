'use client'
import {Button} from 'react-bootstrap'

export default function AddEventButton() {
    return (
        <>
            <div className="col-md-4">
                <Button href='/addEvent' className="mb-4 mt-4">
                    Add Event
                </Button>
            </div>
        </>
    );
}
