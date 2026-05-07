interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="pt-16 pb-8 md:pt-24 md:pb-12 text-center">
      <h1
        className="text-3xl md:text-4xl text-primary mb-3"
        style={{ fontWeight: 300, letterSpacing: "0.15em" }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto" style={{ fontWeight: 300 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
