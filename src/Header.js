import {
  SearchIcon,
  ChevronDownIcon,
  ChatIcon,
  UserIcon,
  BellIcon,
  LoginIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import Logo from "./website-logo.jpg";
import { useState, useContext } from "react";
import ClickOutHandler from "react-clickout-handler";
import { useHistory } from "react-router-dom";
import AccountContext from "./AccountContext";
import AuthModalContext from "./AuthModalContext";
import Avatar from "./avatar.png";

function Header() {
  const [userDropdownVisbility, setUserDropdownVisbility] = useState("hidden");

  let history = useHistory();

  function toggleUserDropdown() {
    if (userDropdownVisbility === "hidden") {
      setUserDropdownVisbility("block");
    } else {
      setUserDropdownVisbility("hidden");
    }
  }

  function redirectToWallet() {
    history.push("/attendee/wallet");
  }

  function createEventForm() {
    history.push('/artist/create/event')
  }

  const authModal = useContext(AuthModalContext);

  const account = useContext(AccountContext);

  const shortAccountAdr =
    account.publicKey.substring(0, 6) +
    "..." +
    account.publicKey.substring(37, 41);

  return (
    <header className="w-full flex justify-between p-5 mx-auto shadow-2xl mb-20">
      <div className="mx-4 flex relative">
        <Link to="/">
          <img className="w-44 h-8 object-contain cursor-pointer" src={Logo} />
        </Link>

        <form
          action=""
          className="px-3 flex rounded-md border border-gray-700 mx-4 flex-grow"
        >
          <SearchIcon className="text-gray-300 h-6 w-6 mt-1" />
          <input
            type="text"
            className="text-sm p-1 pl-2 pr-0 block focus:outline-none"
            placeholder="Searching tldr"
          />
        </form>

        {!account.publicKey && (
          <div className="mx-2 hidden sm:block">
            <button
              onClick={() => authModal.setShow(true)}
              className="mr-1 h-8 border border-blue-700 rounded-full px-3 text-sm font-bold text-blue-700 hover:bg-blue-700 hover:text-white"
            >
              Log In
            </button>
          </div>
        )}

        {account.publicKey && (
          <>
            <div className="mx-2 hidden sm:block">
              <button
                onClick={() => redirectToWallet()}
                className="mr-1 h-8 border border-blue-700 rounded-full px-3 text-sm font-bold text-blue-700 hover:bg-blue-700 hover:text-white"
              >
                My Wallet
              </button>
            </div>
          </>
        )}

        {account.publicKey && (
          <>
            <div className="mx-2 hidden sm:block">
              <button
                onClick={() => createEventForm()}
                className="mr-1 h-8 border border-blue-700 rounded-full px-3 text-sm font-bold text-blue-700 hover:bg-blue-700 hover:text-white"
              >
                Create Event
              </button>
            </div>
          </>
        )}

        <ClickOutHandler onClickOut={() => setUserDropdownVisbility("hidden")}>
          <button
            className="rounded-md flex ml-4 border border-blue-700"
            onClick={() => toggleUserDropdown()}
          >
            {!account.publicKey && (
              <UserIcon className="w-6 h-6 text-white text-gray-400 m-1" />
            )}
            {account.publicKey && (
              <div className="w-8 h-8 bg-gray-600 rounded-md">
                <img
                  src={Avatar}
                  alt=""
                  style={{ filter: "invert(100%)" }}
                  className="block"
                />
              </div>
            )}

            <ChevronDownIcon className="text-gray-500 w-5 h-5 mt-2 ml-1" />
          </button>
          <div
            className={
              "absolute right-0 top-8 border border-blue-700 z-10 rounded-md overflow-hidden text-crypdit_text " +
              userDropdownVisbility
            }
          >
            {account.publicKey && (
              <span className="block w-50 py-2 px-3 text-sm">
                Hello, {shortAccountAdr}!
              </span>
            )}

            {!account.publicKey && (
              <button
                onClick={() => authModal.setShow(true)}
                className="block flex w-50 py-2 px-3 text-blue-700 hover:bg-blue-700 hover:text-white text-sm"
              >
                <LoginIcon className="w-5 h-5 mr-2" />
                Log In / Sign Up
              </button>
            )}
          </div>
        </ClickOutHandler>
      </div>
    </header>
  );
}

export default Header;
