import React, { useEffect } from "react";
import "./Jarvis.css";
import ironman from "../assets/iron.gif"
import inputgif from "../assets/input.gif"

const Jarvis = () => {
  useEffect(() => {
    const btn = document.querySelector(".talk");
    const cancel = document.querySelector(".cancel");
    const content = document.querySelector(".content");
    const inputGif = document.querySelector(".inputgif");
    const ironman = document.querySelector(".ironman");
    const resultArea = document.querySelector(".resultArea");
    const descrip = document.querySelector(".descrip");
    const sendbtn = document.querySelector(".send-btn");

    resultArea.style.color = "blue";

    function speak(text) {
      const text_speak = new SpeechSynthesisUtterance(text);
      text_speak.rate = 0.8;
      text_speak.volume = 2;
      text_speak.pitch = 0.5;
      window.speechSynthesis.speak(text_speak);
    }

    function grreet() {
      var date = new Date();
      var hour = date.getHours();

      if (hour >= 0 && hour <= 11) {
        speak("Good morning sir,How can i help you today");
      } else if (hour >= 12 && hour <= 15) {
        speak("Good afternoon sir,How can i help you today");
      } else if (hour >= 16) {
        speak("Good evening sir,How can i help you today");
      }
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    btn.addEventListener("click", () => {
      recognition.start();
      ironman.style.display = "none";
      inputGif.style.display = "block";
      cancel.style.display = "block";
      resultArea.innerHTML = "";
      btn.style.display = "none";
    });

    cancel.addEventListener("click", () => {
      recognition.stop();
      ironman.style.display = "block";
      inputGif.style.display = "none";
      btn.style.display = "block";
      descrip.style.display = "block";
      content.placeholder = "Enter your command or speak ";
      cancel.style.display = "none";
    });

    recognition.onresult = (event) => {
      const currentIndex = event.resultIndex;
      const transcript = event.results[currentIndex][0].transcript;
      content.placeholder = transcript;
      takeCommand(transcript.toLowerCase());
      ironman.style.display = "block";
      descrip.style.display = "none";
      inputGif.style.display = "none";
      cancel.style.display = "none";
      btn.style.display = "block";
    };

    sendbtn.addEventListener("click", () => {
      const input = content.value;
      takeCommand(input.toLowerCase());
      ironman.style.display = "block";
      descrip.style.display = "none";
      inputGif.style.display = "none";
      cancel.style.display = "none";
      btn.style.display = "block";
    });

    function takeCommand(message) {
        const greeting = ["Hello Sir, How May I Help You?", "Hi there! What can I do for you?", "Hey, how’s your day going?"]
        let triviaQuestions = [
            { question: "What is the capital of France?", answer: "paris" },
            { question: "Who wrote Harry Potter?", answer: "jk rowling" },
            { question: "How many continents are there?", answer: "7" },
        ];
        
        let currentQuestion = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
        if (message.includes('hey') || message.includes('hello')) {
            const index = Math.floor(Math.random() * greeting.length)
            const response = greeting[index]
            speak(response);
            resultArea.innerHTML = response;
            content.innerHTML= ""
        }
         else if (message.includes("who is manvender") || message.includes("manv") || message.includes("manvender")) {
            speak("he is my master who created me")
            resultArea.innerHTML = "he is my master who created me"
    
    
        } else if (message.includes("play music") || message.includes("music") || message.includes("play song") || message.includes("play gaana")) {
            window.open("https://www.youtube.com/watch?v=RgKAFK5djSk&list=PLeCdlPO-XhWFzEVynMsmosfdRsIZXhZi0&ab_channel=WizKhalifaMusic", "_blank");
            speak("opening youtube... to play your song")
        }
        else if (message.includes("namaste")) {
            speak("Nameste Sir, How May I Help You?");
        } else if (message.includes('who am i ') || message.includes('who is your master?') || message.includes("who created you?")) {
            speak("You are Manvender Singh,my master, who created me.");
        } else if (message.includes("open google")) {
            window.open("https://google.com", "_blank");
            speak("Opening Google...");
        } else if (message.includes("open youtube")) {
            window.open("https://youtube.com", "_blank");
            speak("Opening Youtube...");
        } else if (message.includes("open facebook")) {
            window.open("https://facebook.com", "_blank");
            speak("Opening Facebook...");
        } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
            window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
            const finalText = "This is what I found on the internet regarding " + message;
            speak(finalText);
        } else if (message.includes('wikipedia')) {
            window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
            const finalText = "This is what I found on Wikipedia regarding " + message;
            speak(finalText);
        } else if (message.includes('time')) {
            const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
            const finalText = "The current time is " + time;
            speak(finalText);
        } else if (message.includes('date')) {
            const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
            const finalText = "Today's date is " + date;
            speak(finalText);
        } else if (message.includes('calculator')) {
            window.open('Calculator:///');
            const finalText = "Opening Calculator";
            speak(finalText);
        } else if (message.includes('wordpad')) {
            window.open('WordPad:///');
            const finalText = 'Opening Word Pad';
            speak(finalText);
        } else if (message.includes("tell me a joke") || message.includes("joke")) {
            fetch('https://official-joke-api.appspot.com/jokes/ten')
                .then(response => response.json())
                .then(data => {
                    const randomIndex = Math.floor(Math.random() * data.length)
                    const randomjoke = data[randomIndex]
                    speak(randomjoke.setup)
                    resultArea.innerHTML = randomjoke.setup
                    setTimeout(() => {
                        speak(randomjoke.punchline)
                        resultArea.innerHTML += `<br> ${randomjoke.punchline}`;
                    }, 2000);
    
                }
                );
        } else if (message.includes("tell me a fact") || message.includes("random fact") || message.includes("fact")) {
            fetch('https://uselessfacts.jsph.pl/random.json?language=en')
                .then(response => response.json())
                .then(data => {
                    const result = data
                    speak(result.text);
                    resultArea.innerHTML = result.text;
                });
        }else if (message.includes("who are you") || message.includes("tell me about yourself")) {
            let responses = [
                "I am your personal assistant, always ready to help you!",
                "I am an AI designed by Manvender, here to assist you!",
                "I am Jarvis, but not as cool as Tony Stark’s version!"
            ];
            let response = responses[Math.floor(Math.random() * responses.length)];
            speak(response);
            resultArea.innerHTML = response;
        }else if (message.includes("play rock paper scissors")) {
            let choices = ["rock", "paper", "scissors"];
            let userChoice = message.split(" ").pop(); // Extract user's choice
            let aiChoice = choices[Math.floor(Math.random() * choices.length)];
        
            let result = "";
            if (userChoice === aiChoice) {
                result = "It's a tie!";
            } else if (
                (userChoice === "rock" && aiChoice === "scissors") ||
                (userChoice === "paper" && aiChoice === "rock") ||
                (userChoice === "scissors" && aiChoice === "paper")
            ) {
                result = `You win! I chose ${aiChoice}.`;
            } else {
                result = `I win! I chose ${aiChoice}.`;
            }
        
            speak(result);
            resultArea.innerHTML = result;
        }else if(message.includes("refund") || message.includes("return")|| message.includes("money back")){
                  speak("these are the step for how to return/replace an item in URBAN CART and refund")
            resultArea.innerHTML = "these are the step for how to return/replace an item in URBAN CART and refund  ";
        }else if(message.includes("urban-cart") || message.includes("urban")|| message.includes("what is urban cart")){
                  speak("Urban Cart is a modern e-commerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to browse, purchase, and manage products seamlessly with a user-friendly interface.")
            resultArea.innerHTML = "Urban Cart is a modern e-commerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to browse, purchase, and manage products seamlessly with a user-friendly interface.";
        }
        else {
            window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
            const finalText = "I found some information for " + message + " on Google";
            speak(finalText);
        }
    }

    // const checkbox = document.getElementById("checkbox");
    // checkbox.addEventListener("change", () => {
    //   document.body.classList.toggle("dark");
    // });
  }, []);

  return (
    <>
    <div className="main">
        {/* <div>
            <input type="checkbox" class="checkbox" id="checkbox"/>
            <label for="checkbox" class="checkbox-label">
              <i class="fas fa-moon"></i>
              <i class="fas fa-sun"></i>
              <span class="ball"></span>
            </label>
          </div> */}
        <div className="image-container">
            <div className="image">
                <img className="ironman" src={ironman} alt="image"/>
                <img className="inputgif" src={inputgif} alt="image"/>
            </div>
            <h1 className="jarvistitle">J A R V I S</h1>
            <p className="descrip">I m a Virtual Assistant JARVIS, How may I help you?</p>
            <div>
            <p className="resultArea"></p>
        </div>
        </div>
        <div className="input">
            <button className="talk"><i className="fas fa-microphone-alt"></i></button>
            <button className="cancel">cancel</button>
            <input className="content" placeholder="Enter your command or speak "   />
            <button className="send-btn"> send</button>
            
        </div>
    </div>
   
    </>
  );
};

export default Jarvis;