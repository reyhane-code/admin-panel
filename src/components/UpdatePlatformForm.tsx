import PlatformFrom from "./PlatformForm";
import usePlatform from "../hooks/usePlatform";


interface IProps {
    id: string;
    onSubmit: (id: string, data: any) => void
}
const UpdatePlatformForm = ({ id, onSubmit }: IProps) => {

    const { data, isLoading, error } = usePlatform(id)
    const handleSubmit = async (updateData: any) => {
        onSubmit(id, updateData)
    }
    if (isLoading) {
        return <div className="container mx-auto mt-5">Loading...</div>;
    }

    if (error) {
        return (
            <div className="container mx-auto mt-5 text-red-500">
                Error loading article
            </div>
        );
    }
    return <div>
        <PlatformFrom onSubmit={handleSubmit} initialName={data?.name} />
    </div>


}



export default UpdatePlatformForm