import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

function HomePage(props) {
  // const featuredEvents = getFeaturedEvents();
  const { events } = props

  return (
    <div>
      <EventList items={events} />
    </div>
  );
}

// SSG (versione ISR) perché:
// NO CSR 1) mi serve il SEO sulla home 2) mi serve un accesso veloce sulla home 3) è improbabile che ogni tot secondi verranno aggiunti nuovi eventi
// NO SSR:
// 4) non mi serve avere particolari accessi all'oggetto della richiesta

export async function getStaticProps() {

  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800 // ogni mezz'ora questa pagina viene rigenerata se c'è almeno una richiesta in entrata
  }
}

export default HomePage;
