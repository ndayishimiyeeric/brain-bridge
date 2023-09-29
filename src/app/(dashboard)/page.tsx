import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import SideBar from "./_components/side-bar";

export default function Dashboard() {
  return (
    <div>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}
