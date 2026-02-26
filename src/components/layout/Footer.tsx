"use client";

import { useEffect, useRef } from "react";

export default function Footer() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || mapRef.current.querySelector("script")) return;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "mapmyvisitors";
    script.src =
      "https://mapmyvisitors.com/map.js?cl=080808&w=300&t=tt&d=kEigzcBA3DiAHilrCn9XjjjEKKxV27MN8jdvZiCULfk&co=ffffff&ct=808080&cmo=3acc3a&cmn=ff5353";
    mapRef.current.appendChild(script);
  }, []);

  return (
    <footer className="mt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col items-center gap-4">
        <div ref={mapRef} className="max-h-[190px] overflow-hidden rounded-lg" />
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} Clemente Ferrer
        </p>
      </div>
    </footer>
  );
}
