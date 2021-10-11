import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getEventById, getAllEvents, getFeaturedEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage(props) {
  // const router = useRouter();

  // const eventId = router.query.eventId;
  // const event = getEventById(eventId);

  const event = props.selectedEvent

  if (!event) {
    return (
      // <ErrorAlert>
      //   <p>No event found!</p>
      // </ErrorAlert>
      <p className=""></p>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}
// SSG (versione ISR)
// non è un pagina che ha dati riferiti a uno specifico utente o che cambia continuamente...


export async function getStaticProps(context) {
  const eventId = context.params.eventId
  const event = await getEventById(eventId)

  return {
    props: {
      selectedEvent: event
    },
    revalidate: 30 // ogni trenta secondi questa pagina viene rigenerata se c'è almeno una richiesta in entrata
  }
}

export async function getStaticPaths(context) {

  // const events = await getAllEvents()
  // facciamo il pre rendering solo dei featured events, che sono i puiù consultati

  const events = await getFeaturedEvents()


  const paths = events.map(event => ({params: {eventId: event.id}}))

  return {
    paths: paths,
    // fallback: false
    fallback: "blocking" // stiamo dicendo a NextJS che ci sono più pagine del DB rispetto a quelle marcate come "featured"
  }

}


export default EventDetailPage;
