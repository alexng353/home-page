interface LinkProps {
  href: string;
  name: string;
}

export default function Links({ href, name }: LinkProps) {
  return (
    <div className="text-white hover:no-underline underline flex justify-center">
      <a href={href}>{name}</a>
    </div>
  );
}
