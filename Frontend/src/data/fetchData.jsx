async function getData() {
  const res = await fetch(
    "https://657b1189394ca9e4af13928b.mockapi.io/customers"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function Customers() {
  const customers = await getData();
  return customers
}

const customerLists = Customers();
export default customerLists;
