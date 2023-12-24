"use client";
import 'regenerator-runtime/runtime'
import { LuLayoutDashboard } from "react-icons/lu";
import { FaChartBar } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLiveHelp } from "react-icons/md";
import { IoCalendarSharp } from "react-icons/io5";
import { LuListTodo } from "react-icons/lu";
import { PiFlowArrowBold } from "react-icons/pi";
import { IoMdCloudUpload } from "react-icons/io";

import { useState } from "react";

import Sidebar, { SidebarItem } from "@/components/Sidebar";

import Calendar from "@/components/Calendar/Calendar";
import Todo from "@/components/Todo";
import Statistics from "@/components/Statistics";
import HelpDesk from "@/components/HelpDesk";
import Settings from "@/components/Settings";
import Suggestions from "@/components/Suggestions";
import Flowchart from "@/components/Flowchart/Flowchart";
import Upload from "@/app/upload/page.jsx";

import { useUser } from "@clerk/nextjs";

function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("Statistics");

  const { isLoaded, isSignedIn, user } = useUser();
 
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const handleChange = (text) => {
    setSelectedTab(text);
  };

  return (
    <div className="flex flex-row space-x-4">
      <div className="flex justify-start">
        <Sidebar onHandleChange={handleChange}>
           {user.firstName!=="Admin" && <SidebarItem icon={<LuLayoutDashboard size={20} />} text="Dashboard"/>}
          <SidebarItem icon={<FaChartBar size={20} />} text="Statistics" />
          <SidebarItem icon={<IoCalendarSharp size={20} />} text="Calendar" />
          <SidebarItem icon={<LuListTodo size={20} />} text="Todo" />
           {user.firstName!=="Admin" && <SidebarItem icon={<PiFlowArrowBold size={20} />} text="Flowchart" />}
           {user.firstName==="Admin" && <SidebarItem icon={<IoMdCloudUpload size={20} />} text="Upload" />}

          <hr className="my-3" />
          <SidebarItem icon={<IoSettingsOutline size={20} />} text="Settings" />
          {user.firstName!=="Admin" && <SidebarItem icon={<MdOutlineLiveHelp size={20} />} text="Help" />}
        </Sidebar>
      </div>

      {
      selectedTab === "Calendar" ||
      selectedTab === "Todo" ? (
        <div className="w-full flex items-center justify-center rounded-3xl bg-gradient-to-r from-blue-200 to-cyan-200">
          {(selectedTab === "Calendar" && <Calendar />) ||
            (selectedTab === "Todo" && <Todo />)}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          {
            (selectedTab === "Statistics" && <Statistics />) ||
            (selectedTab === "Help" && user.firstName!=="Admin" && <HelpDesk />) ||
            (selectedTab === "Settings" && <Settings />) ||
            (selectedTab === "Dashboard" && user.firstName!=="Admin" && <Suggestions />) ||
            (selectedTab === "Flowchart" && user.firstName!=="Admin" && <Flowchart/>) || 
            (selectedTab === "Upload" && user.firstName==="Admin" && <Upload/>)} 
        </div>
      )}
    </div>
  );
}

export default Dashboard;
