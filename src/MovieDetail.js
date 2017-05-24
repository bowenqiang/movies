import React, {Component} from 'react';
import './MovieDetail.css';
import PropTypes from 'prop-types';

class MovieDetail extends Component{


    handleLike = (e)=>{
        if(typeof this.props.like_dislike === 'function'){
            this.props.like_dislike(e);
        }
    }

    shouldComponentUpdate(nextProps,nextState){
        if(this.props.like_dislike !==nextProps.like_dislike){
            return true;
        }
        return false;
    }

    render(){
        PropTypes.checkPropTypes(MovieDetail.propTypes,this.props,'props','MovieDetail');
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

MovieDetail.propTypes = {
        howStyle:PropTypes.shape({
            display:PropTypes.string,
            color:PropTypes.string
        }),
        detail:PropTypes.shape({
            vote_average:PropTypes.number.isRequired,
            vote_count:PropTypes.number.isRequired,
            title:PropTypes.string.isRequired,
            overview:PropTypes.string,
            poster_path:PropTypes.string.isRequired
        }),
        like_dislike:PropTypes.func.isRequired
    }


export default MovieDetail;