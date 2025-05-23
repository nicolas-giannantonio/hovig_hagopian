import { defineQuery } from "next-sanity";

export const META_QUERY = defineQuery(`*[_type == "meta"] {
    title,
    description,
    meta_image {
        asset-> {
            url
        }
    }
}`);

export const PROJECTS_QUERY = defineQuery(`
  *[_type == $projects] {
    title,
    projects[] {
      project-> {
        title,
        slug,
        hover_video,
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

export const ALL_PROJECT_QUERY = defineQuery(`
  *[_type == "project"] {
    title,
    "coverImageUrl": cover_image.asset->url,
    slug
  }
`);
export const TITLE_QUERY = defineQuery(`
    *[_type == "clip" || _type == "pub" || _type == "fiction"] {
        title
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
    vimeoSrc,
    video_zoom,
    video_informations[] {
        title,
        description
    },
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

export const CONTACT_QUERY = defineQuery(`
    *[_type == "contact"] {
        description,
        contact_representation[] {
            representation {
                representation_name,
                representation_email,
                representation_tel
            }
        },
        contact_hovig {
            contact_hovig_email,
            contact_hovig_tel
        },
        social_media[] {
            social_media_name,
            social_media_link
        }
    }
`);
