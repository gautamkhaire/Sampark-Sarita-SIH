'use client'
import React, {useState} from 'react'


export default function BasicExample() {

    const [description, setDescription] = useState('')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [customer, setCustomer] = useState('')
    const [agent, setAgent] = useState('')
    const [message, setMessage] = useState('')

  const handleSubmit = () => {
    const unFetchData = async () => {
      try {
        const response = await axios.post(
          "https://serverfinal.mangosmoke-f0a47ece.centralindia.azurecontainerapps.io/ticket",
          {
            description,
            question,
            answer,
            customer,
            agent,
            message
          }
        );
        console.log("Response:", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    unFetchData();
  };

  return (
    <div className="max-w-screen-md mx-auto p-5">
      <div className="text-center mb-16">
        <p className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
          Submission Ticket
        </p>
        <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
          Raise a query with  <span className="text-blue-600">Executive</span>
        </h3>
      </div>

      <form className="w-full">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase text-gray-700 text-xs font-bold mb-2"
            >
              Description
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              onChange={e=>{setDescription(e.target.value)}}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase text-gray-700 text-xs font-bold mb-2"
            >
              Question
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              onChange={e=>{setQuestion(e.target.value)}}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase text-gray-700 text-xs font-bold mb-2"
            >
              Answer (Optional)
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              onChange={e=>{setAnswer(e.target.value)}}
            />
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Customer Satifaction
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" 
        onChange={e=>{setCustomer(e.target.value)}}
      />
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Agent Satisfaction
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" 
        onChange={e=>{setAgent(e.target.value)}}
      />
    </div>
  </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Your Message (Optional)
            </label>
            <textarea
            onChange={e=>{setMessage(e.target.value)}}
              rows="10"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            ></textarea>
          </div>
          <div className="flex justify-between w-full px-3">
            <div className="md:flex md:items-center">
              <label className="block text-gray-500 font-bold">
                <input className="mr-2 leading-tight" type="checkbox" />
                <span className="text-sm">Send me a copy of this respone</span>
              </label>
            </div>
            <button
              className="shadow bg-blue-600 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
              type="submit"
              onClick={handleSubmit}
            >
              Submit Ticket
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
