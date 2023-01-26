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

export async function getStaticProps(context) {
  // Here we dont have to use router to get the params out of the url, context provides us with this. AND, we need to use the params on the context since router will onyl allow us to grab the value from the url on the fontend. We need it on the backend though so we can try serve the page statically first.
  const { params } = context;

  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = sata.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export default ProductDetailPage;
