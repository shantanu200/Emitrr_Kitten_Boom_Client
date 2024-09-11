import API_ENDPOINT from "@/api/url";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ILoginResponse } from "@/interfaces/API.interface";
import useMutationQuery from "@/query/query.mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@phosphor-icons/react";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import Cookie from "js-cookie";

const schema = z.object({
  userName: z.string().nonempty("Please enter valid username"),
  password: z.string().nonempty("Please enter valid password"),
});

type FormSchema = z.infer<typeof schema>;

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const loginHandler = useMutationQuery<ILoginResponse, Error, FormSchema>(
    "POST",
    `${API_ENDPOINT.LOGIN}`,
    {
      onSuccess: (data) => {
        toast.success("User logged in successfully");
        Cookie.set("access-token", String(data?.accessToken), { expires: 7 });
        navigate("/");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );

  const onFormSubmit = useCallback(
    form.handleSubmit(async (data) => {
      await loginHandler.mutateAsync({
        userName: data.userName,
        password: data.password,
      });
    }),
    [form]
  );

  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <Input
          placeholder="Enter your username"
          {...form.register("userName")}
        />
        {form.formState.errors.userName && (
          <p className="text-red-500 text-xs">
            {form.formState.errors.userName.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Enter password"
          {...form.register("password")}
        />
        {form.formState.errors.password && (
          <p className="text-red-500 text-xs">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>
      <Button onClick={onFormSubmit}>
        {loginHandler.isPending ? (
          <Spinner className="animate-spin h-5 w-5" />
        ) : (
          <span>Submit</span>
        )}
      </Button>
    </section>
  );
};

export default SignIn;
