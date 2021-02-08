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
                       {post.url ? <a href={post.url}><i className="fas fa-link"></i></a> :
                            <div className="isDisabled"><i className="fas fa-link"></i></div>
                       }
                   </div>
                   
                   <div className="articale-row2">
                       <p><i className="far fa-calendar-alt"></i> : {changeDate(post.created_at)}</p>
                       <p id={post.objectID}><i className="fas fa-user-shield"></i> : {post.author}</p>
                       <p><i className="fas fa-star"></i> : {post.points}</p>
                   </div>
               </article>
                ))}
            </div>
        </>
    );                                        
}

export default Article;