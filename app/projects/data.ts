export type Project = {
  name: string;
  category: string;
  description: string;
  tech: string[];
};

export const projects: Project[] = [
  {
    name: "Fleet Logistics Tracker",
    category: "Logistics",
    description:
      "Real-time shipment tracking for a regional freight company. Dispatchers see every truck on one map and customers get live delivery updates.",
    tech: ["Next.js", "Node.js", "PostgreSQL"],
  },
  {
    name: "Online Fashion Store",
    category: "E-commerce",
    description:
      "A fast storefront with product search, cart and secure checkout. Built to handle seasonal sale traffic without slowing down.",
    tech: ["Next.js", "Stripe", "Tailwind CSS"],
  },
  {
    name: "Smart Invoice Reader",
    category: "AI Automation",
    description:
      "Extracts line items, totals and vendor details from scanned invoices. Cuts manual data entry for the finance team by hours each week.",
    tech: ["Python", "OCR", "OpenAI API", "FastAPI"],
  },
  {
    name: "Fund Performance Dashboard",
    category: "Finance",
    description:
      "Interactive charts showing portfolio returns, allocations and risk over time. Investors can filter by fund and export reports.",
    tech: ["React", "D3.js", "PostgreSQL"],
  },
  {
    name: "Quotation Builder",
    category: "Sales Tools",
    description:
      "Lets sales staff assemble branded price quotes in minutes. Quotes are saved, versioned and sent as PDF straight to the client.",
    tech: ["Next.js", "Prisma", "PDF generation"],
  },
  {
    name: "Corporate Website",
    category: "Web Design",
    description:
      "A modern, accessible marketing site for a manufacturing company. Content editors can update pages without help from developers.",
    tech: ["Next.js", "Headless CMS"],
  },
];
