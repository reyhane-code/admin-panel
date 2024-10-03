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
    onSubmit: (data: any) => Promise<void>;
    initialName?: string;
    initialDescription?: string;
    initialImage?: string;
    initialMetacritic?: number;
    initialRatingTop?: number;
    updating: boolean
}

export const GameForm = ({ onSubmit, initialName, initialDescription, initialImage, initialMetacritic, initialRatingTop, updating }: IProps) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([])
    const [selectedPlatformIds, setSelectedPlatformIds] = useState<number[]>([])
    const [selectedPublisherIds, setSelectedPublisherIds] = useState<number[]>([])

    

    const { data: platforms } = usePlatforms()
    const { data: genres } = useGenres()
    const { data: publishers } = usePublishers()

    const validationSchema: ObjectSchema<any> = yup.object().shape({
        title: yup.string().required("Title is required"),
        content: yup.string().required("Content is required")
            .min(100)
            .max(10000),
    });

    const handleSubmit = (data: any) => {
        return onSubmit(data)
    }

    const onError = (e: any) => {
        console.log('on error infoForm', e)
    }
    return <div className="gird grid-cols-1 gap-2 w-[40vw] max-h-[50vh] py-4 px-6">
        <AppForm
            onSubmit={handleSubmit}
            onError={onError}
            doFinally={() => setIsUpdating(false)}
            validationSchema={validationSchema}
            initialValues={{
                title: initialName ?? '',
                content: initialDescription ?? '',
                rating_top: initialRatingTop ?? '',
                metacritic: initialMetacritic ?? ''
            }}
        >
            <EditableInput name="name" label="Name" />
            <TextArea name="description" label="Description" placeholder="type description here..." />
            <EditableInput type="number" name="rating_top" label="Rating Top" />
            <EditableInput type="number" name="metacritic" label="Metacritic" />

            {!updating && (<>
                <label className="text-lg mx-1">
                    Image:
                </label>

                <FileInput name="file" /></>)}
            {/* genre drop down multiselect */}
            <p className="py-4 text-lg">Select Genre(s):</p>
            <select multiple className="select select-bordered w-full max-w-xs">
                {genres?.map(item =>
                    <option value={item.id}
                        onSelect={(e) => setSelectedGenreIds([selectedGenreIds?.push()])}
                    >
                        <div>
                            {item.name}
                        </div>
                        <IoClose className="text-lg text-red-500"
                            onClick={() => setSelectedGenreIds(selectedGenreIds.filter(id => id == item.id))} />
                    </option>
                )}

            </select>

            {/* platform drop down multiselect */}
            <p className="py-4 text-lg">Select Platform(s):</p>
            <select multiple className="select select-bordered w-full max-w-xs">
                {platforms?.items.map(item =>
                    <option value={item.id}
                        onSelect={() => (setSelectedPlatformIds([selectedPlatformIds?.push(item.id)]))}
                    >
                        <div>
                            {item.name}
                        </div>
                        <IoClose className="text-lg text-red-500"
                            onClick={() => setSelectedPlatformIds(selectedPlatformIds.filter(id => id == item.id))} />
                    </option>
                )}

            </select>
            {/* publisher drop down multiselect */}
            <p className="py-4 text-lg">Select Publisher(s):</p>
            <select multiple className="select select-bordered w-full max-w-xs">
                {publishers?.items.map(item =>
                    <option value={item.id}
                        onSelect={() => (setSelectedPublisherIds([selectedPublisherIds?.push(item.id)]))}
                    >
                        <div>
                            {item.name}
                        </div>
                        <IoClose className="text-lg text-red-500"
                            onClick={() => setSelectedPublisherIds(selectedPublisherIds.filter(id => id == item.id))} />
                    </option>
                )}

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
