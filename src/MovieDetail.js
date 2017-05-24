import React, {Component} from 'react';
import './MovieDetail.css';

class MovieDetail extends Component{

    handleLike = (e)=>{
        if(typeof this.props.like_dislike === 'function'){
            this.props.like_dislike(e);
        }
    }

    render(){
        console.log('movieDetail');
        return (
            <ul style={this.props.howStyle}>
                <li><img src={`https://image.tmdb.org/t/p/w500${this.props.detail.poster_path}`} alt={this.props.detail.title} /></li>
                <li>{this.props.detail.title}</li>
                <li>Score:{this.props.detail.vote_average} Vote:{this.props.detail.vote_count}
                    <button onClick={this.handleLike} data-id='like' data-title={this.props.detail.title}>Like</button>
                    <button onClick={this.handleLike} data-id='dislike' data-title={this.props.detail.title}>Dislike</button>
                </li>
                <li className="overview">{this.props.detail.overview}</li>
            </ul>
        );
    }

}


export default MovieDetail;