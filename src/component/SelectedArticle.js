import React, { Fragment } from 'react'

const SelectedArticle = ({post}) =>{
    const changeDate = (date) =>{
        const newDate = new Date(date);
        return newDate.toDateString();
    }
    return(
        <>             
            <article className="news-articale">
                <div className="articale-row1">
                    <h4 className="search-string">{post.title}</h4>
                    <a href={post.url}>Link</a>
                </div>
                
                <div className="articale-row2">
                    <p>Date : {changeDate(post.created_at)}</p>
                    <p>Author : {post.author}</p>
                    <p>point : {post.points}</p>
                </div>
            </article>
        </>
    );
}

export default SelectedArticle;