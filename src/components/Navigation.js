import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="flex justify-end p-4 bg-gray-100 shadow-md">
      <Link href="/LoginPage" className="mx-2 text-blue-600 hover:underline">Login</Link>
      <Link href="/SignupPage" className="mx-2 text-blue-600 hover:underline">Signup</Link>
    </nav>
  );
};

export default Navigation;
