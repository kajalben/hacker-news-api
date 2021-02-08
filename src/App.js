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
  const [isLoading, setIsLoading] =useState(true);

  const queryParams = `search?tags=story`;
  const [ query, setQuery] = useState(queryParams);

  const url = 'https://hn.algolia.com/api/v1/';


  // call API when Query and page cahnged
  useEffect( () => {
    const getPostPerPage = async () => {
      setIsLoading(true);
      try {
        const endpoint = url + query + `&page=${page}`;
        console.log(endpoint);
        const response = await fetch(endpoint);
        console.log(endpoint);
        if(response.ok){
          const jsonResponse = await response.json();
          setIsLoading(false);
          setPosts(jsonResponse.hits);
          setTotalPage(jsonResponse.nbPages);
          return;
        }
      } catch (error) {
        console.log('Network error :' + error.message);
      }
    }
    getPostPerPage();
  }, [page, query]);


  //highlight Test while user searching
  useEffect( () => {
    if(searchInput){
      const regX = new RegExp(`${searchInput}`,'i');
      let matchText ;
      for(let post of posts){
        if((matchText = regX.exec(post.title)) !== null){
          document.querySelector(`[id='${post.objectID}']`).innerHTML = post.title.replace(regX,`<em>${matchText}</em>`)
        }
        if((matchText = regX.exec(post.author)) !== null){
          document.querySelector(`[id='${post.objectID}']`).innerHTML = post.author.replace(regX,`<em>${matchText}</em>`)
        }
      }
    }
  },[posts]);


  //filter data  according to date and popularity
  const handleDatefilter = ({target}) =>{
    const {value} = target;
    if(value === 'date'){
      setQuery(`search_by_date?tags=story`);
    }
    if(value === 'popularity'){
      setQuery(`search?numericFilters=points>1&tags=story`);
    }
  }

  const handleTimeFilter = ({target})  => {
    const {value} = target;
    const ts = Math.round((new Date()).getTime() / 1000);
    let tsStart, tsEnd;
    if(value === '24hour'){
      tsStart = ts;
      tsEnd =   ts - 86400; //timestamp for last24hours
    }
    if(value === 'week'){
      tsStart = ts - 86400*7; //timestamp for last week
      tsEnd =   ts - 86400*7*2; 
    }
    if(value === 'month'){
      tsStart = ts - 86400*24; //timestamp for last month
      tsEnd =   ts - 86400*24*2; 
    }
    if(value === 'year'){
      tsStart = ts - 86400*356; //timestamp for last year
      tsEnd =   ts - 86400*365*2; 
    }
    setQuery(`search_by_date?tags=story&numericFilters=created_at_i>${tsEnd},created_at_i<${tsStart}&page=${page}`);
  }

// handle post while user search
  const handleSearch =({target}) =>{
    const {value} = target;
    setQuery(`search?query=${value}&tags=story`);
    setSearchInput(value);
  }

  const handlePage = (e ,num) => {
    setPage(num);
  }

  return (
    <>
      <Searchbar value={searchInput} onChange={handleSearch}/>

      <Filters handleDatefilter={handleDatefilter} handleTimeFilter={handleTimeFilter}/>
      <main className="container">
      {isLoading && <span className="spinner"> 
            <i className="fas fa-spinner"></i>
            </span>
      }
      {posts  && <>
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
