import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import matter from "gray-matter";
import type {
  Profile,
  Publication,
  Conference,
  Teaching,
  Social,
  NewsItem,
} from "./types";

const contentDir = path.join(process.cwd(), "content");

function readYaml<T>(filename: string): T {
  const filePath = path.join(contentDir, filename);
  const fileContents = fs.readFileSync(filePath, "utf8");
  return yaml.load(fileContents) as T;
}

export function getProfile(): Profile {
  return readYaml<Profile>("profile.yaml");
}

export function getPublications(): Publication[] {
  const data = readYaml<{ publications: Publication[] }>("publications.yaml");
  return data.publications;
}

export function getConferences(): Conference[] {
  const data = readYaml<{ conferences: Conference[] }>("conferences.yaml");
  return data.conferences;
}

export function getTeaching(): Teaching {
  return readYaml<Teaching>("teaching.yaml");
}

export function getSocial(): Social {
  return readYaml<Social>("social.yaml");
}

export function getNews(): NewsItem[] {
  const filePath = path.join(contentDir, "news.md");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContents);
  return (data.items as NewsItem[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
