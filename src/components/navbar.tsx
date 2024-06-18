import { ModeToggle } from "@/components/mode-toggle";


const Navbar = () => {
    return (  
        <div className=" flex flew-row justify-between w-full p-8 sticky">
        <h1 className="text-2xl dark:text-white text-black">Logo</h1>
        <div className="flex flex-row justify-center gap-5 ">
        <ul className="flex space-x-8 p-2">
        
            <li>
                <a href="#" className="dark:text-white text-black dark:hover:text-gray-300 dhover:text-gray-800">Services</a>
            </li>
            <li>
                <a href="#" className="dark:text-white text-black  dark:hover:text-gray-300 hover:text-gray-800">Documentation</a>
            </li>
        </ul>
        <ModeToggle />
        </div>

    </div>
    );
}
 
export default Navbar;