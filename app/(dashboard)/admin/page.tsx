import { cookies } from "next/headers";
import Home from "./_admin_components/landing-page-admin";

export default async function Page() {
  const cookies1 = await cookies();
  console.log(cookies1.get("user_profile"));
  return (
    <div>
      <Home />
    </div>
  );
}
