import Link from 'next/link';


export default function Posts(viewPosts) {
  console.log(viewPosts)
  return (
    <div>
      <h1>Heres your post Bitch,</h1>
      <p>All of the POSTS ever:</p>
      <h1 className="title">
  <Link href="/">Previous page!</Link>
</h1>
      <ul>
          
{viewPosts.viewPosts.map((Posts,index)=> {
  return (
    
    <li key={Posts.id}>{ Posts.content }</li>
  )
})}
</ul>
    </div>
  )
}

export async function getStaticProps() {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiIxMGNnIiwiaWF0IjoxNjc1OTU3NDg0LCJleHAiOjE2NzU5NjQ2ODR9.PcA7wWsxqte1QJC4Xx_tKeTMFxb-PizfB9rhEsfVqkA");


  const viewPosts = await fetch('http://localhost:3000/api/view/viewPosts2',{method: 'GET',headers: myHeaders}).then(res => res.json());
  return {
    props: {
      viewPosts
    }
  }
}