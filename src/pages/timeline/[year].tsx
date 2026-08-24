import type { GetStaticPaths, GetStaticProps } from "next";
import { phases } from "@/data/profile";
import Portfolio from "../index";

/** The YEAR kind — a timeline row, opened. */
export const getStaticPaths: GetStaticPaths = () => ({
  paths: phases.map((p) => ({ params: { year: p.id } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default Portfolio;
