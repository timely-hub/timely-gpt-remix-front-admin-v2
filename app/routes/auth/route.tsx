import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import { createTokenSession } from "~/.server/session";
import Logo from "~/assets/icons/Logo.svg?react";
import Box from "~/components/Box";
import Buttons from "~/components/Box/Buttons";
import LabelBox from "~/components/Box/LabelBox";
import TextInput from "~/components/Box/TextInput";
import LoginLayout from "~/layouts/Header";
import { loadFetcher } from "~/utils/fetcher";

export const action = async (args: ActionFunctionArgs) => {
  const body = await args.request.formData();
  const email = body.get("email");
  const password = body.get("password");
  const searchParams = new URL(args.request.url).searchParams;
  const referer = searchParams.get("referer");
  const redirectUrl = referer ? referer : "/";
  const fetcher = await loadFetcher(args, "post");
  const res = await fetcher<{ accessToken: string }>("/auth/sign-in", {
    body: JSON.stringify({ email, password }),
  });
  if (res.success) {
    return await createTokenSession({
      request: args.request,
      accessToken: res.data.accessToken,
      remember: true,
      redirectTo: redirectUrl,
    });
  }
  return json(res, { status: res.status });
};

export default function Login() {
  const [email, setEmail] = useState<string>("admin@test.com");
  const [password, setPassword] = useState<string>("admin");
  return (
    <LoginLayout>
      <Box textAlign={"center"}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={"320px"}
          margin={"128px auto"}
          gap={"16px"}
        >
          <Logo />
          <p>관리자 로그인</p>
          <Form method="post">
            <LabelBox label="이메일">
              <TextInput
                name="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </LabelBox>
            <LabelBox label="비밀번호" marginBottom={"16px"}>
              <TextInput
                name="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </LabelBox>
            <Buttons type="submit" width={"100%"}>
              로그인
            </Buttons>
          </Form>
        </Box>
      </Box>
    </LoginLayout>
  );
}
