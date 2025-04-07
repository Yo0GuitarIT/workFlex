import { useRouteError } from "react-router";

function NotFound() {
    const error = useRouteError();

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
            <p className="font-bold">
                404 - Not Found
                <br />
                {error instanceof Error ? error.message : "Unknown error"}
            </p>
        </div>
    );
}

export default NotFound;
