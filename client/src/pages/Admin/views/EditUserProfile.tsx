import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../../../services/usersApi';
import { useParams } from 'react-router-dom';
import UserProfileForm from '../forms/UserProfileForm';
import { FaUserEdit } from "react-icons/fa";
import toast from 'react-hot-toast';

const EditUserProfile = () => {

    const { id } = useParams()

    const userState = useSelector((state: IRootUserState) => state.user.userInfo)

    const queryClient = useQueryClient();

    const { data: userProfileData, isError, isProfileDataLoading } = useQuery({
        queryFn: () => {
            return getUserProfile({ token: userState.token, userId: id });
        },
        queryKey: ['user', id]
    })


    const { mutate: mutateUpdateUserProfile, isLoading: isUpdating } = useMutation({
        mutationFn: ({ formData, token }) => {
            return updateUserProfile({ formData, token })
        },
        onSuccess: (data) => {

            queryClient.invalidateQueries(["user", id]);
            toast.success("Profile updated sucessfully")

        },
        onError: (error) => {

        }
    })


    const handleSave = ({ formData, token }) => {
        mutateUpdateUserProfile({ formData, token })
    }

    return (
        <section className="container   mx-auto max-w-5xl flex flex-col px-5 py-5 md:max-w-3xl   lg:gap-x-5 lg:max-w-5xl xl:max-w-4xl  ">
            <h1 className="text-2xl font-semibold mb-10 flex">
                <FaUserEdit className="w-8 h-auto mr-2" />
                Edit User
            </h1>
            {userProfileData && <UserProfileForm
                userProfileData={userProfileData}
                isProfileDataLoading={isProfileDataLoading}
                isAdmin={true}
                handleSave={handleSave}
            />}
        </section>
    )
}

export default EditUserProfile