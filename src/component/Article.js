import React, { Fragment } from 'react';
import '../styles/article.css';

const Article = ({posts, search}) =>{
    const changeDate = (date) =>{
        const newDate = new Date(date);
        return newDate.toDateString();
    }

    const highLightQuery = (text) => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
        const searchPattern = new RegExp(search, "gi");
        const replacementPattern = "<span class='highlight'>$&</span>";
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll
        const replacedString = text.replaceAll(searchPattern, replacementPattern);
        // The $& in the replacement string indicates the matched pattern
        return { __html: replacedString };
      };
      
    return(
        <>
            <div id="news-container">
            {posts.filter((s) =>{
                    return search && search.length > 2 ? s.title.match(new RegExp(search, "gi")): s
                })
                .map((post) => {
                return (
                    <article className="news-articale" key={post.objectID}>
                        <div className="articale-row1">
                            <h5 dangerouslySetInnerHTML={
                                search && search.length > 2
                                ? highLightQuery(post.title)
                                : { __html: post.title ? post.title : 'Tech Post'} 
                            }></h5>


                            {post.url ? <a target="_blank" rel="noreferrer" href={post.url}><i className="fas fa-link"></i></a> :

                                <div className="isDisabled"><i className="fas fa-link"></i></div>
                            }
                        </div>
                        
                        <div className="articale-row2">
                            <p><i className="far fa-calendar-alt"></i> : {changeDate(post.created_at)}</p>
                            <p><i className="fas fa-user-shield"></i> : {post.author}</p>
                            <p><i className="fas fa-star"></i> : {post.points}</p>
                        </div>
                    </article>
                );
                })}
            </div>
        </>
    );                                        
}

export default Article;