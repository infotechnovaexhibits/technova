import { Metadata } from "next";
import Contact from "./contact";

export const metadata: Metadata = {
  title: "Contact Us - Technova Exhibitis",
  description: "Get in touch with Technova, a leading exhibition stand design company.",
};

export default function ContactPage() {
  return <Contact />;
}