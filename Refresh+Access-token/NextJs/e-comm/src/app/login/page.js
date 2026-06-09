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

const [formData, setFormData] = useState({})


let handleChange = (e)=>{
  let {name , value} = e.target
  setFormData({...formData, [name]: value})
}

let handleSubmit  = async (e)=>{
  e.preventDefault()

  try {

    let res = await api.post("/api/auth/login",formData)

    router.push("/home")
    
  } catch (error) {
    console.log("Error in login",error)
  }
}

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Enter your password"
              />
            </div>

            <Button className="w-full">
              Login
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}