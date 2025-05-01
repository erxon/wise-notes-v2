import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";
import User from "./components/user";

function App() {
  return (
    <>
      <ThemeProvider>
        <ModeToggle />
        <User />
        <Button variant={"secondary"}>Test</Button>
      </ThemeProvider>
    </>
  );
}

export default App;
