import React, { useEffect } from "react";
import Player from "@/components/Player";
import useRefreshToken from "@/hooks/useRefreshToken";
import { authorize } from "@/API/authorize";
import { useRouter } from "next/router";

export default function HomeComponent() {
  const router = useRouter();
  const code = router.query.code;
  useRefreshToken(code as string);

  return (
    <div>
      {code ? (
        <Player />
      ) : (
        <button className="btn btn-accent btn-lg" onClick={authorize}>
          Login With Spotify
        </button>
      )}
    </div>
  );
}
