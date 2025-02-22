import ResetPasswordContent from "./reset-password";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const resolvedSearchParams = await searchParams; // Await the Promise
  return <ResetPasswordContent searchParams={resolvedSearchParams} />;
}