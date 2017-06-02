import React, {Component} from 'react';
import Immutable from 'immutable';
import 'whatwg-fetch';
import MovieDetail from './MovieDetail';


class MoviesList extends Component{
    constructor(props){
        super(props);
        this.state = {
            //json:{},
            json: Immutable.fromJS({}),
            isLoading:true,
            sortOrder:{
                vote:true,
                score:true
            },
            like:new Map(),
            likeMovies:[],
            dislikeMovies:[]

        };
    }

    componentWillMount = ()=>{
        console.log('will mount!');
        
    }
    componentDidMount = ()=>{
        console.log('did Mount');
        this.fetchData();
    }
    componentWillUpdate = ()=>{
        console.log('will update!');
    }
    componentDidUpdate= ()=>{
        console.log('Did update!');

    }

    shouldComponentUpdate = (nextProps,nextState) =>{
        if(this.state.json !== nextState.json){
            console.log('should update');
            return true;
        }
        return false;
    }

    handleLike = (e) =>{
        const action = e.target.getAttribute('data-id');
        const title = e.target.getAttribute('data-title');
        let like=this.state.like;
        let likeMovies=this.state.likeMovies;
        let dislikeMovies=this.state.dislikeMovies;
        switch(action){
            case 'like':
            like.get(title) === 'like'? like.set(title,'none'): like.set(title,'like');

            break;
            case 'dislike':
            like.get(title) === 'dislike'? like.set(title,'none'):like.set(title,'dislike');

            break;
            default:console.log('there is something wrong with like and dislike');
        }
        this.setState({
            like:like,
            likeMovies:likeMovies,
            dislikeMovies:dislikeMovies
        });
        console.log('like');
        console.log(this.state.like);
    }

    handleClick = (e)=>{
        const action = e.target.getAttribute('data-id');
        let page=null;
        if(action==='prev'){
            page = this.state.json.page - 1;
        }else{
            page = this.state.json.page + 1;
        }
        if(page > 0 && page < this.state.json.total_pages){
            this.fetchData(page);
        }

    }

    handleSort = (e)=>{
        console.log('handling sort');
        const action = e.target.getAttribute('data-id');
        let json=this.state.json;
        let movies = json.results.slice(0);
        let newmovies = [];
        let sortOrder = this.state.sortOrder;
        switch(action){
            case 'score':
            if(sortOrder.score){
                newmovies = movies.sort((a,b)=>{
                    return b.vote_average-a.vote_average;

                });
                sortOrder.score = false;           
            }else{
                 newmovies = movies.sort((a,b)=>{
                    return a.vote_average-b.vote_average;

                });
                sortOrder.score = true;
            }
            sortOrder.vote = true;
            break;

            case 'vote':
            if(sortOrder.vote){
                newmovies = movies.sort((a,b)=>{
                    return b.vote_count-a.vote_count;
                });
                sortOrder.vote = false;
                
            }else{
                newmovies = movies.sort((a,b)=>{
                return a.vote_count-b.vote_count;
                });
                sortOrder.vote = true;
            }
            sortOrder.score = true;
            break;
            default: console.log('something wrong with sorting here!');

        }
        json.results = newmovies;
        this.setState({
            json:json,
            sortOrder:sortOrder
        });
    }

    fetchData = (page=1)=>{
        console.log('fetchData');
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=4bef8838c2fd078bd13d7127d8dedcd4&language=en-US?&page=${page}`).then(res => res.json()).then(json =>{
            console.log(json);
            let newJson = Immutable.fromJS(json); //imuutable
            this.setState({
                json:newJson,
                //immutable
                isLoading:false
            });
        });

    }

    render(){
        console.log('render!');
        return (
            <div>
                <button onClick={this.handleSort} data-id='score'>Sort by Score</button>
                <button onClick={this.handleSort} data-id='vote'>Sort by Vote</button>
                <button onClick={this.handleClick} data-id='prev'>Prev</button>
                <button onClick={this.handleClick} data-id='next'>Next</button>

            {
                this.state.isLoading ? 'Loading...':this.state.json.results.map((movie,index) => {
                    const display = this.state.like.get(movie.title) === 'dislike'? 'none': 'inline';
                    const backgroundColor = this.state.like.get(movie.title) === 'like'?'yellow':'black';
                    const howStyle={
                        display:display,
                        color:backgroundColor
                    };
                    return <MovieDetail howStyle={howStyle} detail={movie} key={index} like_dislike={this.handleLike}/>;
                })
            }
            </div>
        )
    }

}
export default MoviesList;