import React, {useEffect, useState} from 'react';
import {fetchPost} from './api';
import Article from './component/Article';
import Footer from './component/Footer';
import Searchbar from './component/Searchbar';
import Filters from './component/Filters';
import Pagination from './component/Pagination';
import './styles/app.css';


function App() {
  const [posts, setPosts] = useState();
  const [userInput, setUserInput] = useState("");

  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] =useState(true);

  const queryParams = `search?tags=story`;
  const [query, setQuery] = useState(queryParams);

  const url = 'https://hn.algolia.com/api/v1/';


  // Get Post API when Query and page changed
  useEffect( () => {
    getPostPerPage();
    let interval = setInterval(() => getPostPerPage(), 120000);
    return () => clearInterval(interval);
  }, [page, query]);


  const getPostPerPage = () => {
    setIsLoading(true);
    const endpoint = encodeURI(url + query + `&page=${page}`);
     // Get Post from API
    fetchPost(endpoint).then( (data) =>{
      setIsLoading(false);
      setPosts(data.hits);
      setTotalPage(data.nbPages);
    })
  }

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

   //filter data between times
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
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  const handleChange = ({target}) =>{
    const {value} = target;
    
    const sanitizedInput = value.replace(/[^\w\d\s.]+/g, "").toLowerCase();
    setUserInput(sanitizedInput);
    if(sanitizedInput.length > 2) setQuery(`search?query=${sanitizedInput}&tags=story`);
  }

  const handleReset = () =>{
    setUserInput('');
    setQuery(queryParams);
  }

  const dispalyArticle = () =>{
    if(isLoading){
      return <span className="spinner"> 
        <i className="fas fa-spinner"></i>
      </span>
    }
    else if(!posts.length){
      return <span className="error-message">Try again! No suggetions were found</span>
    }
    else{
      return <Article  posts={posts} page={page} search={userInput} />
    }

  }

  return (
    <>
      <Searchbar value={userInput} onChange={handleChange} onClick={handleReset} search={userInput}/>

      <Filters handleDatefilter={handleDatefilter} handleTimeFilter={handleTimeFilter}/>
      <main id="container">
        {posts && dispalyArticle()}
      </main>
      <Pagination totalPage={totalPage} onChange={handlePage}/> 
      <Footer />
    </>
  );
}

export default App;
