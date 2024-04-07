import { Outlet, useNavigate } from "react-router-dom"
import Header from "./components/Header"
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/usersApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../../components/shared/Loader";




const AdminLayout: React.FC = () => {
    const naviate = useNavigate()

    const userState = useSelector((state: IRootUserState) => state.user.userInfo)
    const { data: profileData, isError, isLoading: isProfileLoading } = useQuery({
        queryFn: () => {
            return getProfile({ token: userState.token });
        },
        queryKey: ['profile'],
        retry: false,
        onSuccess: (data) => {
            if (!data?.admin) {
                naviate("/");
                toast.error("You are not allowed to acess Admin panel")
            }
        },
        onError: (error: Error) => {
            naviate("/");
            toast.error("You are not allowed to acess Admin panel")
        }
    })

    if (isProfileLoading) {
        return (
            <Loader />
        )
    }

    return (
        <div
            className="flex flex-col h-screen lg:flex-row">

            <Header />
            <main className="bg-[#F9F9F9] min-h-full h-fit flex-1 p-4 lg:p-6">
                <Outlet />
            </main>

        </div>
    )
}

export default AdminLayout