import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

function AllEventsPage(props) {
  const router = useRouter();
  // const events = getAllEvents();
  const events = props.events

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}
// SSG
export async function getStaticProps(context) {
  const events = await getAllEvents();

  return {
    props: {
      events: events
    },
    revalidate: 60 // every minute if a new request is coming in we regenerate this page
  }

}

export default AllEventsPage;
