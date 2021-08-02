import React, { Component } from "react";

class Post extends Component {

    //setup initial state to hold the data we want to display for a user
    state = {
        id: "",
        title: "",
        body: "",
    };

    //when the component mounts (displays on screen) get the user from the API
    componentDidMount() {

        //get the id from the URL to make the API call
        const id = this.props.match.params.id;

        //use fetch to make an API call and get a specific user (returns a promise)
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            //on success of the fetch request, turn the response that came back into JSON
            .then((response) => response.json())
            //on success of turnig the response into JSON (data we can work with), lets add that data to state
            .then((data) => {
                
                //put the data in the console just so we can see it
                console.log("Data", data);

                //update state with the data from the API causing the page to re-render
                this.setState({
                    id: data.id,
                    title: data.title,
                    body: data.body,
                });
            })
            //handle any errors/failures with getting data from the API
            .catch((error) => {
                console.log(error)
            });
    }

    render() {
        //display the user data that is in state
        return (
            <section>
                <h1>{this.state.title}'s Post Page</h1>
                <h2>This is post #{this.state.id}</h2>
                <p>Title: {this.state.title}</p>
                <p>Body: {this.state.body}</p>
            </section>
        );
    }
}

export default Post;