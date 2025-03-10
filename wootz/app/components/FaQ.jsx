import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export default function AccordionDemo() {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Wootz?</AccordionTrigger>
          <AccordionContent>
                Wootz 2025 is a National level Technical Symposium conducted by the Department of Metallurgy Engineering, PSG College of Technology. It encompasses 3 events, a workshop and a paper presentation.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>What is the fee to participate in Wootz?</AccordionTrigger>
          <AccordionContent>
          The general registration fee is Rs. 100 for PSG Tech students and Rs. 150 for students from other colleges. No separate registration fee is required to participate in each event , workshop and paper presentations.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Will registration fee be refunded?</AccordionTrigger>
          <AccordionContent>
          No , we follow a non refund policy at any cost *
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  