export const GetAuthCookie = () => {
  const cookies = document.cookie.split(";").reduce((acc, cookie) => {
    const [name, value] = cookie.split("=");
    acc[name.trim()] = value;
    return acc;
  }, {} as { [key: string]: string });

  return cookies["access-token"] || "";
};
