import Posts from "components/Posts";
import Link from 'next/link';

export default function Home() {
  return (
    <div><h1>
      <Link href="/">Vaporeon Feed</Link>
      </h1>
      <Posts />
      <li>
       <div> <Link  href="/follow">This is a link im too lazy to css</Link></div>
        <Link  href="/post">This is also a link im too lazy to css this one lets you make posts tho</Link>
      </li>
    </div>
  );
}