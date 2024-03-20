import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // New state variable

  const askQuestion = async () => {
    setIsLoading(true); // Set loading to true when the request starts
    try {
      const response = await axios.get(`http://192.168.100.78:5000/generate_content/${input}`);
      setHistory([...history, { question: input, answer: response.data }]);
      setInput('');
    } catch (error) {
      console.error('There was an error!', error);
    }
    setIsLoading(false); 
  };

  return (
<div className="container">
    <div className="fixed-top">
      <input className="input" name="text" value={input} placeholder="Ask AI" type="search" onChange={e => setInput(e.target.value)}/>
      <button className="button" onClick={askQuestion} disabled={isLoading}>
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> Ask
      </button>
    </div>

      {isLoading ? <div class="dot-spinner">
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
    </div> : null}
  
      {history.map((item, index) => (
        <div key={index} className="history-item">
          <p>Question: {item.question}</p>
          <p>Answer: {item.answer}</p>
        </div>
      ))}
    </div>
  );
}

export default App;