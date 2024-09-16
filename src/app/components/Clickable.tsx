export type ClickableProps = {
  onClick: () => void;
  children: React.ReactNode;
  //   disabled?: boolean;
};

export default function Clickable({ onClick, children }: ClickableProps) {
  return <div onClick={onClick}>{children}</div>;
}
