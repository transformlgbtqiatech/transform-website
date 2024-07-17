import {
  AlarmClockCheck,
  BookA,
  BookOpenText,
  Briefcase,
  FolderArchive,
  Gem,
  Mail,
  Wrench,
  type LucideProps,
} from "lucide-react";

import type { ForwardRefExoticComponent, RefAttributes } from "react";

export const headerNavLinks = [
  {
    label: "The/Tool",
    href: "/transform",
    Icon: <IconContainer Icon={Wrench} />,
  },
  {
    label: "Trigger/Toolkit",
    href: "/trigger-toolkit",
    Icon: <IconContainer Icon={Briefcase} />,
  },
  {
    label: "Resources",
    children: [
      {
        label: "Glossary",
        href: "/glossary",
        Icon: <IconContainer Icon={BookA} />,
      },
      {
        label: "Affirmative Action",
        href: "/affirmative-action",
        Icon: <IconContainer Icon={AlarmClockCheck} />,
      },
      {
        label: "Regional Archives",
        href: "/regional-archives",
        Icon: <IconContainer Icon={FolderArchive} />,
      },
      {
        label: "Teach with Transform",
        href: "/teach-with-transform",
        Icon: <IconContainer Icon={BookOpenText} />,
      },
    ],
  },
  {
    label: "Side/Quests",
    href: "/side-quests",
    Icon: <IconContainer Icon={Gem} />,
  },
  {
    label: "Contact/Submit",
    href: "/contact-submit",
    Icon: <IconContainer Icon={Mail} />,
  },
] satisfies Array<NavItem>;

function IconContainer(props: {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}) {
  return (
    <span>
      <props.Icon size={16} className="dark:text-zinc-400" />
    </span>
  );
}

type NavItem = NavLinkItem | NavLinksItem;

type NavLinksItem = {
  label: string;
  children?: Array<NavLinkItem>;
};

type NavLinkItem = {
  label: string;
  href: string;
  Icon?: JSX.Element;
};
