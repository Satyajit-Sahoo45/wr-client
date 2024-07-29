import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedProvider = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const access_token = localStorage.getItem('ACCESS_TOKEN');
        if (!access_token && access_token !== undefined) {
            console.log(access_token, "joipo-oo0lklk")
            navigate("/login")
        }
    }, [navigate])

    return (
        <div>
            {children}
        </div>
    )
}

export default ProtectedProvider;