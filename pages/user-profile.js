function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export default UserProfilePage;

// This code executes on the server to get props from the server and the content is not statically pregenerated for this componenet.
export async function getServerSideProps(context) {
  // This is the node js code that we are dealing with on the server
  const { params, req, res } = context;
  return {
    props: {
      username: "Max",
    },
  };
}
