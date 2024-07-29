import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedProvider = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const access_token = localStorage.getItem('ACCESS_TOKEN');
        if (!access_token && access_token !== undefined) {
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