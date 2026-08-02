import type { SVGProps } from "react";

// DESIGN.txt「1. アイコン」: アウトライン・ストローク幅1.5相当。
// サイズは親要素の text-lg / text-xl で制御できるよう width/height を 1em にしている。
export function IconBase(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M3.5 6h17M3.5 12h17M3.5 18h17" />
    </IconBase>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M5 5l14 14M19 5L5 19" />
    </IconBase>
  );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20.5 20.5l-4-4" />
    </IconBase>
  );
}

export function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M12 20s-7.5-4.6-10-9.3C.5 7 2 3.5 5.6 3c2-.3 3.9.7 5 2.3a1 1 0 0 0 1.8 0c1.1-1.6 3-2.6 5-2.3 3.6.5 5.1 4 3.6 7.7-2.5 4.7-10 9.3-10 9.3z" />
    </IconBase>
  );
}

export function CartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M3 4h2l1.4 12.6a1.5 1.5 0 0 0 1.5 1.4h9.4a1.5 1.5 0 0 0 1.5-1.3L20 8H6" />
      <circle cx="9.5" cy="20" r="1.3" />
      <circle cx="17" cy="20" r="1.3" />
    </IconBase>
  );
}

export function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M4.5 20c1.2-3.8 4.3-6 7.5-6s6.3 2.2 7.5 6" />
    </IconBase>
  );
}

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M5.5 8.5l6.5 6.5 6.5-6.5" />
    </IconBase>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function XSocialIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M4.5 4.5l15 15M19.5 4.5l-15 15" />
    </IconBase>
  );
}

export function LineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M12 3.5c-4.7 0-8.5 3-8.5 6.8 0 3.4 3 6.2 7 6.7.3 0 .6.2.5.6l-.2 1.5c0 .4.3.6.6.4l2.3-1.5c.2-.2.5-.2.8-.2 4.4-.6 7.5-3.4 7.5-6.7-.1-3.9-3.9-6.8-8.6-6.8z" />
    </IconBase>
  );
}
