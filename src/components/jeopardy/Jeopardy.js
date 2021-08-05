import React, { Component } from 'react';

class Jeopardy extends Component {

  state = {
    data: {
      category:{
        title: ""
      }
    },
    score: 0,
    formData: {
      answer: ""
    }
  }

  //get a new random question from the API and add it to the data object in state
  getNewQuestion() {
    //use fetch to make an API call and get a random Jeopardy question (returns a promise)
    fetch(`https://jservice.io/api/random`)
        //on success of the fetch request, turn the response that came back into JSON
        .then((response) => response.json())
        //on success of turnig the response into JSON (data we can work with), lets add that data to state
        .then((data) => {
            
            //put the data in the console just so we can see it
            console.log("data from the api", data);
            // attempting to log out just the category info.
            console.log("Category from the api: ", data[0].category.title)

            //update state with the data from the API causing the page to re-render
            this.setState({
                data: data[0], //grab the first question from the array returned
                category_title: data[0].category.title,
                correct_answer: data[0].answer
            });

            console.log("logging category state data: ", this.state.data.category.title)
        })

        
        //handle any errors/failures with getting data from the API
        .catch((error) => {
            console.log(error)
        });
  }

  //when the component mounts, get a the first question
  componentDidMount() {
    this.getNewQuestion();
  }

  handleChange = (event) => {
    let formData = this.state.formData; formData[event.target.name] = event.target.value; this.setState({ formData });
  }

  handleSubmit = (event) => {
    event.preventDefault(); 
    let newScore = this.state.score + this.state.data.value
    this.setState({
      score: newScore
    })
  }


  resetForm = (event) => {
    this.setState({
      formData: {
        answer: ""
      }
    })
  } 


  //display the results on the screen
  render() {
    const answerIsLoaded = this.state.data.category.title
    let renderTitle;

    if (answerIsLoaded === ""){
      renderTitle = <div>Category Title (Conditional): Loading...</div>;
    } else {
      renderTitle = <div>Category Title(Conditional): {this.state.data.category.title} </div>;
    }

    return (
      <div>
        
        {renderTitle}
        <br />
        Question: {this.state.data.question}
        <br />
        Category Title: {this.state.data.category.title}
        <br />
        Point Value: {this.state.data.value}
        <br />
        {/* <form onSubmit={this.handleSubmit}> */}
        <br />
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Answer: What is(are)</label>
            {/* <input onChange={this.handleChange} type="text" name="firstName" value={this.state.formData.firstName} /> */}
            <input onChange={this.handleChange} type="text" name="answer" placeholder="Answer" value={this.state.formData.answer}/>
          </div>
          <button onClick={this.resetForm}>Submit Form</button> 
        </form>
        Current Points: {this.state.score}
        <br />
        Test Answer: {this.state.correct_answer}
        <br />
        Form data: {this.state.formData.answer}
      </div>
    );
  }
}

export default Jeopardy;