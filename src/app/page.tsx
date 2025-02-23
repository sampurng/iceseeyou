// "use client";
// import { Form } from "./Components/Form";
// import { Header } from "./Components/Header";
// import { Safe } from "./Components/Safe";
// import { useState } from "react";
// import dynamic from "next/dynamic";

// // Dynamically import the Chatbot to avoid SSR issues
// const Chatbot = dynamic(() => import("../app/api/chat/Chatbot"), {
//   ssr: false,
// });

// export default function Home() {
//   const [menuType, setMenuType] = useState("");
//   return (
//     <div className="bg-[#262626]">
//       <Header setMenuType={setMenuType} />
//       {
//         switch (menuType) {
//           case "chat":
//             return <Chatbot/>
//             break;

//           default:
//             return <div></div>
//             break;
//         }
//       }
//       <Form />
//       <Safe />
//       <Chatbot />
//     </div>
//   );

// }

"use client";
import { Form } from "./Components/Form";
import { Header, josefinSans } from "./Components/Header";
import { Safe } from "./Components/Safe";
import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Chatbot to avoid SSR issues
const Chatbot = dynamic(() => import("../app/api/chat/Chatbot"), {
  ssr: false,
});

export default function Home() {
  const [menuType, setMenuType] = useState("");

  const renderMenu = () => {
    switch (menuType) {
      case "chat":
        return <Chatbot />;
      case "report":
        return <Form />;
      case "safe":
        return <Safe />;
      case "map":
        return (
          <div
            className={`${josefinSans.className} text-[70px] flex justify-center items-center w-full h-screen`}
          >
            Coming Soon...
          </div>
        );
      case "home":
        return (
          <div
            className={`${josefinSans.className} text-[70px] flex justify-center items-center w-full h-screen p-32 flex-nowrap justify-between flex-col`}
          >
            <div className="text-[100px]">Welcome to ICESeeYou</div> <br /> The
            first platform to actively crowdsource
            <br />
            And track Immigration Control and Enforcement activities throughout
            Massachussetts.
          </div>
        );

      default:
        return (
          <div
            className={`${josefinSans.className} text-[70px] flex justify-center items-center w-full h-screen p-32 flex-nowrap justify-between flex-col`}
          >
            <div className="text-[100px]">Welcome to ICESeeYou</div> <br />
            The first platform to actively crowdsource
            <br />
            And track Immigration Control and Enforcement activities throughout
            <br />
            Massachussetts.
          </div>
        );
    }
  };

  return (
    <div className="bg-[#262626]">
      <Header setMenuType={setMenuType} />
      {renderMenu()}
    </div>
  );
}
