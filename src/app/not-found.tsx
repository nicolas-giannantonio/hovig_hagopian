import TransitionLink from "@/components/TransitionLink";

export default function NotFound() {
  return (
    <div id="notFound">
      <div className="w__notFound__content">
        <h1 className="notFound_title">404 Not Found</h1>
        <TransitionLink className="notFound_link" href="/">
          Return Home
        </TransitionLink>
      </div>
    </div>
  );
}
