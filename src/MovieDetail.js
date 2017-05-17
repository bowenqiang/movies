import React, {Component} from 'react';

class MovieDetail extends Component{
    render(){
        console.log('movieDetail');
        return (
            <ul>
                <li><img src={`https://image.tmdb.org/t/p/w500${this.props.detail.poster_path}`} alt={this.props.detail.title} /></li>
                <li>{this.props.detail.title}</li>
                <li>Score:{this.props.detail.vote_average} Vote:{this.props.detail.vote_count}</li>
                <li>{this.props.detail.overview}</li>
            </ul>
        );
    }

}


export default MovieDetail;