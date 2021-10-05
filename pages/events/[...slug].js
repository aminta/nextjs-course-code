import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert'

function FilteredEventsPage(props) {

  const router = useRouter()

  const filterData = router.query.slug;

  // at first render filterData is undefined
  if(!filterData) {
    return <p className="center">Loading...</p>
  }

  const [year, month] = filterData


  if(isNaN(year) || isNaN(month) || year > 2030 || year < 2021 || month < 1 || month > 12 || filterData.length>2) {
    return(
    <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>


    </>
    )

  }

  const filteredEvents = getFilteredEvents({year: +year, month: +month})

  if(!filteredEvents || filteredEvents.length === 0) {
    return(
    <>
      <ErrorAlert>
        <p>No events found for the chosen filter!</p>
      </ErrorAlert>
      <div className="center">
        <Button link="/events">Show all events</Button>
      </div>
    </>
    )
  }

  const date = new Date(year, month - 1)


  return(
    <div>
      <h1>Filtered Event</h1>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  )
}

export default FilteredEventsPage;
