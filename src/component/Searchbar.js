import '../styles/searchber.css';

const Searchbar = ({onChange}) =>{
    return(
        <header>
            <h1>The Hacker News</h1>        
        
            <div className="wrap">
                <div className="search">
                    <input type="text" className="searchTerm" placeholder="Search posts by Title" onChange={onChange} />
                    <span className="searchButton">
                        <i className="fas fa-search"></i>
                    </span>
                </div>
            </div>
        </header>

    );
}

export default Searchbar;