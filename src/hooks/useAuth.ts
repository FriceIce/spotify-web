import qs from "qs";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { fetchToken } from "../modules/fetchToken";

const useAuth = () => {
  const [_, setCookies] = useCookies(["access_token", "refresh_token"]);
  const origin = window.location.origin;

  useEffect(() => {
    const param = new URL(window.location.href).searchParams;
    const code = param.get("code")?.trim();

    // When the user sign in with Spotify for the first time this will run
    if (code) {
      fetchToken(
        qs.stringify({
          code: code,
          grant_type: "authorization_code",
          redirect_uri: `${origin}/spotify-web/callback`,
        }),
        setCookies
      ).then(() => (window.location.href = `${origin}/spotify-web/`));
    }

    return () => {};
  }, []);
};

export default useAuth;
