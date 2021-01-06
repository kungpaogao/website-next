import Link from "next/link";
import Layout from "../components/Layout";
import { getGithubPreviewProps, parseJson } from "next-tinacms-github";
import { GetStaticProps } from "next";
import { usePlugin } from "tinacms";
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from "react-tinacms-github";

export default function Home({ file }: any) {
  const formOptions = {
    label: "Home Page",
    fields: [{ name: "title", component: "text" }],
  };

  // Registers a JSON Tina Form
  const [data, form] = useGithubJsonForm(file, formOptions);
  usePlugin(form);
  useGithubToolbarPlugins();

  return (
    <Layout title="Home | Next.js TypeScript Example">
      <h1>{data.title}</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div>
          <div className="text-xl font-medium text-black">ChitChat</div>
          <p className="text-gray-500">You have a new message!</p>
        </div>
      </div>
    </Layout>
  );
}

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: "content/home.json",
      parse: parseJson,
    });
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: "content/home.json",
        data: (await import("../content/home.json")).default,
      },
    },
  };
};
