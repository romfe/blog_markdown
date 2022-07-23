import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Link from "next/link";
import { marked } from "marked";
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
  return (
    <Layout title={title}>
      <Link href="/blog">Voltar</Link>
      <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-5xl mb-7">{title}</h1>
          <CategoryLabel>{category}</CategoryLabel>
        </div>
        <img
          src={cover_image}
          alt="imagem principal"
          className="w-full rounded"
        />
        <div className="flex justify-between items-center bg-gray-100 p-2 my-8">
          <div className="flex items-center">
            <img
              src={author_image}
              alt="foto do autor"
              className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
            />
            <h4>{author}</h4>
          </div>
          <div className="mr-4">{date}</div>
        </div>

        <div className="blog-text mt-2">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </Layout>
  );
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
