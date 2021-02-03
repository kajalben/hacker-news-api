import { ImageOutlined } from '@material-ui/icons';
import React, { Fragment } from 'react';
import SelectedArticle from '../component/SelectedArticle';
import '../styles/article.css';

const Article = ({posts, page}) =>{
    const USER_PER_PAGE = 5;
    const startIndex = (page - 1) * USER_PER_PAGE;
    const selectedPosts = posts.slice(startIndex, startIndex+ USER_PER_PAGE);
    
    return(
        <>
            <div className="news-container">
                {selectedPosts.map(  (post) => (
                    <SelectedArticle  post={post} key={Math.random()}/>
                ))}
            </div>
        </>
    ); 
}

export default Article;