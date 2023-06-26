import * as yup from "yup";

export const newEmployeeValidation = yup.object({
  name: yup.string().required(),
  employeeId: yup.string().required(),
  gender: yup.string().required(),
  age: yup.number().required(),
  department: yup.string().required(),
  email: yup.string().email("Invalid Email").required(),
  phoneNumber: yup.string().required(),
  yearsOfService: yup.number().required(),
  taxPolicy: yup.number().required(),
  bank: yup.string().required(),
  jobRole: yup.string().required(),
  accountNumber: yup.string().required(),
  monthlyBasePay: yup.number().required(),
  // profileImage: yup.mixed().test("require", "please select a file", (value) => {
  //   return value && value.length;
  // }),
});
