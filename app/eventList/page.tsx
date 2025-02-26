import { useRouter } from "next/router";

export default function EventPage() {
  const router = useRouter();
  const { eventName } = router.query; // Extract the dynamic event name from the URL

  return (
    <div>
      <h1>Event: {eventName}</h1>
      <p>Details for {eventName} will go here.</p>
    </div>
  );
}