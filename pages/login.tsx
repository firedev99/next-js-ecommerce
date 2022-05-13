import { useRouter } from "next/router"
import {
  FireyErrors,
  LoginRequest as UserInfos,
} from "../typings/interfaces/mains"
// redux
import { useAppDispatch, useAppSelector } from "../app/hooks/redux"
import { userLogin } from "../app/redux/slices/authSlice"
// hooks
import { useForm } from "../app/hooks/useForm"
// ui
import Logo from "../app/services/logo"
import validate from "../app/services/validationParams"
// components
import {
  BigShopName,
  Button,
  CustomLink,
  UserInput,
  FormError,
  MainLayout,
} from "../components"
import PageTransition from "../components/loader/PageTransition"
// styles
import {
  FormContainer,
  FormElements,
  FormExtra,
  FormInner,
  LogoWrapper,
  PageWrapper,
  TitleContainer,
} from "../styles/pages/authPagesStyles"

const initialValues = {
  email: "",
  password: "",
} as UserInfos

function LoginPage() {
  const router = useRouter()

  const {
    values,
    setValues,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
  } = useForm<UserInfos>(
    { initialState: initialValues, onSubmit: (values) => authUser(values) },
    validate.login
  )

  const { email, password } = values
  const checkError = Object.keys(errors).length !== 0

  const dispatch = useAppDispatch()
  const { status } = useAppSelector((state) => state.auth)

  async function authUser({ email, password }: UserInfos) {
    try {
      setValues({ ...initialValues })
      const response = await dispatch(userLogin({ email, password })).unwrap()
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
      <PageTransition />
      <TitleContainer>
        <BigShopName />
      </TitleContainer>
      <FormContainer>
        <FormInner>
          <FormExtra>
            <h3>Login to your account</h3>
          </FormExtra>
          <LogoWrapper>
            <Logo name="google" />
            <Logo name="facebook" />
          </LogoWrapper>
          <FormElements onSubmit={handleSubmit}>
            <UserInput
              label="Email Address"
              name="email"
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
              text="Sign In"
              style={{ marginTop: "24px" }}
              disable={isSubmitting}
            />
            <CustomLink
              style={{ marginTop: "14px" }}
              href="/register"
              text="Don't have an account yet?"
            />
          </FormElements>
        </FormInner>
      </FormContainer>
    </PageWrapper>
  )
}

LoginPage.Layout = MainLayout

export default LoginPage
