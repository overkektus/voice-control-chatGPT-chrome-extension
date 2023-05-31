import Button from "./Button";
import Menu from "./Menu";

export default function App() {
  return (
    <div className="content-view flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
      <Button />
      <Menu />
    </div>
  );
}
