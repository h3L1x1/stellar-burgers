import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { RootState, AppDispatch } from '../../services/store';
import { updateUser } from '../../services/slices/authSlice';

export const Profile: FC = () => {
  const { user, error, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
    }
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isFormChanged) {
      const updateData: { name?: string; email?: string; password?: string } =
        {};

      if (formValue.name !== user?.name) {
        updateData.name = formValue.name;
      }
      if (formValue.email !== user?.email) {
        updateData.email = formValue.email;
      }
      if (formValue.password) {
        updateData.password = formValue.password;
      }

      dispatch(updateUser(updateData));

      setFormValue((prev) => ({
        ...prev,
        password: ''
      }));
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={error || ''}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
