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
    onSubmit: (data: any) => Promise<void>;
    initialTitle?: string;
    initialContent?: string;
    initialImage?: string;

}

export const ArticleForm = ({ onSubmit, initialTitle, initialContent, initialImage }: IProps) => {
    const [isUpdating, setIsUpdating] = useState(false);

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
    return <div className="flex w-2/3 py-4 px-6">
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
            <TextArea name="content" placeholder="type your content here..."/>
            <FileInput name="file" />
            {initialImage && < Image query={{ hashKey: initialImage, format: ImageFormat.WEBP }} />}
            <Button
                type="submit"
                color="primary"
                className="text-lg m-2 text-blue-500"
                disabled={isUpdating} // Disable button while updating
            >
                {isUpdating ? "Saving..." : "Save Changes"}
            </Button>

        </AppForm>
    </div>


};

export default ArticleForm;
