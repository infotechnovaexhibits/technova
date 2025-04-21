import { Metadata } from "next";
import Terms from "./terms";

export const metadata: Metadata = {
  title: "Terms & Conditions - Technova Exhibitis",
  description: "Read our Terms & Conditions for information on how we operate.",
};

export default function TermsPage() {
  return <Terms />;
}