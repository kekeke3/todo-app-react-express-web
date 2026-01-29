import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { CheckCircle } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Hero */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">TaskFlow</h1>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Organize your work and life, finally.
            </h2>

            <p className="text-lg text-gray-600">
              Become focused, organized, and calm with TaskFlow. The world's #1
              task manager app.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-primary-600" />
              </div>
              <span className="text-gray-700">Track your daily tasks</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-primary-600" />
              </div>
              <span className="text-gray-700">
                Set priorities and deadlines
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-primary-600" />
              </div>
              <span className="text-gray-700">Collaborate with your team</span>
            </div>
          </div>

         
        </div>

        {/* Right side - Login Form */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="glass-effect card p-8">
              <div className="lg:hidden mb-8 text-center">
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="h-10 w-10 bg-primary-600 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">TaskFlow</h1>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Sign in to your account
                </h2>
                <p className="mt-2 text-gray-600">
                  Welcome back! Continue your productivity journey
                </p>
              </div>

              <LoginForm />

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Create one now
                  </Link>
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600">
                  By signing in, you agree to our{" "}
                  <Link
                    to="/terms"
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
