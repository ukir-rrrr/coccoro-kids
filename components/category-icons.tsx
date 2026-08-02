import type { ComponentType, SVGProps } from "react";
import { IconBase } from "@/components/icons";

function TopsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M9 3.5 4 6.5v4l2.5-1V20h11V9.5l2.5 1v-4L15 3.5a3 3 0 0 1-6 0Z" />
    </IconBase>
  );
}

function BottomsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M6 3.5h12l.8 8-2.3 8.5-3-.5-1-9.5h-1l-1 9.5-3 .5L5.2 11.5Z" />
    </IconBase>
  );
}

function OuterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M8.5 3.5 4 6v6h2.5V20h11v-8H20V6l-4.5-2.5a3 3 0 0 1-7 0Z" />
      <path d="M9 8v8" />
    </IconBase>
  );
}

function OnePieceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M9 3.5 5 7l2 3-1.5 9.5h13L17 10l2-3-4-3.5a3 3 0 0 1-6 0Z" />
    </IconBase>
  );
}

function SetupIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M8.5 3.5 4 6.5v4l2.5-1V13h3v-2.5h5V13h3V9.5l2.5 1v-4L15 3.5a3 3 0 0 1-6 0Z" />
      <path d="M9.5 13 8 20.5h3l.8-4 .7 4h3L14 13" />
    </IconBase>
  );
}

function ShoesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M4 20v-4.5c0-1 .5-1.8 1.3-2.3L9 11l3 1.5c1.7.8 3.7 1 5.5.6l2-.4c.9-.2 1.5.6 1 1.4-1 1.6-2.8 2.6-4.7 2.6H4Z" />
      <path d="M9 11V6.5" />
    </IconBase>
  );
}

function BagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect x="4.5" y="8.5" width="15" height="12" rx="2" />
      <path d="M8.5 8.5V7a3.5 3.5 0 0 1 7 0v1.5" />
    </IconBase>
  );
}

function PajamaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M9 3.5 4 6.5v4l2.5-1V20h11V9.5l2.5 1v-4L15 3.5a3 3 0 0 1-6 0Z" />
      <path d="M10 13.5h1.6M13 15.5h1.6" />
      <circle cx="10.3" cy="16.5" r="0.5" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

function BabyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="6" r="2.5" />
      <path d="M7 20v-4.5c0-3 2-5.5 5-5.5s5 2.5 5 5.5V20" />
      <path d="M9 20v-3M15 20v-3" />
    </IconBase>
  );
}

function RainIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M4.5 11a4 4 0 0 1 1.6-7.7A5.5 5.5 0 0 1 16.8 5 4.2 4.2 0 0 1 16 13H5.5Z" />
      <path d="M8 15.5 6.5 19M12 15.5 10.5 19M16 15.5 14.5 19" />
    </IconBase>
  );
}

function JinbeiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M9 3.5 4 6.5l1.5 4L8 9.5V20h8V9.5l2.5 1 1.5-4-5-3a3 3 0 0 1-6 0Z" />
      <path d="M9.5 9.5 12 12l2.5-2.5" />
    </IconBase>
  );
}

function SwimIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M3 15.5c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0" />
      <path d="M3 19.5c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0" />
      <circle cx="15" cy="7" r="3" />
      <path d="M9 13l3.5-4" />
    </IconBase>
  );
}

function HatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M4 15.5c0-4 3.6-7 8-7s8 3 8 7Z" />
      <path d="M3 15.5h18" />
      <circle cx="12" cy="7" r="1.2" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

function HomeGoodsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6.5 10v9.5h11V10" />
      <path d="M10 19.5V14h4v5.5" />
    </IconBase>
  );
}

function GiftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect x="4" y="9.5" width="16" height="4" rx="1" />
      <rect x="5.5" y="13.5" width="13" height="7" rx="1" />
      <path d="M12 9.5v11" />
      <path d="M12 9.5c-1.5 0-3-1-3-2.8S10 4 12 6.2C14 4 15 4.9 15 6.7s-1.5 2.8-3 2.8Z" />
    </IconBase>
  );
}

export const categoryIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "/category/tops": TopsIcon,
  "/category/bottoms": BottomsIcon,
  "/category/outer": OuterIcon,
  "/category/onepiece": OnePieceIcon,
  "/category/setup": SetupIcon,
  "/category/shoes": ShoesIcon,
  "/category/bags": BagIcon,
  "/category/innerwear": PajamaIcon,
  "/category/baby": BabyIcon,
  "/category/rain": RainIcon,
  "/category/jinbei": JinbeiIcon,
  "/category/swim": SwimIcon,
  "/category/accessories": HatIcon,
  "/category/goods": HomeGoodsIcon,
  "/category/gift": GiftIcon,
};
