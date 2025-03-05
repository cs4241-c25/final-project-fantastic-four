import Page from '@/components/eventPage';
import React, { Suspense } from 'react';

 export default function EventPage(){
    return(
        <Suspense>
            <Page/>
        </Suspense>
    )
 }
