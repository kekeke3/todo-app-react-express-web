import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";

// Move icon components outside the Register component
const CheckCircleIcon = () => (
  <svg
    className="h-6 w-6 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const SmallCheckCircleIcon = () => (
  <svg
    className="h-4 w-4 text-blue-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Hero */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <CheckCircleIcon />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">TaskFlow</h1>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Start organizing your life today.
            </h2>

            <p className="text-lg text-gray-600">
              Join thousands who have transformed their productivity with
              TaskFlow. Free forever for individuals.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <SmallCheckCircleIcon />
              </div>
              <span className="text-gray-700">
                Unlimited tasks and projects
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <SmallCheckCircleIcon />
              </div>
              <span className="text-gray-700">
                Priority levels and deadlines
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <SmallCheckCircleIcon />
              </div>
              <span className="text-gray-700">
                Sync across all your devices
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <SmallCheckCircleIcon />
              </div>
              <span className="text-gray-700">
                Free forever, no credit card required
              </span>
            </div>
          </div>

        
        </div>

        {/* Right side - Register Form */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white/80 backdrop-blur-sm card p-8">
              <div className="lg:hidden mb-8 text-center">
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <CheckCircleIcon />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">TaskFlow</h1>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Create your account
                </h2>
                <p className="mt-2 text-gray-600">
                  Join thousands of productive people
                </p>
              </div>

              <RegisterForm />

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-3">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Sign in
                    </Link>
                  </p>
                  <p className="text-xs text-gray-500">
                    By signing up, you agree to our{" "}
                    <Link
                      to="/terms"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="font-medium text-blue-600 hover:text-blue-500"
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
    </div>
  );
};

export default Register;