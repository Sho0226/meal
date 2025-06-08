"use client";
import {
  Anchor,
  Button,
  Divider,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { GoogleButton } from "./GoogleButton";
import { login, signup } from "@/app/auth/login/action";
import { GithubButton } from "./GithubButton/GithubButton";

type Props = {
  readonly searchParams: { error?: string };
  readonly handleGoogleLogin: () => Promise<void>;
  readonly handleTwitterLogin: () => Promise<void>;
  readonly handleGitHubLogin: () => Promise<void>;
};

type CombinedProps = PaperProps & Props;

export function AuthenticationForm({
  searchParams,
  handleGoogleLogin,
  handleGitHubLogin,
  ...props
}: CombinedProps) {
  const [type, toggle] = useToggle(["login", "register"]);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length < 6 ? "Password should include at least 6 characters" : null,
      ...(type === "register" && {
        name: (val) => (val.length === 0 ? "Name is required" : null),
      }),
    },
  });

  return (
    <Paper radius="md" p="lg" withBorder {...props}>
      <Text size="lg" fw={500} ta="center">
        {upperFirst(type)} with
      </Text>

      <Group grow mb="md" mt="md">
        <Stack>
          <Group ps="center">
            <GoogleButton radius="xl" onClick={handleGoogleLogin}>
              Google
            </GoogleButton>
            <GithubButton onClick={handleGitHubLogin} />
          </Group>
        </Stack>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form action={type === "login" ? login : signup} method="POST">
        <Stack>
          {type === "register" && (
            <TextInput
              name="name"
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
              required
            />
          )}

          <TextInput
            required
            name="email"
            label="Email"
            placeholder="hello@tech.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            radius="md"
          />

          <PasswordInput
            required
            name="password"
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            radius="md"
          />

          {type === "login" && (
            <Anchor
              component="a"
              href="/auth/password/form"
              size="xs"
              style={{
                display: "block",
                textAlign: "right",
                marginTop: "-10px",
              }}
            >
              Forgot password?
            </Anchor>
          )}

          {searchParams.error && (
            <Text color="red" size="xs" ta="center">
              {searchParams.error}
            </Text>
          )}

          <Button type="submit" radius="xl" fullWidth mt="md">
            {upperFirst(type)}
          </Button>

          <Anchor
            component="button"
            type="button"
            underline="always"
            c="dimmed"
            onClick={() => {
              const url = new URL(window.location.href);
              url.searchParams.delete("error");
              window.history.replaceState(null, "", url.toString());
              form.reset();
              toggle();
            }}
            size="xs"
            style={{ margin: "0 auto" }}
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
        </Stack>
      </form>
    </Paper>
  );
}
