import Head from "next/head";
import Header from "./Header";

interface LayoutProps {
  title: string;
  keywords: string;
  description: string;
  children: React.ReactNode;
}

const Layout = ({ title, keywords, description, children }: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container mx-auto my-7 font-jetbrains">{children}</main>
    </div>
  );
};

Layout.defaultProps = {
  title: "Blog do Rômulo",
  keywords:
    "tecnologia, react, next, javascript, typescript, kotlin, java, springboot, dev, desenvolvedor, blog, programação, desenvolvimento, programador",
  description: "Documentando minha jornada como desenvolvedor",
};

export default Layout;
