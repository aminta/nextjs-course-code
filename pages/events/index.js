import { getAllEvents } from "../../dummy-data";
import { useRouter } from 'next/router'
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/event-search";

function AllEventsPage() {

  const events = getAllEvents();

  const router = useRouter()

  // programmatically navigate to the search result
  function findEventsHandler(year, month) {

    const fullPath = `/events/${year}/${month}`

    router.push(fullPath)
  }

  return(
    <div>
      <h1>All Events</h1>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  )
}

export default AllEventsPage;
