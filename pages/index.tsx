import Layout from "../components/Layout";
import { useUser } from "../lib/context/user.context";
import { useRouter } from "next/router";
import Logo from "../public/logo.png";
import { Form, Formik } from "formik";
import { login } from "../lib/utils/api/account";
import { isError } from "../lib/types/myError";
import TextInput from "../components/TextInput";
import Image from "next/image";
import Button from "../components/Button";

export default function Home() {
  const { user, setUser } = useUser();
  const router = useRouter();

  const validate = (values: {
    email: string;
    password: string;
  }): { email?: string; password?: string } => {
    const errors: { email?: string; password?: string } = {};
    // authenticate password
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (values.password.length < 4) {
      errors.password = "Password must be greater than 4 digits";
    }
    return errors;
  };

  if (user) {
    router.replace("/dashboard");
  }

  return (
    <Layout title="Login">
      <>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={validate}
          onSubmit={async (
            { email, password },
            { setSubmitting, setErrors }
          ) => {
            setSubmitting(true);
            console.log(`Email: ${email}, Password: ${password}`);
            const user = await login(email, password);
            setSubmitting(false);
            if (isError(user)) {
              setErrors({ password: "Invalid Password or email" });
              return;
            }
            setUser(user);
            await router.replace("/dashboard");
          }}
        >
          {({ isSubmitting }) => (
            <main className="min-h-screen flex flex-col-reverse md:flex-row md: justify-around">
              <div className="my-auto">
                <Image height={500} src={Logo} alt="Game Day Tickets Logo" />
              </div>
              <Form className="my-auto">
                <h1 className="text-4xl text-center font-medium mb-7">Login</h1>
                <div className="my-3">
                  <TextInput
                    label="Email:"
                    placeholder="jdoe@example.com"
                    name="email"
                    type="email"
                  />
                </div>
                <div className="my-3">
                  <TextInput
                    label="Password:"
                    placeholder="mySecurePassword"
                    name="password"
                    type="password"
                  />
                </div>
                <div className="mt-3">
                  <Button type="submit" disabled={isSubmitting}>
                    Login
                  </Button>
                </div>
              </Form>
            </main>
          )}
        </Formik>
      </>
    </Layout>
  );
}
