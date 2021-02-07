import Pagination from '@material-ui/lab/Pagination';
import '../styles/pagination.css';

export default function PaginationNew({totalPage, onChange}) {
    // const pages = [...Array(totalPage).keys()].map( (num) => num +1);
    // console.log(pages);
 
    return (
      <div className="pagination">
        <a href="#news-container"><Pagination count={totalPage} color="primary" size="large" onChange={onChange}/></a>
      </div>
    );
  }