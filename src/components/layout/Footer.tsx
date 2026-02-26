export default function Footer() {
  return (
    <footer className="mt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col items-center gap-4">
        <a
          href="https://clustrmaps.com/site/1c1z9"
          target="_blank"
          rel="noopener noreferrer"
          title="Visit tracker"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="//www.clustrmaps.com/map_v2.png?d=XFsEJa6BOCMNrKMy2deDn5y72fcOfVQ_MbePwOFntLY&cl=ffffff"
            alt="Visitors map"
            className="rounded-lg"
          />
        </a>
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} Clemente Ferrer
        </p>
      </div>
    </footer>
  );
}
