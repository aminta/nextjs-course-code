import { useEffect, useState } from 'react'
import useSWR from 'swr'

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales) // using the pre-fetched sales as initial state
  // const [isLoading, setIsLoading] = useState(false)

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const {data, error} = useSWR('https://nextjscoursetest-default-rtdb.firebaseio.com/sales.json', fetcher)

  useEffect(() => {
    if(data) {
      const transformedSales = []

      for (const key in data) {
        transformedSales.push({id: key, username: data[key].username, volume: data[key].volume})
      }
      setSales(transformedSales)
    }

  }, [data])

  // useEffect(() => {
  //   setIsLoading(true)
  //   fetch('https://nextjscoursetest-default-rtdb.firebaseio.com/sales.json')
  //   .then(response => response.json())
  //   .then(data => {
  //     const transformedSales = []

  //     for (const key in data) {
  //       transformedSales.push({id: key, username: data[key].username, volume: data[key].volume})
  //     }
  //     setSales(transformedSales)
  //     setIsLoading(false)
  //   })
  // }, [])


  if(error) {
    return <p>Fail to load.</p>
  }


  // if(!data || !sales) {
  //   return <p>Loading...</p>
  // }

  if(!data && !sales) {
    return <p>Loading...</p>
  }

  // // this is output in initial Html as seen by user
  // if(!sales) {
  //   return <p>No data yet</p>
  // }


  return (<ul>
    {sales.map(sale => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}
  </ul>)

}

export async function getStaticProps(context) {
  return fetch('https://nextjscoursetest-default-rtdb.firebaseio.com/sales.json')
    .then(response => response.json())
    .then(data => {
      const transformedSales = []

      for (const key in data) {
        transformedSales.push({id: key, username: data[key].username, volume: data[key].volume})
      }

      return {
        props: {
          sales: transformedSales
        },
        revalidate: 10
      }

    })

}


export default LastSalesPage
