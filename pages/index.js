import fs from "fs/promises";
import path from "path";

import Link from "next/link";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

// For Next.js apps, this code below is ran first, then the code above is ran to generate the JSX
export async function getStaticProps(context) {
  // This is saying we want the path to start at the main directory, then dive into the data folder, then grab the dummy-backend json file
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  // Then we read this file on the file path to that dummy-backend data.
  const jsonData = await fs.readFile(filePath);
  // Then we parse that JSON data so we can use it.
  const data = JSON.parse(jsonData);

  // Setting a redirection path if there is no data to be found.
  if (!data) {
    return {
      redirect: {
        desitination: "/no-data",
      },
    };
  }

  // Setting a path for the 404 if there are no products
  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    // This is where we introduce ISR for regenerating the page every X number of seconds
    revalidate: 60,
  };
}

export default HomePage;
