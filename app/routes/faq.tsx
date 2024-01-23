import { LoaderFunctionArgs } from "@remix-run/node";
import Menu from "~/components/map/header/menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { getUser } from "~/session.server";

// generate object that stores eacht question and answer pair
const faq = [
  {
    question: "How do I find information about playgrounds?",
    answer:
      "You can use the search bar on the explore page to find information about playgrounds in Münster.",
  },
  {
    question: "Can I contribute by adding new playgrounds?",
    answer:
      "No, you can not contribute new playgrounds, but you can contact us and give us information about new playgrounds.",
  },
  {
    question: "Is there a mobile app available?",
    answer:
      "Currently, there is no mobile app available, but you can access the website on your mobile browser.",
  },
  {
    question: "Are all playgrounds in Münster listed on this website",
    answer: "Yes, every playground of Münster is in our database.",
  },
  {
    question: "How often is the information about the playgrounds updated?",
    answer: "Everytime there is new building in progress.",
  },
  {
    question: "What is the best course at the Ifgi?",
    answer: "Of course it is GI in society",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);

  return {
    user: user,
  };
}

export default function FAQPage() {
  return (
    <>
      <div className="font-sans bg-gray-100 h-full">
        <div className="fixed top-2 right-2 z-50 ">
          <Menu />
        </div>
        <div className="flex justify-center items-center h-full">
          {/* // iterate over the faq object and render each question and answer */}
          <Accordion
            type="single"
            collapsible
            className="max-w-2xl w-full m-5 p-5 bg-white shadow-md rounded-lg"
          >
            {faq.map((item, i) => (
              <AccordionItem key={i} value={i.toString()}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}
