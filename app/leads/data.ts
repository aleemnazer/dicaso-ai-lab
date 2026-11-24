export type Lead = {
  name: string;
  role: string;
  bio: string;
};

// Placeholder people. Replace with real team details later.
export const leads: Lead[] = [
  {
    name: "Alex Placeholder",
    role: "CEO & Founder",
    bio: "Sets the vision for Dicaso Lab and works closely with clients from the first call to launch.",
  },
  {
    name: "Jordan Sample",
    role: "Head of Engineering",
    bio: "Leads our engineering teams and keeps our code reliable, tested and easy to maintain.",
  },
  {
    name: "Taylor Example",
    role: "Head of Product",
    bio: "Turns client goals into clear plans and makes sure every feature solves a real problem.",
  },
  {
    name: "Morgan Demo",
    role: "QA Lead",
    bio: "Owns quality across every release, testing each change on desktop and mobile before it ships.",
  },
];
