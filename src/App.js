import React, {useEffect, useState} from 'react';
import Article from './component/Article';
import Footer from './component/Footer';
import Searchbar from './component/Searchbar';
import Filters from './component/Filters';
import PaginationNew from './component/paginationNew';


function App() {
  const [posts, setPosts] = useState();
  const [searchInput, setSearchInput] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);

  const queryParams = `search?`;
  const [ query, setQuery] = useState(queryParams);

  const url = 'https://hn.algolia.com/api/v1/';


  // call API when Query and page cahnged
  useEffect( () => {
    const getPostPerPage = async () => {
      try {
        const endpoint = url + query + `&page=${page}`;
        console.log(endpoint);
        const response = await fetch(endpoint);
        
          const jsonResponse = await response.json();
          setPosts(jsonResponse.hits);
          setTotalPage(jsonResponse.nbPages);
         
      } catch (error) {
        console.log('Network error :' + error.message);
      }
    }
    getPostPerPage();
  }, [page, query, totalPage]);


  //highlight Test while user searching
  useEffect( () => {
    if(searchInput){
      const regX = new RegExp(`${searchInput}`,'i');
      let matchText ;
      for(let post of posts){
        if((matchText = regX.exec(post.title)) !== null){
          document.querySelector(`[id='${post.objectID}']`).innerHTML = post.title.replace(regX,`<em>${matchText}</em>`)
        }
      }
    }
    }, [posts]);


  //filter data  according to date and popularity
  const handleDatefilter = ({target}) =>{
    const {value} = target;
    if(value === 'date'){
      setQuery(`search_by_date?tags=story`);
    }
    if(value === 'popularity'){
      setQuery(`search?numericFilters=points>1`);
    }
  }

  const handleTimeFilter = ({target})  => {
    const {value} = target;
    const ts = Math.round((new Date()).getTime() / 1000);
    let tsByQuery = 86400;

    if(value === '24hour'){
      tsByQuery = 86400;
    }
    if(value === 'week'){
      tsByQuery = 86400*7;
    }
    if(value === 'month'){
      tsByQuery = 86400*24;
    }
    if(value === 'year'){
      tsByQuery = 86400*356;
    }
    const newTs = ts - tsByQuery;
    setQuery(`search_by_date?tags=story&numericFilters=created_at_i>${newTs}&page=${page}`);
    
  }

// handle post while user search
  const handleSearch =({target}) =>{
    const {value} = target;
    setSearchInput(value);
    if(value){
      setQuery(`search?query=${value}`);
    }
    else{
      setQuery(queryParams);
    }
  }

  const handlePage = (e ,num) => {
    setPage(num);
  }

  return (
    <>
      <Searchbar value={searchInput} onChange={handleSearch}/>

      <Filters handleDatefilter={handleDatefilter} handleTimeFilter={handleTimeFilter}/>
      <main className="container">
          {!posts ? 
            <span className="spinner"> 
              <i class="fas fa-spinner"></i>
            </span> : 
            <>
              <Article  posts={posts} page={page}/>
              <PaginationNew totalPage={totalPage} onChange={handlePage}/> 
            </>
          }
      </main>
      <Footer />
    </>
  );
}

export default App;
