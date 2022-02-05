import {SearchIcon, ChevronDownIcon, ChatIcon, UserIcon, BellIcon, LoginIcon, PlusIcon} from '@heroicons/react/outline';
import {Link} from "react-router-dom";
import Logo from './website-logo.jpg';

function Header() {
    // const [userDropdownVisbility, setUserDropdownVisbility] = useState('hidden')

    // function toggleUserDropdown(){
    //   if (userDropdownVisbility === "hidden") {
    //     setUserDropdownVisbility('block');
    //   } else {
    //     setUserDropdownVisbility('hidden');
    //   }
    // }

    // const authModal = useContext(AuthModalContext);

    // const account = useContext(AccountContext);

    // const shortAccountAdr = account.publicKey.substring(0,6) + "..." + account.publicKey.substring(37, 41);
    
    const account = null;

    return (
      <header className="w-full flex justify-between p-5 mx-auto shadow-2xl">
        <div className="mx-4 flex relative">
          <Link to="/">
            <img className="w-44 h-8 object-contain cursor-pointer" src={Logo} />
          </Link>

          <form action="" className="px-3 flex rounded-md border border-gray-700 mx-4 flex-grow">
            <SearchIcon className="text-gray-300 h-6 w-6 mt-1" />
            <input type="text" className="text-sm p-1 pl-2 pr-0 block focus:outline-none" placeholder="Searching tldr" />
          </form>
        </div>
      </header>
    );
}

export default Header;