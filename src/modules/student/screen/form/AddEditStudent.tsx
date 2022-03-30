import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ApplicationState } from '../../../../fe-helper/core/store/types';
import { Student } from '../../../../shared/model';
import StudentForm from '../../component/StudentForm';
import { addStudentRequest, editStudentRequest, getStudentRequest, setIsLeave } from './action';

export default function AddEditStudent() {
  const history = useHistory();
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);

  const studentFormState: any = useSelector<ApplicationState | null>((s) => s?.studentForm);

  const { informationFormUpdateStudent } = studentFormState;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!studentId) return;
    dispatch(getStudentRequest({ id: studentId }));
  }, [studentId,informationFormUpdateStudent]);

  const handleStudentFormSubmit = (formValues: Student) => {
    // TODO: Handle submit here, call API  to add/update student
    if (isEdit) {
      dispatch(editStudentRequest(formValues));
    } else {
      dispatch(addStudentRequest(formValues));
    }
    // Toast success
    toast.success('Save student successfully!');
  };

  // Redirect back to student list
  useEffect(() => {
    if (studentFormState.isLeave) {
      dispatch(setIsLeave({ isLeave: false }));
      history.push('/admin/students');
    }
  }, [studentFormState.isLeave]);

  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...informationFormUpdateStudent,
  } as Student;

  return (
    <Box>
      <Link to={'/admin/students'}>
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>
      <Typography variant="h4">{isEdit ? 'Update student info' : 'Add new student'}</Typography>

      {(!isEdit || Boolean(informationFormUpdateStudent)) && (
        <Box mt={3}>
          <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
        </Box>
      )}
    </Box>
  );
}
