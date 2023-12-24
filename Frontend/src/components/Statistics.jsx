import Image from "next/image";
import BarChart from "./Charts/BarChart";
import BarChart2 from "./Charts/BarChart2";
import DoughnutChart from "./Charts/DoughnutChart";
import DoughnutChart2 from "./Charts/DoughnutChart2";
import statisticsImage from "../assets/Images/Statistics_Image.png";

import clientsData from "@/data/ClientsData.json";
import agentsData from "@/data/AgentsData.json"

import { useUser } from '@clerk/nextjs';

function Statistics(){
    const { isLoaded, isSignedIn, user } = useUser();
 
  if (!isLoaded || !isSignedIn) {
    return null;
  }

    const statusCount = new Map();
    const statesResolutions = new Map();

    clientsData.forEach(element => {
        const status = element.Status;
        const state = element.State;
        const dummyResolutions = {"Unsuccessful Resolution":0,"Successful Resolution":0,"Partial Resolution":0,"Unable to Resolve":0};
        
        if(statusCount.has(status)){
            statusCount.set(status,statusCount.get(status)+1)
        }else{
            statusCount.set(status,1)
        }

        if(statesResolutions.has(state)){
            let resolutions = statesResolutions.get(state);
            resolutions[status] += 1;
            statesResolutions.set(state,resolutions)
        }
        else{
            statesResolutions.set(state,dummyResolutions)
        }
    });

    const questionsCount = new Map();
    const satisfaction = new Map();

    agentsData.forEach(element =>{
        const question = element.Question;
        const agentSat = element.Agent_Satisfaction;
        
        if(questionsCount.has(question)){
            questionsCount.set(question,questionsCount.get(question)+1)
        }
        else{
            questionsCount.set(question,1);
        }

        if(satisfaction.has(agentSat)){
            satisfaction.set(agentSat,satisfaction.get(agentSat)+1)
        }
        else{
            satisfaction.set(agentSat,1);
        }
    })

    const sortedEntries = [...questionsCount.entries()].sort((a, b) => b[1] - a[1]);
    const sortedMap = new Map(sortedEntries);
    const top5Entries = new Map(sortedEntries.slice(0, 5));

    return(
        <div>
            <p className="text-4xl text-blue-500 font-bold text-center mb-4">Statistics</p>
            {user.firstName==="Admin" && <div className="flex flex-row justify-evenly items-center -mt-12 mb-12">
                <div>
                    <DoughnutChart2 statusCount={satisfaction}/>
                </div>
                <div>
                    <BarChart2 statesResolutions={top5Entries}/>
                </div>
            </div>}
            {user.firstName!=="Admin" && <div className="flex flex-row justify-evenly items-center -mt-12 mb-12">
                <div>
                    <DoughnutChart statusCount={statusCount}/>
                </div>
                <div>
                    <BarChart statesResolutions={statesResolutions}/>
                </div>
            </div>}
            <div className="flex flex-row justify-evenly mb-12 space-x-20 mr-10">
                <Image
                    src={statisticsImage}
                    alt="Statistics Image"
                    width={400}
                    height={400}
                />
                <p>
                Statistics plays a pivotal role in Contact Center Management by providing invaluable insights into the performance and efficiency of various operational aspects. Statistical analysis allows contact center managers to gauge the overall effectiveness 
                of their team in handling customer interactions. Metrics such as average handling time, first call resolution, <br/>and customer satisfaction scores provide a quantitative measure of the team's efficiency and effectiveness. <span className="text-blue-500 font-semibold">These statistics enable managers to identify areas of improvement, optimize processes, and implement targeted training programs to enhance the overall quality of customer service.</span>

                <br/>
                <br/>

                Statistics aid in workforce management by helping contact center managers forecast call volumes and schedule staffing accordingly. Accurate prediction of peak hours and seasonal variations in call traffic allows for better allocation of resources, ensuring that an optimal number of agents are available to handle incoming inquiries. This not only enhances operational efficiency but also contributes to cost savings by preventing overstaffing during slow periods and minimizing customer wait times during peak hours.

                <br/>
                <br/>

                Statistics are instrumental in assessing the success of marketing and promotional campaigns.<span className="text-blue-500 font-semibold"> By tracking customer interactions and correlating them with specific campaigns, contact centers can measure the impact of marketing efforts on call volumes and customer inquiries.</span> This data-driven approach allows for informed decision-making, enabling organizations to allocate marketing budgets more effectively and refine their strategies based on real-time feedback. In summary, the integration of statistical analysis in contact center management is essential for optimizing performance, enhancing customer satisfaction, and making strategic decisions that positively impact the overall efficiency of the contact center.
                </p>
            </div>
            
        </div>
    )
}

export default Statistics;