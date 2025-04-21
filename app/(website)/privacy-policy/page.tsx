import { Metadata } from "next";
import PrivacyPolicy from "./privacy";

export const metadata: Metadata = {
  title: "Privacy Policy - Technova Exhibitis",
  description: "Read our Privacy Policy for information on how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
