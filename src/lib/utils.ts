export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatMonthYear(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export function highlightAuthor(
  authors: string[],
  targetName: string = "Ferrer, C."
): string {
  return authors
    .map((author) =>
      author.includes("Ferrer")
        ? `<strong class="text-primary font-semibold">${author}</strong>`
        : author
    )
    .join(", ");
}

export function generateBibTeX(pub: {
  title: string;
  authors: string[];
  journal?: string;
  volume?: string;
  pages?: string;
  year: number;
  doi?: string;
}): string {
  const key = pub.authors[0].split(",")[0].toLowerCase() + pub.year;
  const authors = pub.authors.join(" and ");
  let bib = `@article{${key},\n`;
  bib += `  title = {${pub.title}},\n`;
  bib += `  author = {${authors}},\n`;
  if (pub.journal) bib += `  journal = {${pub.journal}},\n`;
  if (pub.volume) bib += `  volume = {${pub.volume}},\n`;
  if (pub.pages) bib += `  pages = {${pub.pages}},\n`;
  bib += `  year = {${pub.year}}`;
  if (pub.doi) bib += `,\n  doi = {${pub.doi}}`;
  bib += `\n}`;
  return bib;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "published":
      return "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-white";
    case "accepted":
      return "bg-teal-600 text-white dark:bg-teal-500 dark:text-white";
    case "submitted":
      return "bg-amber-500 text-white dark:bg-amber-500 dark:text-white";
    case "in-preparation":
      return "bg-blue-500 text-white dark:bg-blue-500 dark:text-white";
    case "speaker":
      return "bg-purple-600 text-white dark:bg-purple-500 dark:text-white";
    case "co-author":
      return "bg-slate-500 text-white dark:bg-slate-500 dark:text-white";
    default:
      return "bg-gray-500 text-white dark:bg-gray-500 dark:text-white";
  }
}

const countryFlags: Record<string, string> = {
  Chile: "\u{1F1E8}\u{1F1F1}",
  Germany: "\u{1F1E9}\u{1F1EA}",
  UK: "\u{1F1EC}\u{1F1E7}",
  Brazil: "\u{1F1E7}\u{1F1F7}",
  France: "\u{1F1EB}\u{1F1F7}",
  Ireland: "\u{1F1EE}\u{1F1EA}",
  "Saudi Arabia": "\u{1F1F8}\u{1F1E6}",
};

export function getFlag(location: string): string {
  const country = location.split(",").pop()?.trim() || "";
  return countryFlags[country] || "";
}

export function getTagColor(tag: string): string {
  switch (tag) {
    case "conference":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
    case "award":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
    case "publication":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
    case "research":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    case "education":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
  }
}
