import { Metadata } from "next";
import Gallery from "./gallery";

export const metadata: Metadata = {
  title: "Gallery - Technova Exhibitis",
  description: "Explore our gallery of exhibition stands and projects.",
};

export default function GalleryPage() {
  return <Gallery />;
}