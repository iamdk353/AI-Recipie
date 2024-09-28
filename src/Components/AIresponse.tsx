import { Send } from "lucide-react";
import Chat from "./Chat";
import { useState } from "react";
import BotIcon from "./BotIcon";

interface query {
  search: string;
  people: number;
  isVeg: boolean;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const AIresponse = ({ search, people, isVeg, setSearch }: query) => {
  const [chat, setChat] = useState<string[]>();
  console.log(chat?.length);
  return (
    <div data-theme="dark">
      <div className="flex h-[80vh] p-5 ">
        <div className=" w-full overflow-y-scroll">
          {chat?.length === undefined && (
            <div className="w-full  h-full flex justify-center items-center flex-col">
              <BotIcon size="size-32" />
              <p>ASK ANY DISH ...</p>
            </div>
          )}
          {chat?.map((i, id) => {
            if (i !== "") {
              return <Chat Req={i} key={id} />;
            }
          })}
        </div>
      </div>
      <form
        className=" flex w-[100%] "
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex justify-center px-2 mx-auto w-full">
          <label className="input input-bordered flex items-center w-full ">
            <BotIcon size="size-8" />
            <input
              type="text"
              className="grow w-full"
              placeholder="Prompt"
              value={
                search
                  ? `Generate a ${
                      isVeg ? "VEG" : "NON VEG"
                    } Recipe using ${search.split(" ")} for ${
                      people == 1 ? `${people} person` : `${people} persons`
                    } `
                  : ""
              }
            />
          </label>
          <button
            className={search ? ` btn btn-outline ` : "btn btn-disabled  "}
            onClick={() => {
              setChat((prev) => {
                return prev
                  ? [
                      ...prev,
                      `Generate a ${
                        isVeg ? "VEG" : "NON VEG"
                      } Recipe using ${search.split(" ")} for ${
                        people == 1 ? `${people} person` : `${people} persons`
                      }`,
                    ]
                  : [
                      `Generate a ${
                        isVeg ? "VEG" : "NON VEG"
                      } Recipe using ${search.split(" ")} for ${
                        people == 1 ? `${people} person` : `${people} persons`
                      }`,
                    ];
              });
              setSearch("");
            }}
          >
            <Send size={24} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIresponse;
