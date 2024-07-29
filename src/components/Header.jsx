import { LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

export const Header = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('user');
        navigate("/login")
    }
    return (
        <header className="bg-gray-800 text-white p-6 flex justify-between items-center">
            <Link to={"/"} className="text-2xl">Wellness Retreats</Link>
            <div className="cursor-pointer group transition-all">
                <Link className="relative hover:text-blue-400" to="/booked-retreats">
                    Your Booked Retreats
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-blue-400 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
            </div>

            {
                localStorage.getItem("ACCESS_TOKEN") && (
                    <div className='flex gap-2'>
                        <div className='p-2 bg-slate-700 rounded-lg cursor-pointer flex justify-center items-center' onClick={handleLogout}>
                            <LogOut size={20} className='text-white' />
                        </div>
                    </div>

                )
            }
        </header>
    )
}