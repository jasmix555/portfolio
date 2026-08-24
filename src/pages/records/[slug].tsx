import type { GetStaticPaths, GetStaticProps } from "next";
import { records } from "@/data/records";
import Portfolio from "../index";

/**
 * A record's own URL. It renders the index with the modal open — the page is
 * the archive, the record is a state of it, and a shared link lands on both.
 */
export const getStaticPaths: GetStaticPaths = () => ({
  paths: records.map((r) => ({ params: { slug: r.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default Portfolio;
