"use client";

import Script from "next/script";

export default function Footer() {
  return (
    <footer className="mt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col items-center gap-4">
        <div id="mapmyvisitors-container">
          <Script
            id="mapmyvisitors"
            src="https://mapmyvisitors.com/map.js?cl=080808&w=a&t=tt&d=kEigzcBA3DiAHilrCn9XjjjEKKxV27MN8jdvZiCULfk&co=ffffff&ct=808080&cmo=3acc3a&cmn=ff5353"
            strategy="lazyOnload"
          />
        </div>
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} Clemente Ferrer
        </p>
      </div>
    </footer>
  );
}
