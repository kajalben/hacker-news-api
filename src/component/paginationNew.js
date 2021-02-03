import Pagination from '@material-ui/lab/Pagination';
import '../styles/pagination.css';

export default function PaginationNew({totalPage, onChange, page}) {
    // const pages = [...Array(totalPage).keys()].map( (num) => num +1);
    // console.log(pages);
 
    return (
      <div className="pagination">
        <Pagination count={totalPage} color="primary" size="large" onChange={onChange}/>
      </div>
    );
  }