export default function Footer() {
  return (
    <footer className="mt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex justify-center">
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} Clemente Ferrer
        </p>
      </div>
    </footer>
  );
}
