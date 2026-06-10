export default function PageHero({ label, title, description }) {
  return (
    <section className="relative bg-gradient-to-br from-navy-50 via-white to-navy-50 border-b border-gray-200 overflow-hidden">
      {/* Subtle decorative blurs — keeps it from feeling flat */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-page relative py-16 md:py-20">
        <p className="section-label fade-up">{label}</p>
        <h1 className="text-ink fade-up fade-up-1 max-w-4xl">{title}</h1>
        {description && (
          <p className="text-body mt-4 max-w-2xl text-lg fade-up fade-up-2">{description}</p>
        )}
      </div>
    </section>
  )
}