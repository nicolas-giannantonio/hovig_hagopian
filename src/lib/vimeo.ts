// eslint-disable-next-line @typescript-eslint/no-require-imports
const Vimeo = require("vimeo").Vimeo;
const client_id = process.env.VIMEO_CLIENT_ID;
const client_secret = process.env.VIMEO_CLIENT_SECRET;
const access_token = process.env.VIMEO_ACCESS_TOKEN;

const client = new Vimeo(client_id, client_secret, access_token);

function getVideoLink(videoId: string): Promise<{
  play: {
    progressive: [
      {
        link: string;
      },
    ];
  };
}> {
  return new Promise((resolve, reject) => {
    client.request(
      {
        method: "GET",
        path: `/videos/${videoId}?fields=play`,
      },
      function (
        error: Error,
        body: {
          play: {
            progressive: [
              {
                link: string;
              },
            ];
          };
        },
      ) {
        if (error) {
          return reject(error);
        }

        resolve(body);
      },
    );
  });
}

export { getVideoLink };
