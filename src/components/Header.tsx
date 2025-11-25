import { getUserFromToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import ClientHeader from "./ClientHeader";

const Header = async () => {
  const user = await getUserFromToken();

  if (!user) {
    redirect("/login");
  }

  const { email } = user;

  return (
    <header className="fixed w-full z-50">
      <ClientHeader email={email} />
    </header>
  );
};

export default Header;
