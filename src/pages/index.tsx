import matter from "gray-matter";
import fs from "fs";
import path from "path";
import Link from "next/link";
import Layout from "../components/Layout";
import Post from "../components/Post";
interface PostInterface {
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
}

interface HomePageProps {
  posts: PostInterface[];
}

const HomePage = ({ posts }: HomePageProps) => {
  return (
    <Layout>
      <h1 className="text-5xl border-b4 p-5 font-bold">Últimos Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
      <Link href="/blog">
        <a className="block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full">
          Todos os posts
        </a>
      </Link>
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
