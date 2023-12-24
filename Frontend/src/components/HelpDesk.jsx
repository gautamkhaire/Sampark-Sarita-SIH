import Image from "next/image";
import Help from "../assets/Images/Help_Desk.jpg";

import { FaDatabase } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { MdAssistant } from "react-icons/md";

import Link from "next/link";

const HelpDesk = () => {
  return (
    <div className="w-full flex flex-col justify-start items-center -mt-7">
      <Image src={Help} alt="Help Desk Image" width={500} height={400} />
      <div className="flex flex-row justify-around items-center space-x-4 mb-4 -mt-16">
        <div className="text-center">
          <a
            href="#"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 flex flex-row justify-evenly items-center">
            <MdAssistant /> Welcome and Overview
            </h5>
            <p class="font-normal text-gray-700">
              We're here to assist you with any queries or issues you may
              encounter. Explore the resources below for quick solutions and
              efficient support.
            </p>
          </a>
        </div>
        <div className="text-center">
        
        <a
            href="/submissionTicket"
            target="_blank"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 flex flex-row justify-evenly items-center">
              <IoTicket/> Submit a Support Ticket
            </h5>
            <p class="font-normal text-gray-700">
              Need assistance? Use our user-friendly ticket submission form to
              report issues or request help. Our team will promptly address your
              concerns !
            </p>
          </a>
        
        </div>
        <div className="text-center">
          <a
            href="#"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 flex flex-row justify-evenly items-center">
                <FaDatabase /> Knowledge Base and FAQs
            </h5>
            <p class="font-normal text-gray-700">
              Explore our comprehensive knowledge base and FAQs for step-by-step
              guides, troubleshooting tips, and answers to common questions.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpDesk;
