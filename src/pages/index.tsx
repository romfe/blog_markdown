import Link from "next/link";
import { getPosts } from "@/lib/posts";
import Layout from "@/components/Layout";
import Post from "@/components/Post";

interface HomePageProps {
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
  return {
    props: {
      posts: getPosts().slice(0, 6),
    },
  };
}
