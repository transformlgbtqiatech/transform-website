export function CloudflareError(props: {
  errorCode: "FORBIDDEN" | "CONFLICT" | "BAD_REQUEST";
}) {
  let jsx: JSX.Element | null = null;

  if (props.errorCode === "FORBIDDEN") {
    jsx = (
      <span>
        Browser challenged failed. Are you sure you are not a bot? If yes{" "}
        <a href="/contact-submit" className="underline">
          try again
        </a>
        <span>
          . If it still persists contact us at any of our social handles.
        </span>
      </span>
    );
  }

  if (props.errorCode === "CONFLICT") {
    jsx = (
      <span>
        Captcha check either timed our or it needs to be reinitiated. Please
        refresh the page and try again.
      </span>
    );
  }

  if (props.errorCode === "BAD_REQUEST") {
    jsx = <span>Something went wrong. Please try again.</span>;
  }

  return jsx;
}
