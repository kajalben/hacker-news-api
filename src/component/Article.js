import React, { Fragment } from 'react';
import {hits} from '../data/news.json';
import '../styles/news.css';

const Article = () =>{

    const changeDate = (date) =>{
        const newDate = new Date(date);
        return newDate.toDateString();
    }
    return(
        <>
        {
           
            hits.map( (hit, index) => {
                return(
                    <div key={index} className="news-container">
                        
                    <article className="news-articale">
                        <div className="articale-row1">
                            <h4>{hit.title}</h4>
                            <a href={hit.url}>Link</a>
                        </div>
                        
                        <div className="articale-row2">
                            <p>Date : {changeDate(hit.created_at)}</p>
                            <p>Author : {hit.author}</p>
                        </div>
                    </article>
                                            
                    </div>
                );
            })
        }
        </>
    );
}

export default Article;