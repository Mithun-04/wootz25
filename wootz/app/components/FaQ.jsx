import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import "../styles/AccordionStyles.css"; // Importing the separate CSS file
  
  export default function AccordionDemo() {
    return (
      <div className="faq-container scale-100" id = "faq">
        <h2 className="faq-title text-5xl">
          Frequently Asked <span>Questions</span>
        </h2>
        <Accordion type="single" collapsible className="faq-accordion w-[160%] max-w-[1600px]">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-2xl py-6">What is Wootz?</AccordionTrigger>
            <AccordionContent className="text-xl p-6">
              Wootz 2025 is a National level Technical Symposium conducted by the
              Department of Metallurgy Engineering, PSG College of Technology. It
              encompasses 3 events, a workshop, and a paper presentation.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-2xl py-6">
                Who can participate in Wootz?
            </AccordionTrigger>
            <AccordionContent className="text-xl p-6">
            The contest is open for all Undergraduate and Postgraduate students from AICTE approved Technical Higher Educational Institutions of India.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-2xl py-6">
              What is the fee to participate in Wootz?
            </AccordionTrigger>
            <AccordionContent className="text-xl p-6">
              The general registration fee is Rs. 100 for PSG Tech students and Rs.
              150 for students from other colleges. No separate registration fee is
              required to participate in each event, workshop, and paper
              presentations.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-2xl py-6">Will the registration fee be refunded?</AccordionTrigger>
            <AccordionContent className="text-xl p-6">
              No, we follow a non-refund policy at any cost.*
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }