import PlatformFrom from "./PlatformForm";
import usePlatform from "../hooks/usePlatform";
import Platform from "../entities/Platform";


interface IProps {
    platform: Platform;
    onSubmit: (data: any) => void
}
const UpdatePlatformForm = ({ platform, onSubmit }: IProps) => {

    const { data, isLoading, error } = usePlatform(platform.id)
    const handleSubmit = async (updateData: any) => {
        onSubmit(updateData)
    }
    if (isLoading) {
        return <div className="container mx-auto mt-5">Loading...</div>;
    }

    if (error) {
        return (
            <div className="container mx-auto mt-5 text-red-500">
                Error loading platform
            </div>
        );
    }
    return <div>
        <PlatformFrom onSubmit={handleSubmit} initialName={data?.name} />
    </div>


}



export default UpdatePlatformForm