import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

// NOTE: We would usually just use React to render the page with useEffect here to render the page, then come back and use the useEffect to grab and render the data from the server. But for SEO, this is terrible. The crawlers like google will not be able to pick up on that data and the info could not be searched for. So, we are going to use dymnatic parameters to fix this.

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

// Grabbing the data asyncronously for getStaticPaths
async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  // Here we dont have to use router to get the params out of the url, context provides us with this. AND, we need to use the params on the context since router will onyl allow us to grab the value from the url on the fontend. We need it on the backend though so we can try serve the page statically first.
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  // This here is the key to returning the 404 if the user goes to a bad url. Then, we trigger the not found and send the 404 page back
  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// getStaticPaths allows us to predefine some paths for Next.js to use when rendering a page with a dynamic parameter from the url. Next.js needs some kind of default values here. So, we feed it each of the avalible parameters that it could have.
export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  // This kind of returning sytax returns a new object for every id.
  // Not exactly sure what is going on here....
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,

    // Need to review this code again.... Max was not clear at all around 104...

    // Seems that when fallback is set to true, it returns the page instantly.
    fallback: false,
  };
}

export default ProductDetailPage;
