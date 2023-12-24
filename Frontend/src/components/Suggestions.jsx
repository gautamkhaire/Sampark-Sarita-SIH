import Image from "next/image";
import ideaIcon from "@/assets/Icons/idea.png";
import { useState, useEffect } from "react";
import suggestionImg from "@/assets/Images/Suggestion.png";
import DateTime from "@/components/DateTime";
import { Button } from "@/components/ui/button";
import axios from 'axios'
import useWebSocket from "react-use-websocket";
import SpeechToText from "./SpeechToText";

let count = 1;
const Suggestions = () => {
  let suggestionsArray = {
    textualDescription: "TEXT",
    question: "QS",
    answer: [],
  };

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "wss://serverfinal.mangosmoke-f0a47ece.centralindia.azurecontainerapps.io/get-data"
  );
  const [suggestedKnowledge, setSuggestedKnowledge] = useState([]);
  const [flag, setFlag] = useState(false);
  const [showNode, setShowNode] = useState();
  const [rootQuestion, setRootQuestion] = useState("");
  const [getLLMAnswer, setGetLLMAnswer] = useState(false);
  const [getShowLLMAnswer, setShowLLMAnswer] = useState(null);
  const [lookUp, setLookUp] = useState(false);
  const [lookUpData, setLookUpData] = useState(null);
  const [showNotFound, setShowNotFound] = useState(false)
  useEffect(() => {
    if (lastMessage !== null) {
      console.log(typeof JSON.parse(lastMessage.data));
      console.log(JSON.parse(lastMessage.data));
      if (typeof JSON.parse(lastMessage.data) ==="string" ) {
        setLookUp(true);
        setLookUpData(JSON.parse(lastMessage.data));
      } else if (JSON.parse(lastMessage.data)?.message != "No records found") {
        if (JSON.parse(lastMessage.data).length > 0) {
          setSuggestedKnowledge(JSON.parse(lastMessage.data));
          setFlag(true);
        } else if (
          typeof JSON.parse(lastMessage.data)?.message === "Records not found"
        ) {
          console.log("Records not found");
          setShowNode(JSON.parse(lastMessage.data));
          (false);
          console.log(JSON.parse(lastMessage.data));
        }
         else {
          setFlag(false);
          (true);
          setShowNode(JSON.parse(lastMessage.data));
        }
      } else {
        setShowNotFound(true)

      }
    }
  }, [lastMessage, ]);

  const handleSuggestionClick = (suggestion) => {
    setFlag(false);
    setShowNode(suggestion);
    (true);
    console.log(suggestion);
  };

  function clickedSubmit() {
    // sendMessage(`{"flag":1,"text":${text}}`);
    sendMessage(`{"flag":1,"text":"${rootQuestion}"}`);
    // sendMessage('{"flag":1,"keywords": ["payment"]}');
  }

  function clickedChildren(index) {
    sendMessage(`{"flag":0,"id": "${index}"}`);
  }

  function clickedNone() {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://serverfinal.mangosmoke-f0a47ece.centralindia.azurecontainerapps.io/prompt",{
              text: rootQuestion,
            }
                  );
        
        
        setShowLLMAnswer(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
    setLookUp(false);
    setGetLLMAnswer(true);
    setFlag(false);
    setShowNode(null);
    // console.log(JSON.parse(`{"flag":0,"text":"${rootQuestion}","id":"None"}`));

    // sendMessage(`{"flag":0,"text":"${rootQuestion}","id":"None"}`)
  }

  const [interimTranscriptText, setInterimTranscriptText] =
    useState("Suggestions");
  function textTranscript(text) {
    setInterimTranscriptText(text);
  }

  return (
    <div className="w-full flex flex-row items-center justify-evenly">
      <div className="w-8/12">
        <div className="flex flex-row justify-center items-center -mt-12 ml-3 mr-3 space-x-10">
          <Image
            src={suggestionImg}
            alt="Suggestion Vector Image"
            width={200}
            height={200}
          />
          <DateTime />
        </div>

        <div className="flex flex-col justify-end mr-5">
          <label className="text-gray-600 ml-2">
            Enter the query keywords:
          </label>
          <textarea
            value={rootQuestion}
            placeholder="Please enter the query keywords"
            onChange={(e) => {
              setRootQuestion(e.target.value);
            }}
            rows={7}
            columns={20}
            className="border-2 border-blue-500 rounded-2xl p-2 text-blue-500 font-semibold text-xl"
          />
          <div className="mt-2">
            <Button
              variant="outline"
              className="bg-blue-500 rounded-xl text-white font-bold hover:border-blue-700 hover:text-blue-500"
              onClick={() => clickedSubmit()}
            >
              Submit
            </Button>
          </div>
        </div>
        <hr className="h-1 bg-gray-300 mt-2 mb-2 mr-2" />
        <div className="flex flex-col justify-end mr-5 mb-4">
          <p className="text-gray-600 ml-2">Built-in Voice Recording:</p>
          <SpeechToText textTranscript={textTranscript} />
          <div className="mt-2">
            <Button
              variant="outline"
              className="bg-blue-500 rounded-xl text-white font-bold hover:border-blue-700 hover:text-blue-500"
              onClick={() => clickedSubmit(text)}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>

      {/* Suggestions Tab */}

      <div className="w-4/12 flex justify-start items-start mb-4">
        <div className="w-1 min-h-screen bg-gray-500 -mt-2"></div>
        <div className="w-full -my-2 bg-gradient-to-b from-cyan-100 to-sky-400 min-h-screen">
          <div className="flex flex-col justify-center items-center space-x-2 mb-4">
            <div className="flex flex-row space-x-2 items-center mt-2">
              <Image src={ideaIcon} alt="Idea's Icon" width={25} height={25} />
              <p className="text-2xl text-blue-500 font-bold text-center">
                Suggested Knowledge
              </p>
            </div>
          </div>
          {showNotFound?<>
            <div className="flex flex-col items-center justify-center">
            <p>No Records Found.</p>
            <Button
                        variant="outline"
                        className="bg-gray-400 rounded-xl text-white font-semibold hover:border-blue-700 mb-2"
                        onClick={()=>{clickedNone()}}
                      >
                        Get Possible Answers
                </Button>
            </div>
            
          </>:<>
          {lookUp ? (
            <>
              <div className="m-2 flex flex-col justify-center items-center">
                <p className="text-blue-700 font-extrabold text-center text-xl">
                  Final Answer
                </p>
                <div className="w-3/4 p-4 mt-2 mb-3 bg-white bg-opacity-30 backdrop-blur-lg rounded-3xl drop-shadow-lg border-2 border-gray-700">
                  <p className="text-gray-600 font-bold text-md">{lookUpData}</p>
                </div>
                <Button
                        variant="outline"
                        className="bg-gray-400 rounded-xl text-white font-semibold hover:border-blue-700 mb-2"
                        onClick={
                          ()=>{
                            clickedNone()
                          }
                        }
                      >
                        Not Satisfied
                </Button>
              </div>
            </>
          ) : (
            <>
              {getLLMAnswer ? (
                <>
                  {/* 

Data is coming in this format.
```python
[
    "Verify your billing information and make sure you have sufficient funds.",
    "Check for any pending or overdue invoices that may need to be settled.",
    "Explore alternative payment methods offered by the merchant or service provider.",
    "Contact the merchant or service provider's customer support for assistance resolving payment issues."
]
``` */}
<div className="flex flex-col justify-center items-center">

<div className="flex justify-center items-center">
<div className="w-3/4 p-4 mt-2 mb-3 bg-white bg-opacity-30 backdrop-blur-lg rounded-3xl drop-shadow-lg border-2 border-gray-700">
                  <p className="text-gray-600 font-bold text-md">{getShowLLMAnswer}</p>
                </div>
</div>
<Button
                              variant="outline"
                              className="bg-gray-400 rounded-xl text-white font-semibold hover:border-blue-700 mb-2"
                              onClick={() => {
                                clickedNone();
                              }}
                            >
                              
                                Not Satisfied
                            </Button>
</div>
                </>
              ) : (
                <>
                  {flag && (
                    <>
                      {suggestedKnowledge.map((suggestion, index) => (
                        <div
                          className="m-2 flex flex-col justify-center items-center"
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <div class="w-3/4 transform transition duration-500 hover:scale-105 m-2">
                            <div className="p-4 mb-3 bg-white bg-opacity-30 backdrop-blur-lg rounded-3xl drop-shadow-lg border-2 border-gray-500  hover:border-blue-700">
                              <p className="text-xl text-gray-800 font-extrabold text-center mb-4">
                                {suggestion["textualDescription"]}
                              </p>

                              <p className="text-gray-600 font-bold text-md">
                                <span className="text-gray-700 text-lg">
                                  Ask Question:
                                </span>{" "}
                                {suggestion["question"]}
                              </p>
                              <p className="py-4 text-lg font-semibold text-blue-500">
                                Click Here!
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  {showNode && (
                    <>
                      <div className="w-full flex flex-col items-center text-center">
                        <p className="text-xl text-gray-800 font-extrabold text-center mb-4">
                          {showNode["textualDescription"]}
                        </p>
                        <p className="text-gray-600 font-bold text-md">
                          {typeof showNode["answer"] !== "string" ? (
                            <span className="text-gray-700 text-lg">
                              Ask Question: {showNode["question"]}
                            </span>
                          ) : (
                            ""
                          )}
                          {/* {showNode["question"]} */}
                        </p>
                      </div>
                      <div className="m-2 flex flex-col justify-center items-center">
                        <p className="text-blue-700 font-extrabold text-center text-xl">
                          {typeof showNode["answer"] !== "string"
                            ? "Choose an Option"
                            : "Final Answer"}
                        </p>
                        <div className="w-3/4 p-4 mt-2 mb-3 bg-white bg-opacity-30 backdrop-blur-lg rounded-3xl drop-shadow-lg border-2 border-gray-700">
                          <div className="m-2 flex flex-col items-center justify-center">
                            {typeof showNode["answer"] !== "string" ? (
                              showNode["answer"].map((value, index) => (
                                <>
                                  <Button
                                    variant="outline"
                                    className="bg-blue-400 rounded-xl text-white font-semibold hover:border-blue-700 mb-2"
                                    onClick={() => {
                                      clickedChildren(value.id);
                                    }}
                                  >
                                    {value.optionText}
                                  </Button>
                                </>
                              ))
                            ) : (
                              <p>{showNode["answer"]}</p>
                            )}

                            <Button
                              variant="outline"
                              className="bg-gray-400 rounded-xl text-white font-semibold hover:border-blue-700 mb-2"
                              onClick={() => {
                                clickedNone();
                              }}
                            >
                              {typeof showNode["answer"] !== "string"
                                ? "None"
                                : "Not Satisfied?"}
                            </Button>
                            {/* {showNode["answer"] !== "string" && (
                      <Button
                        variant="outline"
                        className="bg-gray-400 rounded-xl text-white font-semibold hover:border-blue-700 mb-2"
                        onClick={() => {
                          clickedNone("None", text);
                        }}
                      >
                        None
                      </Button>
                    )} */}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
          </>}
          
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
// showLLMAnswer && <>
//                         <p className="text-xl text-gray-800 font-extrabold text-center mb-4">
//                           {showLLMAnswer[currentIndex]}
//                         </p>
//                         <Button
//                           variant="outline"
//                           className="bg-green-400 rounded-xl text-white font-semibold hover:border-blue-700 mb-2"
//                           onClick={handleSatisfied}
//                         >
//                           Satisfied
//                         </Button>
//                         <Button
//                           variant="outline"
//                           className="bg-red-400 rounded-xl text-white font-semibold hover:border-blue-700 mb-2"
//                           onClick={handleNotSatisfied}
//                         >
//                           Not Satisfied
//                         </Button>

//                     {satisfiedFlag && <p>Thank You for your response !</p>}
//                     {!satisfiedFlag && currentIndex != 3 && (
//                       <p>
//                         Sorry, we will get back to you within 10 to 15 minutes
//                         after consulting with our expert.
//                       </p>
//                     )}
