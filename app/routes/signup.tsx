import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { ActionFunction, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { User } from "@prisma/client";
import { ActionInput, schema, validationAction } from "~/utils/validation";

export const action: ActionFunction = async ({ request }) => {
  const { formData, errors } = await validationAction<ActionInput>({
    request,
    schema,
  });
  if (errors) {
    return json({ errors }, { status: 400 });
  }
  const { first_name, last_name, phone } = formData;
  const field: Pick<User, "first_name" | "last_name" | "phone"> = {
    first_name,
    last_name,
    phone,
  };

  console.log(field);

  const data = {};
  return json({ data: "form" });
};

export default function signup() {
  const actionData = useActionData();
  console.log(actionData);
  return (
    <Box display="flex" justifyContent="center" p={5}>
      <Box minWidth={500} bgcolor="skyblue" borderRadius={2}>
        <Form method="post">
          <Stack spacing={{ xs: 1, sm: 2, md: 4 }} p={3}>
            <Typography fontWeight="bold" color="dark" textAlign="center">
              Sign In
            </Typography>
            <TextField
              id="filled-hidden-label-small"
              placeholder="First Name"
              name="first_name"
              variant="filled"
              size="small"
            />
            <Typography variant="subtitle2" color="error">
              {actionData?.errors?.first_name}
            </Typography>
            <TextField
              id="filled-hidden-label-small"
              placeholder="Last Name"
              name="last_name"
              variant="filled"
              size="small"
            />
            <Typography variant="subtitle2" color="error">
              {actionData?.errors?.last_name}
            </Typography>
            <TextField
              id="filled-hidden-label-small"
              placeholder="Phone"
              name="phone"
              variant="filled"
              size="small"
            />
            <Typography variant="subtitle2" color="error">
              {actionData?.errors?.phone}
            </Typography>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </Form>
      </Box>
    </Box>
  );
}
