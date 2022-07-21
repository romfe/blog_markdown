import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Link from "next/link";
import marked from "marked";
import Layout from "../../components/Layout";
import CategoryLabel from "../../components/CategoryLabel";

interface PostsPageProps {
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    cover_image: string;
    category: string;
    author: string;
    author_image: string;
  };
  content: string;
  slug: string;
}

const PostPage = ({
  frontmatter: { title, category, date, cover_image, author, author_image },
  content,
  slug,
}: PostsPageProps) => {
  console.log(content);
  return <div>{title}</div>;
};
export default PostPage;
export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("src/posts"));
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

interface ParamsType {
  params: { slug: string };
}

export async function getStaticProps({ params: { slug } }: ParamsType) {
  const markdownWithMeta = fs.readFileSync(
    path.join("src/posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);
  return {
    props: { frontmatter, content, slug },
  };
}
