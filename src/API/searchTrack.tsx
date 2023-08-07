const BASEURL = `https://api.spotify.com/v1`;

export const getTracks = async (searchQuery: string) => {
  const token = sessionStorage.getItem("access_token");
  try {
    let response = await fetch(
      `${BASEURL}/search?q=${searchQuery}&type=track&limit=10`,
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
