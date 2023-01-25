import fs from 'fs/promises';
import path from 'path';


function HomePage(props) {

  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

// For Next.js apps, this code below is ran first, then the code above is ran to generate the JSX
export async function getStaticProps() {

  // This is saying we want the path to start at the main directory, then dive into the data folder, then grab the dummy-backend json file
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  // Then we read this file on the file path to that dummy-backend data. 
  const jsonData = await fs.readFile(filePath);
  // Then we parse that JSON data so we can use it. 
  const data = JSON.parse(jsonData);


  return {
    props: {
      products: data.products
    },
    // This is where we introduce ISR for regenerating the page every X number of seconds
    revalidate: 60
  };
}

export default HomePage;
