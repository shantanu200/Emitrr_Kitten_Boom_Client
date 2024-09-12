import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckFat,
  Person,
  Spinner,
  Sword,
  XCircle,
} from "@phosphor-icons/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { debounce } from "lodash";
import { useUserNameExists } from "@/query/functions/User.function";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useMutationQuery from "@/query/query.mutation";
import { ILoginResponse } from "@/interfaces/API.interface";
import API_ENDPOINT from "@/api/url";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const schema = z.object({
  userName: z
    .string()
    .nonempty("Please enter valid username")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username mut be less than 20 characters")
    .transform((userName) => userName.toLowerCase()),
});

const passwordSchema = z.object({
  password: z
    .string()
    .nonempty("Please enter valid password")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be less than 20 characters"),
});

type FormSchema = z.infer<typeof schema>;
type PasswordSchema = z.infer<typeof passwordSchema>;

const UserNameField: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      userName: "",
    },
  });

  const passwordForm = useForm<PasswordSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  const [isUserNameExists, setIsUserNameExists] = useState<boolean | null>(
    null
  );
  const [debouncedUserName, setDebouncedUserName] = useState<string>("");
  const [openPasswordDialog, setOpenPasswordDialog] = useState<boolean>(false);

  const debounceSearch = useMemo(
    () =>
      debounce((username: string) => {
        setDebouncedUserName(username);
      }, 300),
    []
  );

  const { mutateAsync: createUserHandler, isPending: createUserPending } =
    useMutationQuery<
      ILoginResponse,
      Error,
      { userName: string; password: string }
    >("POST", API_ENDPOINT.CREATE, {
      onSuccess: (data) => {
        Cookies.set("access-token", String(data?.accessToken), { expires: 7 });
        navigate("/dashboard");
      },
    });

  const onUserNameChange = useCallback(
    (value: string) => {
      form.setValue("userName", value);
      form.trigger("userName");
      debounceSearch(value);
    },
    [debounceSearch, form]
  );

  const checkUserNameExists = useUserNameExists(debouncedUserName);

  useEffect(() => {
    if (checkUserNameExists.data) {
      setIsUserNameExists(checkUserNameExists.data.exists);
    }
  }, [checkUserNameExists.data]);

  const onStartGame = form.handleSubmit(() => {
    setOpenPasswordDialog((prev) => !prev);
  });

  const onSetPassword = passwordForm.handleSubmit(async (data) => {
    await createUserHandler({
      userName: form.getValues("userName"),
      password: data.password,
    });
  });

  return (
    <div className="space-y-4 w-full flex flex-col items-center text-center z-20">
      <div className="w-full flex flex-col items-center space-y-2 h-16">
        <div className="relative w-full md:max-w-md max-w-full">
          <Person
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4"
            weight="bold"
          />
          <Input
            {...form.register("userName")}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onUserNameChange(e.target.value)
            }
            placeholder="Enter your username ..."
            className={"w-full pl-8"}
          />
          {checkUserNameExists.isLoading ? (
            <Spinner className="absolute animate-spin right-3 top-2.5" />
          ) : (
            debouncedUserName.length > 3 &&
            (isUserNameExists ? (
              <XCircle
                className="text-red-600 absolute right-3 top-2.5"
                weight="fill"
              />
            ) : (
              <CheckFat
                weight="fill"
                className="text-primary absolute right-3 top-2.5"
              />
            ))
          )}
        </div>
        {form.formState.errors?.userName && (
          <p className="text-red-600  text-xs text-start">
            {form.formState.errors?.userName?.message}
          </p>
        )}
        {debouncedUserName &&
          !checkUserNameExists.isLoading &&
          !form.formState.errors?.userName && (
            <p
              className={cn(
                "text-sm",
                isUserNameExists ? "text-red-600" : "text-primary"
              )}
            >
              {isUserNameExists
                ? "Username Already Exists"
                : "Username is available"}
            </p>
          )}
      </div>
      <Button
        size={"lg"}
        className="lg:w-1/3 md:w-1/2 flex items-center gap-x-3"
        onClick={onStartGame}
        disabled={
          isUserNameExists ||
          checkUserNameExists.isLoading ||
          !form.formState.isValid
        }
      >
        <Sword className="h-5 w-5" />
        <span>Start Game</span>
      </Button>
      <Dialog
        open={openPasswordDialog}
        onOpenChange={() => setOpenPasswordDialog((prev) => !prev)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Password</DialogTitle>
            <DialogDescription>
              Please enter password for "<b>{debouncedUserName}</b>"
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Input
              {...passwordForm.register("password")}
              type="password"
              placeholder={`Password of ${debouncedUserName}`}
            />
            {passwordForm?.formState?.errors?.password && (
              <p className="text-red-600 text-xs pl-2">
                {passwordForm?.formState?.errors?.password?.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button onClick={onSetPassword} disabled={createUserPending}>
              {createUserPending ? <Spinner className="h-5 w-5 animate-spin" /> : <span>Submit</span>}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserNameField;
