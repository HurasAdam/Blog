import { useForm } from "react-hook-form";
import { COLORS } from "../../../constants/colors";
import { useSelector } from "react-redux";


interface ITag {
    _id: string;
    name: string;
    color: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

interface ITagForm {
    handleSave: () => void;
    isUpdateTagLoading: boolean;
    tag: ITag;
    type: string;

}

interface IOnSubmitProps {
    name: string;
    color: string;
}

const TagForm: React.FC<ITagForm> = ({ handleSave, tag, isUpdateTagLoading, type }) => {


    const userState = useSelector((state) => state?.user?.userInfo);
    const formMethods = useForm<IOnSubmitProps>({
        defaultValues: {
            name: tag ? tag?.name : "",
            color: tag ? tag?.color : "",

        },
        mode: "onChange",
    });



    const {
        handleSubmit,
        register,
        formState: { errors },
    } = formMethods;

    const onSubmit = handleSubmit((data) => {

        const { name, color } = data;
        const requestData = {
            name: name,
            color: color
        };

        if (tag) {
            requestData.id = tag._id;
        }

        handleSave({ formData: requestData, token: userState?.token })

    });



    return (
        <form
            onSubmit={onSubmit}
            className=" mx-auto w-full flex flex-col gap-y-8 "
        >
            <div className="">
                <label
                    htmlFor="name"
                    className="text-sm font-semibold text-gray-700 block mb-1.5"
                >
                    Name
                </label>
                <input
                    {...register("name", { required: "tag name is required" })}
                    type="text"
                    className="border rounded w-full py-3  lg:py-1.5 px-2 xl:py-1 font-normal"
                    id="name"
                    placeholder="here enter tag name"
                />
                {errors?.name && (
                    <span className="text-xs text-red-500  font-semibold">
                        {errors.name?.message}
                    </span>
                )}
            </div>

            <div>
                <span className="text-sm block font-semibold text-gray-700">
                    Color
                </span>
                <div className=" grid-row-5 gap-3 md:grid-cols-3 md:gap-3 lg:grid">
                    {COLORS.map((color, index) => {
                        return (
                            <label
                                key={index}
                                className={`${color} text-sm flex gap-1 text-gray-700 cursor-pointer rounded p-4 mt-3 truncate md:mt-2`}
                            >
                                <input
                                    type="radio"
                                    value={color}
                                    id={index}
                                    {...register("color", {
                                        validate: (categories) => {
                                            if (categories && categories.length > 0) return true;
                                            else return "tag color is required";
                                        },
                                    })}
                                />
                                <span className="text-slate-200 font-bold"># { }</span>
                            </label>
                        );
                    })}
                </div>
                {errors?.categories && (
                    <span className="text-xs text-red-500 px-1 font-semibold">
                        {errors.categories?.message}
                    </span>
                )}
            </div>

            <button
                type="submit"
                className="w-fit bg-green-500 text-white font-semibold rounded-lg px-2 py-1 mt-5"
            >
                {isUpdateTagLoading ? "saving" : (type === "create" ? "Create" : "Update")}
            </button>
        </form>)
}

export default TagForm;