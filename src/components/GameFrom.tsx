import { useState } from "react";
import AppForm from "./common/AppForm";
import { ObjectSchema } from "yup";
import * as yup from "yup";
import EditableInput from "./common/EditableInput";
import Button from "./common/Button";
import { ImageFormat } from "../enums";
import Image from "./common/Image";
import FileInput from "./common/FileInput";
import TextArea from "./common/TextArea";
import usePlatforms from "../hooks/usePlatforms";
import useGenres from "../hooks/useGenres";
import usePublishers from "../hooks/usePublishers";
import { IoClose } from "react-icons/io5";
interface IProps {
    onSubmit: (data: any) => void;
    initialName?: string;
    initialDescription?: string;
    initialImage?: string;
    initialMetacritic?: number;
    initialRatingTop?: number;
    updating: boolean
}

export const GameForm = ({ onSubmit, initialName, initialDescription, initialImage, initialMetacritic, initialRatingTop, updating }: IProps) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);
    const [selectedPlatformIds, setSelectedPlatformIds] = useState<number[]>([]);
    const [selectedPublisherIds, setSelectedPublisherIds] = useState<number[]>([])
    const [image, setImage] = useState<File | null>(null); // State to hold the selected image

    const { data: platforms } = usePlatforms()
    const { data: genres } = useGenres()
    const { data: publishers } = usePublishers()


    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>, setter: React.Dispatch<React.SetStateAction<number[]>>) => {
        const valueArray = Array.from(event.target.selectedOptions, option => Number(option.value));
        setter(valueArray);
    };

    const validationSchema: ObjectSchema<any> = yup.object().shape({
        name: yup.string().required("Name is required"),
        description: yup.string()
            .min(30)
            .max(1000),
        metacritic: yup.number(),
        rating_top: yup.number()
    });

    const handleSubmit = async (data: any) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('rating_top', data.rating_top);
        formData.append('metacritic', data.metacritic);
    
        // Append selected genre IDs as individual entries
        selectedGenreIds.forEach(id => formData.append('genreIds[]', id.toString())); 
    
        // Append selected platform IDs as individual entries
        selectedPlatformIds.forEach(id => formData.append('platformIds[]', id.toString())); 
    
        // Append selected publisher IDs as individual entries
        selectedPublisherIds.forEach(id => formData.append('publisherIds[]', id.toString()));
    
        if (image) {
            formData.append('image', image); // Append the file if it exists
        }
    
        // Call the onSubmit function with the FormData
        return onSubmit(formData); // Make sure to pass formData instead of data
    };
    

    const onError = (e: any) => {
        console.log('on error infoForm', e)
    }
    return <div className="grid grid-cols-2 gap-2 w-[40vw] max-h-[50vh] py-4 px-6">
        <AppForm
            onSubmit={handleSubmit}
            onError={onError}
            doFinally={() => setIsUpdating(false)}
            validationSchema={validationSchema}
            initialValues={{
                name: initialName ?? '',
                description: initialDescription ?? '',
                rating_top: initialRatingTop ?? '',
                metacritic: initialMetacritic ?? ''
            }}
        >
            <EditableInput name="name" label="Name" />
            <TextArea name="description" label="Description" placeholder="type description here..." />
            <EditableInput type="number" name="rating_top" label="Rating Top" />
            <EditableInput type="number" name="metacritic" label="Metacritic" />

            {!updating && (
                <>
                    <label className="text-lg mx-1">Image:</label>
                    <FileInput
                        name="image"
                        onChange={(files) => {
                            if (files) {
                                setImage(files[0]); // Set the selected file
                            }
                        }}
                    />
                </>
            )}
            {/* Genre Multi-Select */}
            <p className="py-4 text-lg">Select Genre(s):</p>
            <select
                multiple
                className="select select-bordered w-full max-w-xs"
                onChange={(e) => handleSelectChange(e, setSelectedGenreIds)}
            >
                {genres?.map(item => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>

            {/* Platform Multi-Select */}
            <p className="py-4 text-lg">Select Platform(s):</p>
            <select
                multiple
                className="select select-bordered w-full max-w-xs"
                onChange={(e) => handleSelectChange(e, setSelectedPlatformIds)}
            >
                {platforms?.items.map(item => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>

            {/* Publisher Multi-Select */}
            <p className="py-4 text-lg">Select Publisher(s):</p>
            <select
                multiple
                className="select select-bordered w-full max-w-xs"
                onChange={(e) => handleSelectChange(e, setSelectedPublisherIds)}
            >
                {publishers?.items.map(item => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>

            {initialImage && < Image query={{ hashKey: initialImage, format: ImageFormat.WEBP }} />}
            <Button
                type="submit"
                color="primary"
                className="text-lg m-2 text-blue-500"
                disabled={isUpdating} // Disable button while updating
            >
                {isUpdating ? "Saving..." : "Save"}
            </Button>

        </AppForm>
    </div>


};

export default GameForm;
