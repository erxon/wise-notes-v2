import { useTheme } from "./theme-provider";

export default function LogoLarge() {
  const { theme } = useTheme();
  return (
    <>
      {theme === "light" ? (
        <img
          src="/wise-notes-logo.png"
          alt="Wise Notes Logo"
          className="h-[175px] w-[400px] object-cover"
        />
      ) : (
        <img
          src="/wise-notes-dark.png"
          alt="Wise Notes Logo"
          className="h-[175px] w-[400px] object-cover rounded-lg"
        />
      )}
    </>
  );
}
