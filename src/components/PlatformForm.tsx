import { useState } from "react";
import AppForm from "./common/AppForm";
import { ObjectSchema } from "yup";
import * as yup from "yup";
import EditableInput from "./common/EditableInput";
import Button from "./common/Button";

interface IProps {
    onSubmit: (data: any) => Promise<void>;
    initialName?: string;

}

export const PlatformFrom = ({ onSubmit, initialName }: IProps) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const validationSchema: ObjectSchema<any> = yup.object().shape({
        name: yup.string().required("Name is required"),
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
                name: initialName ?? ''
            }}
        >
            <EditableInput name="name" label="Name" />
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

export default PlatformFrom;
