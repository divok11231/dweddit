import { useState, useEffect } from "react";
import axios from "axios";
import Image from 'next/image'
import { Post } from ".prisma/client";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(`/api/view/posts?page=${currentPage}`);
      setPosts(data);
    };

    fetchPosts();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.content}</h2>
          <img src={post.postPic}/>
          <div>____________________________________________________________________________________________________________________________________________________________________</div>
        </div>
      ))}
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Prev Page
      </button>
      <button onClick={handleNextPage} disabled={posts.length < 3}>
        Next Page
      </button>
    </>
  );
}