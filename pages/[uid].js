function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export default UserIdPage;

export async function getStaticProps(context) {
  const { params } = context;

  const userId = params.id;

  return {
    props: {
      id: "userid-" + userId,
    },
  };
}
