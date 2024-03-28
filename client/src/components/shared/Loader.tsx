import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loader: React.FC = () => {
    return (
        <div className="h-screen w-full bg-dark-2 flex justify-center items-center flex-col gap-5">
            <h3 className="text-2xl text-slate-700 ">Loading...</h3>
            <AiOutlineLoading3Quarters color="grey " size={48} className="animate-spin" />
        </div>
    );
}

export default Loader