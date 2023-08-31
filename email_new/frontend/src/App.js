import axios from "axios";
import { useState } from "react";
import './App.css';

// Test

function App() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const sendEmail = async (e) => {
    e.preventDefault();

    const data = {
      to: email,
      subject: subject,
      message: message,
    };

    const response = await axios.post(
      "http://localhost:5000/api/sendemail", data
    );
    console.log(response.data);
  };

  return (
    <div className="--flex-center --bg-primary --100vh">
      <div className="--width-500px --card --p --bg-light">
        <form className="--form-control" onSubmit={sendEmail}>
          <h1>EWB Emailer </h1>
          <img src="https://static.wixstatic.com/media/10c3b0_464d072d0f424ea2b1400736d24ba998~mv2.png/v1/fill/w_106,h_106,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/EWB_LOGO_web_clear_back.png" alt="React Image" />
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div> 
            <label htmlFor="subject">Subject</label>
            <input
            type="text"
            name="subject" // Add the name attribute
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea
              name="message" // Add the name attribute
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="--btn --btn-primary">
              Send Email
          </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default App;
