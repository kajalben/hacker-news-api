import '../styles/searchber.css';

const Searchbar = ({onChange, onClick, search, value}) =>{
    return(
        <header>
            <h1>The Hacker News</h1>        
        
            <div className="wrap">
                <div className="search">
                    <span className="btn search-btn">
                        <i className="fas fa-search"></i>
                    </span>
                    <input type="text" className="searchTerm" placeholder="Search posts by Title" onChange={onChange}  value={value}/>
                    <span type="submit" className="btn clear-btn" >
                           {search.length > 2 && <i className="fas fa-times" onClick={onClick}></i>} 
                    </span>
                </div>
            </div>
        </header>
    );
}

export default Searchbar;