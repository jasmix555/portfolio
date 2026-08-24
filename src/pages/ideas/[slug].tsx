import type { GetStaticPaths, GetStaticProps } from "next";
import { ideas } from "@/data/records";
import Portfolio from "../index";

/** The CONCEPT kind — the same panel, filed under 02 IDEAS. */
export const getStaticPaths: GetStaticPaths = () => ({
  paths: ideas.map((r) => ({ params: { slug: r.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default Portfolio;
