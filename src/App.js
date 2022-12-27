import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const inputRef = useRef();
  const [text, setText] = useState();
  const [textState, setTextState] = useState();
  useEffect(() => {
    if ('OTPCredential' in window) {
      const ac = new AbortController();
      setTextState('Init');
      navigator.credentials.get({
        otp: { transport:['sms'] },
        signal: ac.signal
      }).then((otp) => {
        setTextState('INit OTP');
        setText(otp.code);
        inputRef.current.value = otp.code;
        // if (form) form.submit();
      }).catch((err) => {
        console.error(err);
      });
    }
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <p style={{color: 'white', minHeight: 40}}>{textState}</p>
          <p style={{color: 'white', minHeight: 40}}>{text}</p>
          <form>
            <input onChange={e => setText(e.currentTarget.value)} ref={inputRef}/>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
