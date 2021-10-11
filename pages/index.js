import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';
import Head from 'next/head'

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>

         {/* this is the text that will show up in search results like Google search results */}
        <meta name="description" content="Find a lot of great events that allow you to evolve..." />

      </Head>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
  }
}

export default HomePage;
