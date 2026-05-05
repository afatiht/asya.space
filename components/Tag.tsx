export default function Tag({
  children,
  color,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span className="tag" style={color ? ({ '--tag-bg': color } as React.CSSProperties) : undefined}>
      {children}
    </span>
  );
}
