import { HomePage } from "@/components/HomePage";
import { JsonLd } from "@/components/JsonLd";
import { FAQS } from "@/lib/content";
import { faqSchema } from "@/lib/schema";

export default function Page() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <HomePage />
    </>
  );
}
