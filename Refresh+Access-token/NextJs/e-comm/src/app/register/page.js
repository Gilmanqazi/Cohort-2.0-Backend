"use client"
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { api } from "../lib/api";
import { useRouter } from "next/navigation";

export default function page() {

  let router = useRouter()

const [fromData, setFromData] = useState({})

let handleChange = (e)=>{

  let {name, value} = e.target

  setFromData({...fromData, [name]: value})

}

let handleSubmit = async(e)=>{
e.preventDefault()

try {

  let res = await api.post("/api/auth/register",fromData)  
  router.push("/home")
} catch (error) {
  console.log("Error in register",error)
}
}



  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
              onChange={handleChange}
              name="name"
                type="text"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
              onChange={handleChange}
              name="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
              onChange={handleChange}
              name="password"
                type="password"
                placeholder="Create a password"
              />
            </div>

            <Button className="w-full">
              Register
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}