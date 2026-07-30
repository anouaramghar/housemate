import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionPerson } from "@/src/services/auth";

export const dynamic = "force-dynamic";

export default async function Welcome() {
  const person = await getSessionPerson(await headers());

  if (!person) {
    redirect("/");
  }

  return (
    <main className="page">
      <div className="panel">
        <div className="slots" aria-hidden="true">
          <span className="slot" />
          <span className="slot" />
          <span className="slot" />
          <span className="slot slot--open" />
        </div>
        <p className="caption">Verified student</p>

        <h1>
          You are in.
          <span className="after">Now find your people.</span>
        </h1>

        <p className="lede">
          Your campus email is verified, so every person you meet here is a
          student at your university. You can browse people, or start a
          household of your own — you do not need a place, and you do not need
          to bring anyone with you.
        </p>

        <p className="data">person · {person.id}</p>
      </div>
    </main>
  );
}
