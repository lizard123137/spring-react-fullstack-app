import Article from './pages/Articles/Article.tsx';
import Footer from './components/Footer.tsx';
import Header from './components/Header.tsx'
import { useEffect, useState } from 'react';

const TEST_URL = 'https://jsonplaceholder.typicode.com';

interface Post {
  id: number;
  title: string;
}

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${TEST_URL}/posts`);
      const posts = (await response.json()) as Post[];
      setPosts(posts);
    };

    fetchPosts();
  }, [])

  return (
    <div className='text-white bg-gray-950 h-full'>
      <Header/>
      <div className='px-10'>
        {posts.map((post) => {
          return <Article slug={post.id.toString()} content={post.title}/>
        })}
      </div>
      <Footer/>
    </div>
  );
}