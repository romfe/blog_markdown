import type { NextPage } from "next";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import Layout from "../components/Layout";

interface HomePageProps {
  posts: {
    title: string;
    date: string;
    excerpt: string;
    cover_image: string;
    category: string;
    author: string;
    author_image: string;
  }[];
}

const HomePage = ({ posts }: HomePageProps) => {
  console.log(posts);
  return (
    <Layout>
      <h1>Últimos Posts</h1>
    </Layout>
  );
};

export default HomePage;
export async function getStaticProps() {
  const files = fs.readdirSync(path.join("src/posts"));
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("src/posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);
    return { slug, frontmatter };
  });
  return {
    props: { posts },
  };
}
