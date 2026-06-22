import React, { useState } from "react";
import axios from "axios";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
export default function Textform(props) {
  const [text, setText] = useState("");

  const [summary, setSummary] = useState("")


  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleUpClick = () => {
    setText(text.toUpperCase());
    props.showAlert("Converted to uppercase!", "success");
  };

  const handleLowerClick = () => {
    setText(text.toLowerCase());
    props.showAlert("Converted to lowercase!", "success");
  };

  const handletoSpeak = () => {
    let msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
    props.showAlert("Speaking text!", "success");
  };

  const handleClearClick = () => {
    setText("");
    props.showAlert("Text cleared!", "success");
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/).join(" ");
    setText(newText);
    props.showAlert("Extra spaces removed!", "success");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Copied to clipboard!", "success");
  };

const handleAISummary = async () => {
  console.log(API_KEY);

  try {
    const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,

      {
        contents: [
          {
            parts: [
              {
                text: `Summarize this text:\n${text}`,
              },
            ],
          },
        ],
      }
    );

    const result =
      response.data.candidates[0].content.parts[0].text;

    setSummary(result);
    props.showAlert("Summary generated!", "success");
  } catch (error) {
    console.log(error.response?.data || error);
    props.showAlert("Failed to generate summary", "danger");
  }
};



  return (
    <>
      <div
        className={`container text-${
          props.mode === "dark" ? "light" : "dark"
        }`}
      >
        <h1>{props.heading}</h1>

        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            id="mybox"
            rows="8"
            style={{
              backgroundColor: props.mode === "dark" ? "#042743" : "white",
              color: props.mode === "dark" ? "white" : "black",
            }}
          ></textarea>
        </div>

        <div className="my-3 d-flex flex-wrap gap-3">
          <button className="btn btn-primary" onClick={handleUpClick}>
            Convert to Uppercase
          </button>

          <button className="btn btn-primary" onClick={handleLowerClick}>
            Convert to Lowercase
          </button>

          <button className="btn btn-primary" onClick={handletoSpeak}>
            Text to Speech
          </button>

          <button className="btn btn-primary" onClick={handleCopy}>
            Copy Text
          </button>

          <button className="btn btn-primary" onClick={handleExtraSpaces}>
            Remove Extra Spaces
          </button>

          <button className="btn btn-danger" onClick={handleClearClick}>
            Clear Text
          </button>


          <button className="btn btn-success" onClick={handleAISummary}>
  AI Summarize
</button>
        </div>
      </div>

      <div
        className={`container my-3 text-${
          props.mode === "dark" ? "light" : "dark"
        }`}
      >
        <h1>Your Text Summary</h1>

        <p>
          {
            text.split(/\s+/).filter((element) => element.length !== 0).length
          }{" "}
          words and {text.length} characters
        </p>

        <p>
          {0.008 *
            text.split(/\s+/).filter((element) => element.length !== 0).length}{" "}
          Minutes read
        </p>

        <h2>Preview</h2>

        <p>{text.length > 0 ? text : "Nothing to preview"}</p>
<p>
  {summary.length > 0
    ? summary
    : "AI summary will appear here"}
</p>

      </div>
    </>
  );
}