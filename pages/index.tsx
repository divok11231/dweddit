import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1> Vaporeon posting Central </h1>
      <nav>
        <ul>
          <li>
            <Link href="/signin">
              Continue to do the lords work
            </Link>
          </li>
          <li>
            <Link href="/register">
              Start serving Vaporeon
            </Link>
          </li>
          <li>
            <Link href="/follow">
              Connect with other vaporeon enthusiasts
            </Link>
          </li>
          <li>
            <Link href="/post">
              Share your love of Vaporeon with the world
            </Link>
          </li> 
          <li>
            <Link href="/feed">
              View How other vapoposters are doing
            </Link>
          </li>
        </ul>
      </nav>
      <img src="https://res.cloudinary.com/dic7lotfy/image/upload/v1677872889/vapopeepohappy_s1vxyr.jpg" alt="" />
    </div>
  )
}