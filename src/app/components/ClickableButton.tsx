import Button from "./Button";
import Clickable, { ClickableProps } from "./Clickable";

export type ClickableButtonProps = ClickableProps &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;

// TODO: 使ってない
export default function ClickableButton({
  onClick,
  children,
  ...props
}: ClickableButtonProps) {
  return (
    <Clickable onClick={onClick}>
      <Button {...props}>{children}</Button>
    </Clickable>
  );
}
