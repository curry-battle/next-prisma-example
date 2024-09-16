export default function Label({
  text,
  htmlFor,
}: {
  text: string;
  htmlFor: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-gray-700 text-sm font-bold mb-2"
    >
      {text}
    </label>
  );
}
