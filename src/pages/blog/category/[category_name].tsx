import matter from "gray-matter";
import fs from "fs";
import path from "path";
import Link from "next/link";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { getPosts } from "@/lib/posts";

interface CategoryBlogPageProps {
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
  categoryName: string;
}

const CategoryBlogPage = ({ posts, categoryName }: CategoryBlogPageProps) => {
  return (
    <Layout>
      <h1 className="text-5xl border-b4 p-5 font-bold">{`Posts em "${categoryName}"`}</h1>
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

export default CategoryBlogPage;

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("src/posts"));

  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("src/posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);
    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map((category) => ({
    params: { category_name: category },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

interface CategoryPageParams {
  category_name: string;
}

export const getStaticProps = async ({
  params: { category_name },
}: {
  params: CategoryPageParams;
}) => {
  const posts = getPosts();

  //Filter posts by category
  console.log(category_name);
  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );

  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name,
    },
  };
};
