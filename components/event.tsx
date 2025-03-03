import type Event from '@/types/event'

export default function Event({event}: {event: Event}) {

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
        <ListGroup>
          {guests.filter(guest => guest.eventID === eventID ).map((guest) => (
              <ListGroup.Item key={guest._id.toString()}>
                <h2> {guest.firstName} {guest.lastName}</h2>
              </ListGroup.Item>
          ))}
        </ListGroup>
      </>
    );}




<Row>
<Col as='h2'>
  <Link href={`/events/${event._id.toString()}`} className="nav-link">
    {event.name}
  </Link>
</Col>
<Col><p>{event.date}</p></Col>
{data?.user!.role === 'admin' ?
    <Col><Button
        onClick={() => activate(event._id.toString())}>{event.isActive ? "Deactivate" : "Activate"}</Button></Col>
    : <Col><p>{event.isActive ? "Active" : "Not Active"}</p></Col>}
<Col>{data?.user!.role === 'admin' ? 
  <Button onClick={() => edit(event._id)}>Edit</Button> : ''}
</Col>
<Col>{data?.user!.role === 'admin' ? 
  <Button variant='danger' onClick={() => delEvent(event._id)}>Delete</Button> : ''}
</Col>
</Row>