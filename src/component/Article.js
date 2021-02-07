import React, { Fragment } from 'react';
import '../styles/article.css';

const Article = ({posts}) =>{
    const changeDate = (date) =>{
        const newDate = new Date(date);
        return newDate.toDateString();
    }
    
    return(
        <>
            <div id="news-container">
                {posts.map(  (post) => (
                   <article className="news-articale" key={post.objectID}>
                   <div className="articale-row1">
                       <h5 id={post.objectID}>{post.title ? post.title : 'Tech Post'}</h5>
                       {post.url && <a href={post.url}><i class="fas fa-link"></i></a>}
                   </div>
                   
                   <div className="articale-row2">
                       <p><i class="far fa-calendar-alt"></i> : {changeDate(post.created_at)}</p>
                       <p><i class="fas fa-user-shield"></i> : {post.author}</p>
                       <p><i class="fas fa-star"></i> : {post.points}</p>
                   </div>
               </article>
                ))}
            </div>
        </>
    ); 
}

export default Article;