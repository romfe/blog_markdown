import matter from "gray-matter";
import fs from "fs";
import path from "path";
import Link from "next/link";
import Layout from "../../../components/Layout";
import Post from "../../../components/Post";
import { POSTS_PER_PAGE } from "../../../config";

interface BlogPageProps {
  posts: {
    frontmatter: {
      title: string;
      date: string;
      excerpt: string;
      cover_image: string;
      category: string;
      author: string;
      author_image: string;
    };
    slug: string;
  }[];
}

const BlogPage = ({ posts }: BlogPageProps) => {
  return (
    <Layout>
      <h1 className="text-5xl border-b4 p-5 font-bold">Blog</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </Layout>
  );
};

export default BlogPage;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("src/posts"));
  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

  let paths = [];

  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

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
    props: {
      posts: posts.sort((a, b) => {
        return (
          new Date(b.frontmatter.date).getTime() -
          new Date(a.frontmatter.date).getTime()
        );
      }),
    },
  };
}
