import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionPerson } from "@/src/services/auth";
import { ProfileForm } from "@/app/_components/ProfileForm";

export const dynamic = "force-dynamic";

export default async function Profile() {
  const person = await getSessionPerson(await headers());

  if (!person) {
    redirect("/");
  }

  return (
    <main className="page page--top">
      <div className="panel panel--wide">
        <p className="caption">Your profile</p>
        <h1>
          Who you are.
          <span className="after">What would rule you out.</span>
        </h1>
        <p className="lede">
          People are filtered on the hard limits and ranked on everything else,
          so the more honest this is, the better the people you are shown.
        </p>

        <ProfileForm
          initial={{
            housingStatus: person.housingStatus,
            budgetMin: person.budgetMin,
            budgetMax: person.budgetMax,
            areas: person.areas,
            moveInDate: person.moveInDate,
            tenancyLengthMonths: person.tenancyLengthMonths,
            selfDescription: person.selfDescription,
            profilePaused: person.profilePaused,
            publicFields: person.publicFields,
          }}
        />
      </div>
    </main>
  );
}
