import { useRouter } from "next/router"
import {
  FireyErrors,
  RegistrationRequest as UserInfos,
} from "../typings/interfaces/mains"
// redux
import { useAppDispatch, useAppSelector } from "../app/hooks/redux"
import { userRegister } from "../app/redux/slices/authSlice"
// hooks
import { useForm } from "../app/hooks/useForm"
// ui
import Logo from "../app/services/logo"
import validate from "../app/services/validationParams"
// components
import {
  CustomLink,
  UserInput,
  Button,
  BigShopName,
  FormError,
} from "../components"
// styles
import {
  PageWrapper,
  TitleContainer,
  FormContainer,
  FormInner,
  FormExtra,
  FormElements,
  LogoWrapper,
} from "../styles/pages/authPagesStyles"

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
} as UserInfos

export default function RegisterPage() {
  const router = useRouter()
  const { values, setValues, errors, handleChange, handleBlur, handleSubmit } =
    useForm(
      {
        initialState: initialValues,
        onSubmit: (values: UserInfos) => createUser(values),
      },
      validate.register
    )

  const { firstName, lastName, email, password } = values as UserInfos
  const checkError = Object.keys(errors).length !== 0

  const dispatch = useAppDispatch()
  const { status } = useAppSelector((state) => state.auth)

  async function createUser({
    firstName,
    lastName,
    email,
    password,
  }: UserInfos) {
    try {
      setValues({ ...initialValues })
      const response = await dispatch(
        userRegister({ firstName, lastName, email, password })
      ).unwrap()
      // console.log(`response from client`, response)
      if (response.success === true) router.push("/")
    } catch (error) {
      setValues({ ...initialValues })
      const { message } = error as FireyErrors
      // console.log(message)
    }
  }

  return (
    <PageWrapper>
      <TitleContainer>
        <BigShopName />
      </TitleContainer>
      <FormContainer>
        <FormInner>
          <FormExtra>
            <h3>Create a new account</h3>
            <LogoWrapper>
              <Logo name="google" />
              <Logo name="facebook" />
            </LogoWrapper>
          </FormExtra>
          <FormElements onSubmit={handleSubmit}>
            <UserInput
              label="First Name"
              value={firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <UserInput
              label="Last Name"
              value={lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <UserInput
              name="email"
              label="Email Address"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <UserInput
              type="password"
              label="Password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormError
              errors={errors}
              style={{ marginTop: "16px" }}
              show={checkError}
            />
            <Button
              type="submit"
              text="Sign Up"
              style={{ marginTop: "24px" }}
            />
            <CustomLink
              style={{ marginTop: "14px" }}
              href="/login"
              text="Already have an account?"
            />
          </FormElements>
        </FormInner>
      </FormContainer>
    </PageWrapper>
  )
}
