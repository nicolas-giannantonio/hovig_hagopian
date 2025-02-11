// eslint-disable-next-line @typescript-eslint/no-require-imports
const Vimeo = require("vimeo").Vimeo;
const client_id = process.env.VIMEO_CLIENT_ID;
const client_secret = process.env.VIMEO_CLIENT_SECRET;
const access_token = process.env.VIMEO_ACCESS_TOKEN;

const client = new Vimeo(client_id, client_secret, access_token);

function getVideoLink(
  videoId: string,
  token: string,
): Promise<{
  play: {
    hls: {
      link: string;
    };
    progressive: {
      link: string;
    }[];
  };
}> {
  return new Promise((resolve, reject) => {
    client.request(
      {
        method: "GET",
        headers: {
          Accept: "application/vnd.vimeo.*+json;version=3.4",
        },
        path: `/videos/${videoId}?fields=play&token=${token}`,
      },
      function (
        error: Error,
        body: {
          play: {
            hls: {
              link: string;
            };
            progressive: [
              {
                link: string;
              },
            ];
          };
        },
      ) {
        if (error) {
          console.log(videoId, token);
          return reject(error);
        }

        resolve(body);
      },
    );
  });
}

const extractVimeoIdAndToken = (
  url: string,
): {
  videoId: string;
  token: string;
} => {
  if (!url) {
    return {
      videoId: "",
      token: "",
    };
  }

  const match = url.match(/vimeo\.com\/(\d+)(?:\/([a-zA-Z0-9]+))?/);
  if (match) {
    const videoId = match[1] || "";
    const token = match[2] || "";
    return { videoId, token };
  }

  return {
    videoId: "",
    token: "",
  };
};

export { getVideoLink, extractVimeoIdAndToken };
