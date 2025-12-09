// components/layout/Footer.tsx
export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-slate-500 text-center">
        © {new Date().getFullYear()} MyStore. All Rights Reserved.
      </div>
    </footer>
  );
}
