import Layout from "../components/Layout";
import { useUser } from "../lib/context/user.context";
import { useRouter } from "next/router";
import Logo from "../public/logo.png";
import { Form, Formik } from "formik";
import { createAccount } from "../lib/utils/api/account";
import { isError } from "../lib/types/myError";
import TextInput from "../components/TextInput";
import Image from "next/image";
import Button from "../components/Button";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";

export default function CreateAccount() {
  const { user, setUser } = useUser();
  const [phone, setPhone] = useState<string | undefined>("");
  const router = useRouter();

  const validate = (values: {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
  }): {
    email?: string;
    password?: string;
    name?: string;
    confirmPassword?: string;
  } => {
    const errors: {
      email?: string;
      password?: string;
      name?: string;
      confirmPassword?: string;
    } = {};
    // authenticate password
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (values.password.length < 4) {
      errors.password = "Password must be greater than 4 digits";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Password must be same as above";
    }
    if (phone === undefined || phone === "") {
      errors.email = "Phone # must be entered";
    }
    return errors;
  };

  if (user) {
    router.replace("/dashboard");
  }

  return (
    <Layout title="Create Account">
      <>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validate={validate}
          onSubmit={async (
            { email, password, name },
            { setSubmitting, setErrors }
          ) => {
            setSubmitting(true);
            const user = await createAccount(email, password, phone!, name);
            setSubmitting(false);
            if (isError(user)) {
              setErrors({ password: "Invalid Values" });
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
                    label="Name:"
                    placeholder="John Doe"
                    name="name"
                    type="text"
                  />
                </div>
                <div className="my-3">
                  <TextInput
                    label="Email:"
                    placeholder="jdoe@example.com"
                    name="email"
                    type="email"
                  />
                </div>
                <div className="my-3">
                  <PhoneInput
                    value={phone}
                    onChange={(value) => setPhone(value)}
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
                <div className="my-3">
                  <TextInput
                    label="Confirm Password:"
                    placeholder="mySecurePassword"
                    name="confirmPassword"
                    type="password"
                  />
                </div>
                <div className="mt-3">
                  <Button type="submit" disabled={isSubmitting}>
                    Create Account
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
