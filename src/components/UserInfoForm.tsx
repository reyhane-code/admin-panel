import { useState } from "react";
import useUser from "../hooks/useUser";
import { HttpRequest } from "../helpers/http-request-class.helper";
import Alert from "./common/Alert";
import EditableInput from "./common/EditableInput";
import Button from "./common/Button";
import useAuthStore from "../auth.store";
import User from "../entities/User";
import AppForm from "./common/AppForm";
import { ObjectSchema } from "yup";
import * as yup from "yup";



function UserInfoForm() {
  const { data: user, error, isLoading } = useUser();
  const phone = user?.phone;
  const setIdentity = useAuthStore((s) => s.setIdentity);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  if (error) {
    return <Alert text="An error occurred!" />;
  }

  if (isLoading) {
    return (
      <h2 className="loading loading-ring loading-lg text-4xl">Loading</h2>
    );
  }

  const handleUpdateUser = async (data: any) => {
    const updateData = {
      username: data.username,
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
    };

    setIsUpdating(true);
    const res = await HttpRequest.put("/v1/user", updateData);
    if (res.status === 200) {
      setIdentity({ id: user.id, ...updateData } as User);
    }
  };

  const onError = (e: any) => {
    console.log('on error infoForm', e)
  }

  const validationSchema: ObjectSchema<any> = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    // firstName: yup.string().required("First name is required"),
    // lastName: yup.string().required("Last name is required"),
  });

  return (
    <div className="flex w-2/3 py-4 px-6">
      {updateError && <Alert text={updateError} />}
      <AppForm
        onSubmit={handleUpdateUser}
        onError={onError}
        doFinally={() => setIsUpdating(false)}
        validationSchema={validationSchema}
        initialValues={{
          phone: phone,
          username: user?.username || "",
          email: user?.email || "",
          firstName: user?.first_name || "",
          lastName: user?.last_name || "",
        }}
      >
        <EditableInput name="username" label="Username" />
        {<EditableInput name="phone" label="Phone" disabled={true} />}
        <EditableInput name="email" label="Email" />
        <EditableInput name="firstName" label="First Name" />
        <EditableInput name="lastName" label="Last Name" />
        <Button
          type="submit"
          color="primary"
          className="text-lg m-2 text-blue-500"
          disabled={isUpdating} // Disable button while updating
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </Button>

        {user.hasPassword &&
          <div>
            <EditableInput name="password" label="" />

            <Button color="primary" className="text-lg m-2 text-blue-500" onClick={() => setIsChangingPassword(true)}>
              Change Password
            </Button>
          </div>

        }

        {!user?.hasPassword && (
          <>
            <EditableInput name="password" label="Set Password"/>
          </>
        )}
      </AppForm>
    </div>
  );
}

export default UserInfoForm;
