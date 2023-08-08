const BASEURL = `https://api.spotify.com/v1`;

export const getTracks = async (searchQuery: string) => {
  const token = sessionStorage.getItem("access_token");
  try {
    let response = await fetch(
      `${BASEURL}/search?q=${searchQuery}&type=track,album,playlist&limit=4`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const browseCategories = async () => {
  const token = sessionStorage.getItem("access_token");

  try {
    let response = await fetch(`${BASEURL}/browse/categories?country=IN`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};
