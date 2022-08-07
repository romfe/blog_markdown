import fs from "fs";
import path from "path";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import CategoryList from "@/components/CategoryList";
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
  categories: string[];
}

const BlogPage = ({
  posts,
  numPages,
  currentPage,
  categories,
}: BlogPageProps) => {
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b4 p-5 font-bold">Blog</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
          <Pagination currentPage={currentPage} numPages={numPages} />
        </div>
        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
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

  const categories = posts.map((post) => post.frontmatter.category);
  const uniqueCategories = Array.from(new Set(categories));

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
      categories: uniqueCategories,
    },
  };
};
