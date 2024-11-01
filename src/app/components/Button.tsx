export type ButtonProps = {
  children: React.ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({ children, ...props }: ButtonProps) {
  return (
    // https://buttons.ibelick.com/
    <button
      {...props}
      className="relative h-12 overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 text-neutral-950 before:absolute before:bottom-0 before:left-0 before:block before:h-full before:w-full before:-translate-x-full before:bg-neutral-100 before:transition-transform hover:before:translate-x-0"
    >
      <span className="relative">{children}</span>
    </button>
  );
}
