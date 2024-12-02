import Article from './pages/Articles/Article.tsx';
import Footer from './components/Footer.tsx';
import Header from './components/Header.tsx'

function App() {
  return (
    <div className='text-slate-900 dark:text-white bg-white dark:bg-slate-800 h-full'>
      <Header/>
      <Article/>
      <Footer/>
    </div>
  );
}

export default App
