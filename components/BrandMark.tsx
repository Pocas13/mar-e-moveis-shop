export default function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 ${inverse ? "text-white" : "text-grafite-900"}`}>
      <span className={`grid h-10 w-10 place-items-center rounded-full border-2 ${inverse ? "border-white" : "border-barro-500"}`}>
        <span className="font-display text-sm font-bold">M&M</span>
      </span>
      <span className="font-display text-xl font-bold tracking-[-0.04em] sm:text-2xl">Mar e Móveis</span>
    </span>
  );
}
