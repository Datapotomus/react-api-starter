import React, { Component } from "react";

//Bring in link from react-router-dom so we can link to the specific users
import { Link } from "react-router-dom";

class PostList extends Component {

    //Setup our initial state
    state = {
        loading: true,
        posts: [],
    };

    //When component mounts (displays on the screen) make a fetch request to an API
    componentDidMount() {

        //fetch request to the API that returns a promise object
        fetch("https://jsonplaceholder.typicode.com/posts")
            //on success of the fetch request, turn the response that came back into JSON
            .then((response) => response.json())
            //on success of turnig the response into JSON (data we can work with), lets add that data to state
            .then((data) => {
                //put the data in the console just so we can see it
                console.log("Data", data);
                
                //update state with the data from the API causing the page to re-render
                this.setState({
                    posts: data,
                    loading: false,
                });
            })
            //handle any errors/failures with getting data from the API
            .catch((error) => {
                console.log(error)
            });
    }

    render() {

        //using map, loop through the posts in state that came back from the API and build an array of <li> elements
        //storing them in userListItems 
        const postListItems = this.state.posts.map((post, index) => {
            return (
                <li key={index}>
                    {/* 
                        Link to the user component with the specifc user id so we can get that user from
                        the api and display their data 
                    */}
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                </li>
            );
        });

        //display data to the user
        //if we are still "loading" (getting the data from the API), display loading. 
        //otherwise, displayu the userListItems generated above
        return (
            <section>
                <h2>List of posts:</h2>
                {this.state.loading ? <h2>Loading...</h2> : <ul>{postListItems}</ul>}
            </section>
        );
    }
}

export default PostList;