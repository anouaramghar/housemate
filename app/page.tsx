import { getAcceptedEmailDomain } from "@/src/auth/config";
import { SignInForm } from "@/app/_components/SignInForm";

export const dynamic = "force-dynamic";

export default function SignIn() {
  return (
    <main className="page">
      <div className="panel">
        <div className="slots" aria-hidden="true">
          <span className="slot" />
          <span className="slot" />
          <span className="slot" />
          <span className="slot slot--open" />
        </div>
        <p className="caption">A household of four — one slot open</p>

        <h1>
          Find the people first.
          <span className="after">The house comes after.</span>
        </h1>

        <p className="lede">
          Everyone here is a verified student at one campus. Sign in with your
          university email — nobody else ever sees it.
        </p>

        <SignInForm acceptedDomain={getAcceptedEmailDomain()} />
      </div>
    </main>
  );
}
