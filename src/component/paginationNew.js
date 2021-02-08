import Pagination from '@material-ui/lab/Pagination';
import '../styles/pagination.css';

export default function PaginationNew({totalPage, onChange}) {
    return (
      <div className="pagination">
        <a href="#news-container"><Pagination count={totalPage} color="primary" size="large" onChange={onChange}/></a>
      </div>
    );
  }