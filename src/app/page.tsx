import { Form } from "./Components/Form";
import { Header } from "./Components/Header";
import { Safe } from "./Components/Safe";

export default function Home() {
  return (
    <div className="bg-[#262626]">
      <Header />
      <Form />
      <Safe />
    </div>
  );
}
