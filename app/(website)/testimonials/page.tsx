import { Metadata } from "next";
import Testimonials from "./testimonials";

export const metadata: Metadata = {
  title: "Testimonials - Technova Exhibitis",
  description: "Read what our clients have to say about our services.",
};  

export default function TestimonialsPage() {
  return <Testimonials />;
}