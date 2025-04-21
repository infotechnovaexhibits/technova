import { Metadata } from "next";
import Services from "./services";

export const metadata: Metadata = {
  title: "Services - Technova Exhibitis",
  description: "Explore our range of exhibition stand design and build services.",
};

export default function ServicesPage() {
  return <Services />;
}