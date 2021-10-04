import Link from 'next/link'

function ClientsPage() {
  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        <li>
          <Link href="/clients/max">Maximilian</Link>
        </li>
        <li>
          <Link href="/clients/manuel">Manuel</Link>
        </li>
      </ul>
    </div>
  )
}

export default ClientsPage
