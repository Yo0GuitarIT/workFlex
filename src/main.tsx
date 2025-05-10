import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/ AuthProvider.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import Login from "./routes/Login";
import NotFound from "./routes/NotFound";
import Records from "./routes/Records.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/record",
        element: (
            <ProtectedRoute>
                <Records />
            </ProtectedRoute>
        ),
    },
    { path: "*", element: <NotFound /> },
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
