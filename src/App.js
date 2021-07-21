import React, { Component } from 'react'
import './App.css'
import newLogo from './assets/newLogo.png'

class App extends Component{
  constructor(props){
    super(props)
    // the state object holds information that can be displayed to the user and updated throughout the program
    this.state = {
      // "phrase" is the text entered by the user - right now there are test words hard coded to make the process of testing your code faster and easier
      // ACTION ITEM: when you are ready for your full user experience, delete the test words so phrase is assigned an empty string
      phrase: "",
      // "phraseTranslated" is what the user will see appear on the page as Pig Latin, it starts as the preset message and updates when your user clicks the "submit" button
      phraseTranslated: ""
    }
  }

  // The "myPigLatinCodeHere" function is where you will put your logic to convert the sentence entered by the user to Pig Latin

  myPigLatinCodeHere = () => {
    // the variable "userInput" will contain the text input from the user modified into an array of words
    // no need to change this variable
    let userInput = this.state.phrase.split(" ")
    console.log("userInput:", userInput)//UserInput-->array
    // now that we have an array of words, we can map over the array and access each word
    let translatedWordsArray = userInput.map(currentWord => {
      // ACTION ITEM: use "currentWord" as a starting point for your code
    console.log("currentWord:", currentWord)//--->currentWord will the single str we gonna change to get the Pig Latin

    let vowelsArray = currentWord.split("").filter(vowel => {
        return vowel === "a" || vowel === "e" || vowel === "i" || vowel === "o" || vowel === "u"
      })
    console.log("vowelsArray:", vowelsArray)
      //1. find the index of first vowel
    let vowelIndex = -1
    for(let i=0; i< currentWord.length; i++){
        //Loop through until the first vowel is found
        if(vowelsArray.includes(currentWord[i])){
          //vowelIndex-for storing the index which the first vowel in the word is found.
          vowelIndex = currentWord.indexOf(currentWord[i]);
          break
        }
    }
    console.log(vowelIndex)
    // 2. if the vowel==u, we check the index of vowel-1---> q
    if(currentWord[vowelIndex] === "u" && currentWord[vowelIndex-1] === "q"){
        return currentWord.slice(vowelIndex + 1) + currentWord.slice(0,(vowelIndex + 1)) + "ay"
    }else if(vowelIndex === 0){
        //If first letter is a veowel, e.g. focus on userInput[0]-->"alpha"--->alphaway
        return currentWord + "way"
    }else if(vowelIndex === -1 && currentWord.includes("y")){
      return currentWord.slice(currentWord.indexOf("y")) + currentWord.slice(0,(currentWord.indexOf("y"))) + "ay"
    }else{
        //3. else: start with consonants, we gonan return new string
        return currentWord.slice(vowelIndex) +  currentWord.slice(0, vowelIndex) + "ay"
    }
 })

   // Remember: console.log is your friend :)
   // ACTION ITEM: change the value of currentWord to the name of whatever variable you made containing your Pig Latin'd word
    // joining the array back to a string of translated words
    // no need to change this variable
    let translatedWords = translatedWordsArray.join(" ")
    console.log("translatedWords:", translatedWords)
    // the setState method will take your information from "translatedWords" and update the state object that is displayed to the user
    // no need to change this method
    this.setState({phraseTranslated: translatedWords})

  }

  restartGame = () => {
    // this method restarts the game by setting the original state
    // ACTION ITEM: when you are ready for your full user experience, delete the test words in phrase so that is assigned an empty string
    this.setState({
      phrase: "",
      phraseTranslated: ""
    })
  }

  // no need to modify this method
  setUpPreventDefault = (e) => {
    // this method prevents React from refreshing the page unnecessarily
    e.preventDefault()
    this.myPigLatinCodeHere()
  }

  // no need to modify this method
  handleInput = (e) => {
    // this method takes the input and saves the value in this.state.phrase so we can use the input in our program
    this.setState({phrase: e.target.value})
  }

  render(){
    return(
      <>
        <h1>Pig Latin Translator</h1>
        <img
          src={newLogo}
          alt="pig with butcher cut names in pig latin"
          className="newLogo"
        />
        <div className="inputArea">
          <h4>Enter phrase to be translated:</h4>
          {/* user input field - every DOM event that happens in the input will call the handleChange method and update state */}
          <input
            type="text"
            className="userInput"
            onChange={this.handleInput}
            value={this.state.phrase}
          />
          <br />
          {/* button that called the setUpPreventDefault method which calls the myPigLatinCodeHere method */}
          <button onClick={this.setUpPreventDefault}>Submit</button>
          <button onClick={this.restartGame}>Clear</button>
        </div>
        <p>{this.state.phraseTranslated}</p>
        <footer>Coded by Yan and Arturo</footer>
      </>
    )
  }
}

export default App
