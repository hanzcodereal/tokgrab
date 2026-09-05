interface Feature {
  icon: string;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: "fa-bolt",
    title: "Cepat & Mudah",
    description: "Download video TikTok dalam hitungan detik tanpa ribet",
  },
  {
    icon: "fa-water",
    title: "Tanpa Watermark",
    description: "Dapatkan video berkualitas HD tanpa logo TikTok",
  },
  {
    icon: "fa-gift",
    title: "Gratis Selamanya",
    description: "Tidak perlu registrasi atau biaya apapun",
  },
];

export default function Features() {
  return (
    <section className="features">
      {FEATURES.map((feature) => (
        <div className="feature-item" key={feature.title}>
          <div className="feature-icon">
            <i className={`fas ${feature.icon}`} />
          </div>
          <div className="feature-content">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
