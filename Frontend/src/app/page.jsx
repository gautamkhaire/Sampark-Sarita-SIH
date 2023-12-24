import "regenerator-runtime/runtime";
import { UserButton,currentUser } from "@clerk/nextjs";
import Service_24_7 from "../assets/Images/Service_24_7.png";
import HomePageStat from "../assets/Images/HomePage_Statistics.png";
import Image from "next/image";

import featureSmart from "@/assets/Icons/feature_smart_suggestions.png";
import featureStatistics from "@/assets/Icons/feature_statistics.png";
import featureVoice from "@/assets/Icons/feature_voice_recognition.png";
import featureDecisionTree from "@/assets/Icons/feature_decision_tree.png";
import featureLanguages from "@/assets/Icons/feature_multilanguage.png";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <div className="mt-4 w-full flex flex-row items-center justify-around">
        <Image src={Service_24_7} alt="Hero Banner" width={500} height={500} />

        <p className="w-1/2 font-semibold text-gray-600 text-center text-2xl">
          <span className="italic text-blue-600 font-extrabold text-3xl">
            &ldquo; Happy agents mean happy customers. &rdquo;{" "}
          </span>
          <br />
          <br /> Join us today to empower your agents,{" "}
          <span className="text-blue-500 font-bold">
            Streamline Answers
          </span>{" "}
          and unlock the{" "}
          <span className="text-blue-500 font-bold">
            Best of Contact Center Support
          </span>{" "}
          with the power of Decision Trees.
        </p>
      </div>

      <div className="mt-4 w-full flex flex-row items-center justify-around mb-10">
        <div className="w-1/3">
          <div className="duration-500 hover:scale-110">
            <div className="flex flex-row space-x-5 items-center mb-1">
              <p className="text-2xl text-gray-700">50%</p>
              <div className="w-full h-4 mb-4 bg-gray-200 rounded-full">
                <div className="h-4 bg-blue-600 rounded-full w-1/2"></div>
              </div>
            </div>
            <p className="text-xl text-gray-600">
              Customer Service Agents don't know the answer
            </p>
          </div>
          <div className="mt-4 duration-500 hover:scale-110">
            <div className="flex flex-row space-x-5 items-center mb-1">
              <p className="text-2xl text-gray-700">41%</p>
              <div className="w-full h-4 mb-4 bg-gray-200 rounded-full">
                <div className="h-4 bg-blue-600 rounded-full w-2/5"></div>
              </div>
            </div>
            <p className="text-xl text-gray-600">
            Different Customer Service Agent give different answers
            </p>
          </div>
          <div className="mt-4 duration-500 hover:scale-110">
            <div className="flex flex-row space-x-5 items-center mb-1">
              <p className="text-2xl text-gray-700">31%</p>
              <div className="w-full h-4 mb-4 bg-gray-200 rounded-full">
                <div className="h-4 bg-blue-600 rounded-full w-1/3"></div>
              </div>
            </div>
            <p className="text-xl text-gray-600">
            Can't find answers on website
            </p>
          </div>
          <div className="mt-4 duration-500 hover:scale-110">
            <div className="flex flex-row space-x-5 items-center mb-1">
              <p className="text-2xl text-gray-700">17%</p>
              <div className="w-full h-4 mb-4 bg-gray-200 rounded-full">
                <div className="h-4 bg-blue-600 rounded-full w-2/12"></div>
              </div>
            </div>
            <p className="text-xl text-gray-600">
            Other factors
            </p>
          </div>

        </div>
        <div className="w-1/2 flex flex-col items-center">
          <Image
            src={HomePageStat}
            alt="Hero Banner Statictics"
            width={500}
            height={500}
          />
          <p className="text-2xl text-gray-600 font-medium text-center">
            Presenting{" "}
            <span className="text-3xl text-blue-500 font-bold">
              'Sampark Sarita'
            </span>
            , our all-inclusive platform to solve the biggest pain points in the
            contact center and service industry
          </p>
        </div>
      </div>

      <div className="mt-2 text-center">
        <h2 className="font-extrabold text-3xl text-blue-600 mb-4">
          Innovativeness
        </h2>

        <div className="flex mx-auto gap-8 w-10/12 mb-4 group">
          <div className="duration-500 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-105 p-8 rounded-3xl bg-gray-500 bg-opacity-20 backdrop-blur-lg drop-shadow-lg border-2 border-white  hover:border-blue-700 flex flex-col items-center">
            <Image
              src={featureSmart}
              alt="Smart Suggestion Icon"
              width={50}
              height={50}
            />
            <h4 className="text-xl font-bold text-blue-600 mt-1 mb-1">
              Real-time Suggestions
            </h4>
            <p className="text-md leading-7 my-3 font-medium text-gray-700">
              Accelerate issue resolution with this decision-treee powered
              automated suggestion feature
            </p>
          </div>

          <div className="duration-500 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-105 p-8 rounded-3xl bg-gray-500 bg-opacity-20 backdrop-blur-lg drop-shadow-lg border-2 border-white  hover:border-blue-700 flex flex-col items-center">
            <Image
              src={featureStatistics}
              alt="Smart Suggestion Icon"
              width={50}
              height={50}
            />
            <h4 className="text-xl font-bold text-blue-600 mt-1 mb-1">
              Detailed Agent Statistics
            </h4>
            <p className="text-md leading-7 my-3 font-medium text-gray-700">
              Gain comprehensive insights into agent performance with detailed
              statistics for informed decision-making
            </p>
          </div>

          <div className="duration-500 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-105 p-8 rounded-3xl bg-gray-500 bg-opacity-20 backdrop-blur-lg drop-shadow-lg border-2 border-white  hover:border-blue-700 flex flex-col items-center">
            <Image
              src={featureVoice}
              alt="Smart Suggestion Icon"
              width={50}
              height={50}
            />
            <h4 className="text-xl font-bold text-blue-600 mt-1 mb-1">
              In-built Voice Integration
            </h4>
            <p className="text-md leading-7 my-3 font-medium text-gray-700">
              Enable seamless communication between customers and agents with
              real-time speech transcription and calling
            </p>
          </div>

          <div className="duration-500 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-105 p-8 rounded-3xl bg-gray-500 bg-opacity-20 backdrop-blur-lg drop-shadow-lg border-2 border-white  hover:border-blue-700 flex flex-col items-center">
            <Image
              src={featureDecisionTree}
              alt="Smart Suggestion Icon"
              width={50}
              height={50}
            />
            <h4 className="text-xl font-bold text-blue-600 mt-1 mb-1">
              Auto-Decision Tree Generator
            </h4>
            <p className="text-md leading-7 my-3 font-medium text-gray-700">
              Streamline the creation of detailed decision trees with an
              easy-to-use, automated visual tool
            </p>
          </div>

          <div className="duration-500 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-105 p-8 rounded-3xl bg-gray-500 bg-opacity-20 backdrop-blur-lg drop-shadow-lg border-2 border-white  hover:border-blue-700 flex flex-col items-center">
            <Image
              src={featureLanguages}
              alt="Smart Suggestion Icon"
              width={50}
              height={50}
            />
            <h4 className="text-xl font-bold text-blue-600 mt-1 mb-1">
              Multi-lingual Support
            </h4>
            <p className="text-md leading-7 my-3 font-medium text-gray-700">
              Enable instant support to a wide customer base across diverse
              language preferences
            </p>
          </div>
        </div>
      </div>

      <div className="w-2/3 mt-4 mb-10 mx-auto text-gray-700 font-semibold text-lg">
        <h2 className="font-extrabold text-3xl text-center text-blue-600 mb-2">
          FAQs
        </h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How does the decision tree-based customer support work?
            </AccordionTrigger>
            <AccordionContent>
              The decision tree-based customer support utilizes a structured
              decision system to guide agents through a series of questions and
              possible solutions, ensuring a methodical and personalized
              approach to resolving customer issues in a matter of a few
              seconds.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Can decision trees be customized to address specific types of
              customer queries?
            </AccordionTrigger>
            <AccordionContent>
              Absolutely. Our decision tree builder is highly customizable,
              allowing for the creation of branches and nodes tailored to
              address various customer queries. This flexibility ensures that
              the system adapts to the specific needs and intricacies of all
              your contact center operations.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What kind of detailed statistics are available for agents in this
              system?
            </AccordionTrigger>
            <AccordionContent>
              Agents have access to comprehensive statistics, including
              performance metrics, resolution details, state-wise customer
              satisfaction scores, and more. These insights empower agents and
              management to make data-driven decisions for continuous
              improvement.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Is the software designed to support multiple languages?
            </AccordionTrigger>
            <AccordionContent>
              Yes, the software is fully multi-lingual, currently supporting
              queriws in both Hindi and English, enabling fast communication and
              support across diverse languages and ensuring an inclusive
              customer experience.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              How secure is the contact center knowledge management system, and
              who has access to agent profiles?
            </AccordionTrigger>
            <AccordionContent>
              Security is a top priority. The system employs robust measures to
              safeguard data, and only individual agents have access to their
              profiles and preferences. This ensures a personalized and secure
              experience, with each agent having control over their own specific
              settings and information.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}
