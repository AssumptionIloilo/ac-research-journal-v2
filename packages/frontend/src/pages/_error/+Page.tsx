import { usePageContext } from "vike-react/usePageContext";

export default function Page() {
  const { is404 } = usePageContext();
  return (
    <>
      {is404 ? (
        <>
          <h1>404 Page Not Found</h1>
          <p>This page could not be found.</p>
        </>
      ) : (
        <>
          <h1>500 Internal Server Error</h1>
          <p>Something went wrong.</p>
        </>
      )}
    </>
  );
}
