import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { IoMail } from "react-icons/io5";

export default function ForgotPasswordConfirmation() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <Card className="w-[540px] text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-6">
            <IoMail className="h-16 w-16 text-black" />
          </div>
          <p className="text-gray-600 mb-4">
            We&apos;ve sent a link to your email address. Please check your inbox and
            click the link to reset your password.
          </p>
          <p className="text-sm text-gray-500">
            If you don&apos;t see the email, please check your spam folder.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
