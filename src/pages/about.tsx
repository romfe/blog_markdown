import Layout from "@/components/Layout";

const AboutPage = () => {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 pb-5 font-bold">Sobre o autor</h1>
      <div className="bg-white shadow-md rounded-lg px-10 py-6 mt-6">
        <h3 className="text-2xl mb-5">Blog do Rômulo</h3>
        <p className="mb-3">
          Aqui documento minha jornada como desenvolvedor. O blog foi escrito
          usando Next.js com TypeScript e Markdown
        </p>
        <p>
          <span className="font-bold">Versão 1.0.0</span>
        </p>
      </div>
    </Layout>
  );
};

export default AboutPage;
