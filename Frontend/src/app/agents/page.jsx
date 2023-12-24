import { columns } from "./columns";
import { DataTable } from "./data-table";
import agentsData from "@/data/AgentsData.json"

export default function DemoPage() {

  const data = agentsData;
  console.log(data);
  return (
    <div className="container mx-auto py-10">
      <p className="text-3xl text-blue-600 font-bold text-center">Submitted Tickets</p>
      <DataTable columns={columns} data={data} />
    </div>
  );
}