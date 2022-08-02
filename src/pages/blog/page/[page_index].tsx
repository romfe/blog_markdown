import matter from "gray-matter";
import fs from "fs";
import path from "path";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import Pagination from "@/components/Pagination";
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

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("src/posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);
    return { slug, frontmatter };
  });

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;
  const orderedPosts = posts.sort((a, b) => {
    return (
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
    );
  });

  return {
    props: {
      posts: orderedPosts.slice(
        pageIndex * POSTS_PER_PAGE,
        (pageIndex + 1) * POSTS_PER_PAGE
      ),
      numPages,
      currentPage: page,
    },
  };
};
