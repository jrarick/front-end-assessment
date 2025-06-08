"use client";

import { useRouter } from "next/navigation";
import { Input } from "./ui/input";

export default function SearchBar() {
  const router = useRouter();

  return (
    <Input
      placeholder="Search images..."
      className="max-w-64"
      onChange={(e) => {
        if (e.target.value === "" || !e.target.value.trim()) {
          router.push("/");
        } else {
          router.replace(`/?search=${e.target.value}`);
        }
      }}
    />
  );
}
