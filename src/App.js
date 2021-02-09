import React, {useEffect, useState} from 'react';
import Article from './component/Article';
import Footer from './component/Footer';
import Searchbar from './component/Searchbar';
import Filters from './component/Filters';
import PaginationNew from './component/paginationNew';
import './styles/app.css';


function App() {
  const [posts, setPosts] = useState();
  const [userInput, setUserInput] = useState("");

  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] =useState(true);
  const [isError, setIsError] = useState({ error : false, message : ''});

  const queryParams = `search?tags=story`;
  const [ query, setQuery] = useState(queryParams);

  const url = 'https://hn.algolia.com/api/v1/';


  // call API when Query and page cahnged
  useEffect( () => {
    const getPostPerPage = async () => {
      setIsLoading(true);
      setIsError({error : false, message :''});
      try {
        const endpoint = url + query + `&page=${page}`;
        console.log(endpoint);
        const response = await fetch(endpoint);
        if(response.ok){
          const jsonResponse = await response.json();
          setIsLoading(false);
          setPosts(jsonResponse.hits);
          setTotalPage(jsonResponse.nbPages);
          return;
        }
      } catch (error) {
        console.log(error.message);
        setIsError({error : true, message: 'Something goes wrong....! Please refresh the page'});
        setIsLoading(false);
      }
    }
    getPostPerPage();
  }, [page, query]);


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
  
  const handlePage = (e ,num) => {
    setPage(num);
  }

  const getPostOnSearch = async (query) => {
    setIsLoading(true);
    setIsError({error : false, message : ''});
    try {
      const endpoint = url + query + `&page=${page}`;
      console.log(endpoint);
      const response = await fetch(endpoint);
      
      if(response.ok){
        const jsonResponse = await response.json();
        setIsLoading(false);
        if(jsonResponse.hits.length >= 1){
          setPosts(jsonResponse.hits);
          setTotalPage(jsonResponse.nbPages);
          return;
        }
        else{
          setIsError({error : true, message: 'Try Again! There were no suggestions found!'});
          setIsLoading(false);
          return;
        }
        
      }
      
    } catch (error) {
      console.log(error.message);
      setIsError({error : true, message: 'Something goes wrong....! Please refresh the page'});
      setIsLoading(false);
    }
  }

  const handleChange = (e) =>{
    setUserInput(e.target.value);
    getPostOnSearch(`search?query=${e.target.value}&tags=story`);
  }

  const handleReset = () =>{
    setUserInput('');
    setQuery(queryParams);
    setIsError({error : false, message :''});
  }


  return (
    <>
      <Searchbar value={userInput} onChange={handleChange} onClick={handleReset} search={userInput}/>

      <Filters handleDatefilter={handleDatefilter} handleTimeFilter={handleTimeFilter}/>
      <main className="container">
        {isLoading && <span className="spinner"> 
              <i className="fas fa-spinner"></i>
              </span>
        }
        {isError.error && <span className="error-message">
          {isError.message}
        </span>}
        {posts && <>
            <Article  posts={posts} page={page} search={userInput} />
            <PaginationNew totalPage={totalPage} onChange={handlePage}/> 
          </> 
        }
      </main>
      <Footer />
    </>
  );
}

export default App;
