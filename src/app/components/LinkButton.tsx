import Button from "./Button";
import Linkable, { LinkableProps } from "./Linkable";

export type LinkButtonProps = LinkableProps &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;

export default function LinkButton({
  href,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Linkable href={href}>
      <Button {...props}>{children}</Button>
    </Linkable>
  );
}
