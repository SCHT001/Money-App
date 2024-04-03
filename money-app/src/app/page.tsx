'use client'

import { useRouter } from "next/navigation"
export default function Page() {

  const router = useRouter();
  router.push("/transactions");
  return (
    <>
      <div className="">Redirecting...</div>
    </>
  )
}