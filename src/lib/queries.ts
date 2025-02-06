import { defineQuery } from "next-sanity";

export const META_QUERY = defineQuery(`*[_type == "meta"] {
    title,
    description
}`);

export const PROJECTS_QUERY = defineQuery(`
  *[_type == $projects] {
    title,
    projects[] {
      project-> {
        title,
        slug,
        "coverImageUrl": cover_image.asset->url,
        "src": video.asset->url,
        informations[] {
            information {
                information_name,
                information_value
            }
        },
      }
    }
  }
`);

export const RESUME_QUERY = defineQuery(`
    *[_type == "resume"] {
        title,
        informations[] {
        title_section,
        resume[] {
            title,
            subtitle
        }
        }
    }
    `);

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug] {
    title,
    "coverImageUrl": cover_image.asset->url,
    "src": video.asset->url,
    informations[] {
        information {
            information_name,
            information_value
        }
    },
   images[] {
        "url": asset->url
    }
  }
`);
