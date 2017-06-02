import React, {Component} from 'react';
import {BrowserRouter, Link,Route} from 'react-router-dom';
import MoviesList from './MoviesList.js';
import MoviesLike from './MoviesLike';
import MoviesDislike from './MoviesDislike';
import About from './About';
class Navigation extends Component {
    
    render(){
        return (
            <BrowserRouter>
                <div>
                    <Link to={'/'}>Home</Link>
                    <Link to={'/like'}>Like</Link>
                    <Link to={'/dislike'}>Dislike</Link>
                    <Link to={'/about'}>About</Link>
                    <Route exact={true} path="/" component={MoviesList}/>
                    <Route path={"/like"} component={MoviesLike} />
                    <Route path={"/dislike"} component={MoviesDislike} />
                    <Route path={"/about"} component={About} />
                </div>
            </BrowserRouter>
        );
    };

}
export default Navigation;