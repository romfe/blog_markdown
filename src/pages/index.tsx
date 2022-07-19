import type { NextPage } from "next";
import fs from "fs";
import path from "path";
import Layout from "../components/Layout";

const HomePage: NextPage = () => {
  return (
    <Layout>
      <h1>Hello WAAAARUDOOOOOOOO!</h1>
    </Layout>
  );
};

export default HomePage;
export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));
  console.log(files);
  return {
    props: {},
  };
}
