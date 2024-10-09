import { useState } from "react";
import AppForm from "./common/AppForm";
import { ObjectSchema } from "yup";
import * as yup from "yup";
import EditableInput from "./common/EditableInput";
import Button from "./common/Button";


interface IProps {
    onSubmit: (data: any) => Promise<void>;
    initialUsername?: string;
    initialFirstName?: string;
    initialLastName?: string;
    initialRole?: string;
    initialActiveState?: boolean;
    updating: boolean
}

enum Role {
    USER = 'user',
    ADMIN = 'admin',
    SUPER = 'super'
}

export const UserForm = ({
    onSubmit,
    initialUsername,
    initialFirstName,
    initialLastName,
    initialRole,
    initialActiveState,
    updating
}: IProps) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [active, setActive] = useState<boolean>(initialActiveState || false);
    const [role, setRole] = useState(initialRole || '');

    const validationSchema: ObjectSchema<any> = yup.object().shape({
        username: yup.string().required("Username is required"),
        first_name: yup.string(),
        last_name: yup.string(),
        phone: yup.string().required('Phone number is required!'),
        email: yup.string().email()
    });

    const handleSubmit = async (data: { username: string; first_name: string; last_name: string; phone: string; email: string }) => {
        setIsUpdating(true);
        try {
            await onSubmit({
                username: data.username,
                first_name: data.first_name,
                last_name: data.last_name,
                active,
                role,
                phone: data.phone,
                email: data.email
            });
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const onError = (e: any) => {
        console.log('on error infoForm', e);
    };

    return (
        <div className="flex w-2/3 py-4 px-6">
            <AppForm
                onSubmit={handleSubmit}
                onError={onError}
                validationSchema={validationSchema}
                initialValues={{
                    username: initialUsername ?? '',
                    first_name: initialFirstName ?? '',
                    last_name: initialLastName ?? '',
                }}
            >
                {!updating && <EditableInput name="phone" label="Phone" />}
                {!updating && <EditableInput name="email" label="Email" />}
                <EditableInput name="username" label="Username" />
                <EditableInput name="first_name" label="First Name" />
                <EditableInput name="last_name" label="Last Name" />

                <select
                    className="select select-bordered w-full max-w-xs"
                    value={role}
                    onChange={(e) => setRole(e.target.value as Role)}
                >
                    <option value="" disabled>Select Role</option>
                    <option value={Role.SUPER}>Super</option>
                    <option value={Role.ADMIN}>Admin</option>
                    <option value={Role.USER}>User</option>
                </select>

                <div className="flex items-center my-4">
                    <input
                        type="checkbox"
                        id="active"
                        checked={active}
                        onChange={() => setActive(!active)}
                        className="mr-2 checkbox"
                    />
                    <label htmlFor="active">Active</label>
                </div>
                <Button
                    type="submit"
                    color="primary"
                    className="text-lg m-2 text-blue-500"
                    disabled={isUpdating}
                >
                    {isUpdating ? "Saving..." : "Save"}
                </Button>
            </AppForm>
        </div>
    );
};

export default UserForm;
