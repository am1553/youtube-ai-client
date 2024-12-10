import SendIcon from "@mui/icons-material/Send";
import React from "react";
import ChatThread from "./components/ChatThread";
import chatReducer from "./reducers/chat";
import { ClipLoader } from "react-spinners";

function App() {
  const [thread, dispatch] = React.useReducer(chatReducer, []);
  const [isLoading, setIsLoading] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  const generateIntro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const message = formData.get("script")?.toString();
    setIsLoading(true);
    dispatch({
      type: "add",
      payload: { from: "me", message: message || "" },
    });
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/generate`, {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: {
          "CONTENT-TYPE": "application/json",
        },
      });
      const body = await res.json();
      dispatch({
        type: "add",
        payload: {
          from: "bot",
          message: body.choices[0].message.content,
        },
      });
      formRef.current.reset();
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full max-w-screen-lg mx-auto py-8 flex flex-col">
      {thread.length < 1 ? (
        <div className="flex-1 flex flex-col gap-1 justify-center items-center">
          <h1 className="text-7xl font-bold text-white opacity-20">
            BeAmazedAi
          </h1>
          <p className="text-2xl text-white opacity-15">
            Generate catchy YouTube intro from a video script.
          </p>
        </div>
      ) : (
        <ChatThread chatData={thread} />
      )}

      <footer className="sticky bottom-0 pb-10 left-0 right-0 bg-gray-800">
        {isLoading && (
          <div className="py-4 w-full flex items-center justify-center sticky bottom-96">
            <ClipLoader
              color={"#fff"}
              loading={true}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        <form ref={formRef} onSubmit={generateIntro}>
          <textarea
            name="script"
            id="script"
            className="w-full h-32 max-h-64 overflow-y-auto bg-gray-700 rounded-lg overflow-clip p-4 text-white focus:outline outline-offset-2 outline-gray-600 shadow-md"
            placeholder="Enter script to generate YouTube intro"
          ></textarea>
          <button
            className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-md absolute bottom-16 right-4"
            type="submit"
          >
            <SendIcon style={{ fontSize: "20px" }} />
          </button>
        </form>
      </footer>
    </div>
  );
}

export default App;
