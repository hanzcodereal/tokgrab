const STEPS: string[] = [
  "Buka aplikasi TikTok dan pilih video yang ingin didownload",
  'Tap tombol "Share" dan pilih "Copy Link"',
  'Paste link di atas dan klik tombol "Download"',
];

export default function HowToUse() {
  return (
    <section className="how-to-use">
      <h2>Cara Menggunakan</h2>
      <ol className="steps">
        {STEPS.map((step, index) => (
          <li key={step}>
            <span className="step-number">{index + 1}</span>
            <span className="step-text">{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
