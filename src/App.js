import React, {useEffect, useState} from 'react';
import Article from './component/Article';
import Footer from './component/Footer';
import Searchbar from './component/Searchbar';
import Dropdown from './component/Dropdown';
import PaginationNew from './component/paginationNew';
import {hits} from './data/news.json';

function App() {
  const [posts, setPosts] = useState(hits);
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  useEffect( () => {
    setTotalPage( Math.ceil( 20 /5));
  }, []);

  const handleChange =({target}) =>{
    const {value} = target;
    setSearchInput(value);
    if(value){
      const rexex = new RegExp(`${value}`,'i');
      const filteredPosts = hits.filter( (post) => (rexex.test(post.title) ||rexex.test(post.author)) );
      console.log(filteredPosts);
      setPosts(filteredPosts);
      setPage(1);
    }
    else{
      setPosts(hits);
    }

  }

  const handlePage = (e ,num) => {
    setPage(num);
  }

  return (
    <>
      <Searchbar value={searchInput} onChange={handleChange}/>
      <Dropdown />
      <Article  posts={posts} page={page}/>
      <PaginationNew totalPage={totalPage} onChange={handlePage}/>
      <Footer />

    </>
    
  );
}

export default App;
