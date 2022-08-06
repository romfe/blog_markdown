import fs from "fs";
import path from "path";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import Pagination from "@/components/Pagination";
import { getPosts } from "@/lib/posts";
import { POSTS_PER_PAGE } from "@/config/index";

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
  numPages: number;
  currentPage: number;
}

const BlogPage = ({ posts, numPages, currentPage }: BlogPageProps) => {
  return (
    <Layout>
      <h1 className="text-5xl border-b4 p-5 font-bold">Blog</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
      <Pagination currentPage={currentPage} numPages={numPages} />
    </Layout>
  );
};
export default BlogPage;

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("src/posts"));
  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

  let paths = [];

  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }
  return {
    paths,
    fallback: false,
  };
};

interface PageIndexParams {
  page_index: string;
}

export const getStaticProps = async ({
  params,
}: {
  params: PageIndexParams;
}) => {
  const page = parseInt((params && params.page_index) || "1");
  const files = fs.readdirSync(path.join("src/posts"));

  const posts = getPosts();

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;

  const orderedPosts = posts.slice(
    pageIndex * POSTS_PER_PAGE,
    (pageIndex + 1) * POSTS_PER_PAGE
  );

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
    },
  };
};
