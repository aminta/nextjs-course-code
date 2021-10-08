import fs from 'fs/promises';
import path from 'path'
import Link from 'next/link'

function HomePage(props) {

  const { products } = props



  return(
    <ul>
      {products.map(product => <li key={product.id}><Link href={`/products/${product.id}`}>{product.title}</Link></li>)}
    </ul>
  )
}

export async function getStaticProps(context) {
  console.log('(Re-)Generating')
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json'); // cwd is not pages/, but root in the server view...
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)

  // any code inside this function is executed on server and server only
  // we can also use server libraries like Node "fs"
  return {
    props: {
      products: data.products
    },
    revalidate: 10 // times in seconds NextJS has to wait until it re-generates this page
  }
}


export default HomePage
