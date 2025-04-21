import { Metadata } from "next";
import About from "./about";

export const metadata: Metadata = {
  title: "About Us - Technova Exhibitis",
  description: "Learn more about Technova, a leading exhibition stand design company.",
};

export default function AboutPage() {
  return <About />;
}