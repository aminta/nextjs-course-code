import { useRouter } from 'next/router'


function PortfolioProjectPage () {

  const router = useRouter();

  console.log(router.pathname) // /portfolio/[projectid]
  console.log(router.query) // {projectid: '1'}

  // send a request to some backend server to fetch the piece of data with an id of router.query.projectid

  return (
   <div>
    <h1>The portfolio Page</h1>
  </div> )
}

export default PortfolioProjectPage;
