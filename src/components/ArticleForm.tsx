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

interface IProps {
    onSubmit: (data: FormData) => Promise<void>; // Change to FormData
    initialTitle?: string;
    initialContent?: string;
    initialImage?: string;
    updating: boolean;
}

export const ArticleForm = ({ onSubmit, initialTitle, initialContent, initialImage, updating }: IProps) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [image, setImage] = useState<File | null>(null); // State to hold the selected image

    const validationSchema: ObjectSchema<any> = yup.object().shape({
        title: yup.string().required("Title is required"),
        content: yup.string().required("Content is required")
            .min(100)
            .max(10000),
    });

    const handleSubmit = (data: any) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        if (image) {
            formData.append('image', image); // Append the file if it exists
        }
        return onSubmit(formData); // Pass formData instead of data
    }

    const onError = (e: any) => {
        console.log('on error infoForm', e);
    }

    return (
        <div className="flex w-2/3 py-4 px-6">
            <AppForm
                onSubmit={handleSubmit}
                onError={onError}
                doFinally={() => setIsUpdating(false)}
                validationSchema={validationSchema}
                initialValues={{
                    title: initialTitle ?? '',
                    content: initialContent ?? ''
                }}
            >
                <EditableInput name="title" label="Title" />
                <TextArea label='Content' name="content" placeholder="type your content here..." />
                {!updating && (
                    <>
                        <label className="text-lg mx-1">Image:</label>
                        <FileInput
                            name="image"
                            onChange={(images) => {
                                if (images) {
                                    setImage(images[0]); // Set the selected file
                                }
                            }}
                        />
                    </>
                )}
                {initialImage && <Image query={{ hashKey: initialImage, format: ImageFormat.WEBP }} />}
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
    );
};

export default ArticleForm;
