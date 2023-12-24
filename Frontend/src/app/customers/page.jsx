import { columns } from "./columns";
import { DataTable } from "./data-table";
import clientsData from "@/data/ClientsData.json"

async function getData() {
  const res = await fetch(
    "https://657b1189394ca9e4af13928b.mockapi.io/customers"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const customerLists = await res.json();
  return customerLists;
}

export default function DemoPage() {
  // const data = await getData();
  const data = clientsData
  console.log(data)
  return (
    <div className="container mx-auto py-10">
      <p className="text-3xl text-blue-600 font-bold text-center">Customers Information</p>
      <DataTable columns={columns} data={data} />
    </div>
  );
}