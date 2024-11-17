import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/register_user", formData);
      console.log(data);
      alert("Registration successful!");
    } catch (error) {
      console.error(error);
      alert("Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-gray-800 mx-auto">
            Sign Up
          </CardTitle>
          <CardDescription className="mx-auto">
            Please enter your details to register.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="userName">Username</Label>
                <Input
                  onChange={handleInputChange}
                  id="userName"
                  placeholder="Enter your username"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={handleInputChange}
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={handleInputChange}
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Sign Up"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
