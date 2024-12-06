import Article from './pages/Articles/Article.tsx';
import Footer from './components/Footer.tsx';
import Header from './components/Header.tsx'
import { useEffect, useState } from 'react';

const TEST_URL = 'http://backend:8080/api';

interface Article {
  slug: string;
  content: string;
}

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch(`${TEST_URL}/articles`);
      const articles = (await response.json()) as Article[];
      setArticles(articles);
    };

    fetchArticles();
  }, [])

  return (
    <div className='text-white bg-gray-950 h-full'>
      <Header/>
      <div className='px-10'>
        {articles.map((article) => {
          return <Article slug={article.slug} content={article.content}/>
        })}
      </div>
      <Footer/>
    </div>
  );
}