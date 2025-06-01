import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import Layout from "./components/Navbar/Layout.tsx";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/AuthProvider.tsx";

// 使用懶加載導入路由組件
const Dashboard = lazy(() => import("./routes/Dashboard.tsx"));
const Login = lazy(() => import("./routes/Login"));
const NotFound = lazy(() => import("./routes/NotFound"));
const Records = lazy(() => import("./routes/Records.tsx"));

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Layout>
                    <Suspense fallback={<div className="p-8">載入中...</div>}>
                        <Dashboard />
                    </Suspense>
                </Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: "/login",
        element: (
            <ProtectedRoute requireAuth={false}>
                <Suspense fallback={<div className="p-8">載入中...</div>}>
                    <Login />
                </Suspense>
            </ProtectedRoute>
        ),
    },
    {
        path: "/record",
        element: (
            <ProtectedRoute>
                <Layout>
                    <Suspense fallback={<div className="p-8">載入中...</div>}>
                        <Records />
                    </Suspense>
                </Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: "*",
        element: (
            <Layout>
                <Suspense fallback={<div className="p-8">載入中...</div>}>
                    <NotFound />
                </Suspense>
            </Layout>
        ),
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <MantineProvider>
                <Notifications />
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </MantineProvider>
        </QueryClientProvider>
    </StrictMode>,
);
