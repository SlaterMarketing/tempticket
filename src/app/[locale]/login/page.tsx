import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { LoginForm } from "./login-form";
import { buildPublicMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return buildPublicMetadata(
    locale,
    "login",
    t("loginTitle"),
    t("loginDescription"),
  );
}

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("LoginPage");
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <Suspense fallback={<div className="text-muted-foreground">{t("loading")}</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
