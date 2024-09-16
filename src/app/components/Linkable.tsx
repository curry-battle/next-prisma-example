import Link from "next/link";

export type LinkableProps = {
  href: string;
  //   disabled?: boolean;
} & React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export default function Linkable({ href, ...props }: LinkableProps) {
  return (
    <Link href={href} {...props}>
      {props.children}
    </Link>
  );
}
