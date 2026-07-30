# Legal basis for the gender preference filter — findings

Research ticket: [02-fair-housing-gender-filter](../issues/02-fair-housing-gender-filter.md)
Parent map: [Student Housemate Marketplace](../map.md)
Date: 2026-07-30

> **This is not legal advice.** It is a survey of what primary sources say, assembled so a product
> decision can be made with open eyes. Nothing here has been checked by a qualified lawyer in any
> jurisdiction. Before launch in a chosen city, this must be run past counsel admitted there. Where
> I could only find secondary commentary, I say so and mark confidence lower.

---

## Verdict

**The "roommate exemption" is real but much narrower and much more jurisdiction-dependent than the
shorthand suggests — and, critically, it is not one exemption. It is at least four different legal
mechanisms that happen to produce similar outcomes, and they do not all protect the same party.**

The single most important finding: **the risk to the individual student choosing a housemate and the
risk to the platform offering a structured gender filter are different risks, and the second is
worse.** Roommates.com lost its CDA §230 immunity in 2008 *specifically because* it made
discrimination a required structured form field rather than free text. It later won on the merits —
but only because the Ninth Circuit held the Fair Housing Act does not reach shared living units at
all. Outside the Ninth Circuit, that second holding is not law, and the first one still is.

Defensible, with conditions:

| Target campus in… | Gender filter defensible? | Load-bearing condition |
|---|---|---|
| **US, Ninth Circuit** (CA, WA, OR, NV, AZ, ID, MT, AK, HI) | **Yes — strongest case anywhere** | Binding circuit precedent squarely on these facts. California adds an express statutory carve-out for single-sex *advertising* in shared living. |
| **US, any other circuit** | **Genuinely unsettled** | No circuit split, because no other circuit has ruled. A district court elsewhere is free to disagree, and the §3604(c) advertising ban is the exposed flank. |
| **New York City** | **Weakest US position** | NYC's exemption is conditioned on the accommodation *not having been publicly advertised or offered to the general public.* A public marketplace listing is exactly that. |
| **UK** | **Yes, but only in a specific shape** | The small-premises exception in Sch. 5 para. 3 EqA 2010 permits preference on everything *except race* — but only where a resident shares. Race must never be filterable. |
| **Ireland** | **Probably yes for the choice, riskier for the listing** | Equal Status Act s.6(2)(d)/(e) exempt the choice; s.12 bans discriminatory advertising with no matching carve-out. |
| **Germany** | **Probably yes** | AGG §19(5) excludes relationships of "besonderes Nähe- oder Vertrauensverhältnis" — housemate selection is the paradigm case. |
| **EU generally (as a platform)** | **Weakest position of all** | Directive 2004/113/EC Art. 3(2) says freedom to choose a contractual partner is preserved *only so long as the choice is not based on sex.* That is a bespoke anti-carve-out aimed at exactly this. |

**Constraint 10 on the map does not need reopening — but it needs a qualifier.** The concept
survives. What does not survive is "a hard structured gender filter, offered identically in every
market." The filter needs to be jurisdiction-configurable, and its *shape* (free text vs. structured
field, soft rank vs. hard exclude, private vs. published) matters more legally than its existence.

---

## Part 1 — What *Roommates.com* actually held

Two opinions, two completely different questions. Conflating them is the most common error in
commentary on this case, and the ticket is right to flag it.

### 1a. The 2008 en banc opinion — CDA §230 only

*Fair Housing Council of San Fernando Valley v. Roommates.com, LLC*, 521 F.3d 1157 (9th Cir. 2008)
(en banc) — [opinion PDF, ca9.uscourts.gov](https://cdn.ca9.uscourts.gov/datastore/opinions/2008/04/02/0456916.pdf)

This decided **immunity, not liability**. The court was explicit that it was not reaching whether the
FHA was actually violated: *"we leave those issues for the district court on remand. Rather, we
examine the scope of plaintiffs' substantive claims only insofar as necessary to determine whether
section 230 immunity applies."*

What lost Roommates.com its immunity:

- **The structured registration questions.** Roommate was an *information content provider* for them
  because it *"created the questions and choice of answers, and designed its website registration
  process around them."* The court: *"By requiring subscribers to provide the information as a
  condition of accessing its service, and by providing a limited set of pre-populated answers,
  Roommate becomes much more than a passive transmitter."*
- **The search and notification systems.** Roommate *"designed its search and email systems to limit
  the listings available to subscribers based on sex, sexual orientation and presence of children."*
  No immunity, because *"Roommate designed its system to use allegedly unlawful criteria so as to
  limit the results of each search."*

The governing test: a website helps *develop* unlawful content *"if it contributes materially to the
alleged illegality of the conduct."* Neutral tools alone are not enough.

**By contrast, the free-text "Additional Comments" box retained §230 immunity.** The court treated it
as categorically different from the mandatory structured questions — the user wrote it unprompted,
and Roommate merely published it.

> **This holding was never overturned.** The 2012 opinion resolved the merits; it did not disturb the
> §230 analysis. It remains binding Ninth Circuit law on platform liability and has since been
> extended — see Part 2.

### 1b. The 2012 opinion — FHA applicability

*Fair Housing Council of San Fernando Valley v. Roommate.com, LLC*, 666 F.3d 1216 (9th Cir. 2012) —
[opinion PDF, ca9.uscourts.gov](https://cdn.ca9.uscourts.gov/datastore/opinions/2012/02/02/09-55272.pdf)
· [FindLaw mirror](https://caselaw.findlaw.com/court/us-9th-circuit/1592538.html)

On remand the district court had found violations and enjoined Roommate. The Ninth Circuit vacated.

The holding rests on **two moves stacked together**:

1. **Statutory reading of "dwelling."** The FHA defines "dwelling" as *"any building, structure, or
   portion thereof which is occupied as, or designed or intended for occupancy as, a residence by one
   or more families"* (42 U.S.C. §3602(b)). The court: *"It makes practical sense to interpret
   'dwelling' as an independent living unit and stop the FHA at the front door."* It mocked the
   alternative by asking whether a bedroom, a shared bedroom, or *"a bottom bunk and half an armoire"*
   would each be separate dwellings.

2. **Constitutional avoidance.** *"Because the FHA can reasonably be read either to include or exclude
   shared living arrangements, we can and must choose the construction that avoids raising
   constitutional concerns."* The concern is the right of intimate association: *"The roommate
   relationship easily qualifies: People generally have very few roommates; they are selective in
   choosing roommates; and non-roommates are excluded from the critical aspects of the
   relationship."* And: *"Government regulation of an individual's ability to pick a roommate thus
   intrudes into the home, which 'is entitled to special protection as the center of the private lives
   of our people.'"*

Result: *"Because precluding individuals from selecting roommates based on their sex, sexual
orientation and familial status raises substantial constitutional concerns, we interpret the FHA and
FEHA as not applying to the sharing of living units."*

**And — directly answering the ticket's question 4 — the court disposed of the advertising theory too,
but by a route that does not generalise:** *"Therefore, we hold that Roommate's prompting, sorting and
publishing of information to facilitate roommate selection is not forbidden by the FHA or FEHA."*
The publishing survived **not because an exemption covered it**, but because there was no "dwelling"
in the first place, so §3604(c) — which by its terms applies only *"with respect to the sale or rental
of a dwelling"* — had nothing to attach to.

That distinction is load-bearing. **The 2012 result is only transportable to a jurisdiction that
adopts the same "dwelling" reading.** In a jurisdiction that does not, the advertising provision comes
back on its own terms — see Part 3.

### 1c. How broadly has it been applied since?

- **It binds the Ninth Circuit.** That is CA, WA, OR, NV, AZ, ID, MT, AK, HI, plus territories.
- **No other federal circuit has ruled on it.** I found no contrary appellate authority — and equally
  no supporting authority. There is no circuit split because there is no second data point.
  *Confidence: moderate.* This is the limit of what free search can establish; a Westlaw/Lexis
  citator run would be needed to be sure, and I could not run one.
- **HUD has not adopted the "not a dwelling" reading.** Its live regulation on discriminatory
  advertising, [24 CFR §100.75](https://www.law.cornell.edu/cfr/text/24/100.75), contains **no**
  exception for shared living quarters, roommates, or single-sex shared housing. Its only nod in that
  direction is a cross-reference in §100.75(d) to 24 CFR Part 109 — which HUD **rescinded effective
  1 May 1996**. The "shared living quarters" advertising carve-out that every real-estate compliance
  guide still repeats lives in that rescinded Part 109. I was not able to retrieve the original
  §109.20 text from a government host (Library of Congress and govinfo both blocked); the surviving
  copies are on fair-housing-advocacy sites.
  **This matters: the most widely cited basis for "you may advertise for a female roommate" under
  federal law is a regulation that has not existed for thirty years.** *Confidence: high on the
  rescission and on the absence from §100.75; moderate on the exact rescinded wording.*
- **HUD has declined to press a shared-housing case at least once.** In 2011 a Michigan woman was the
  subject of a fair-housing complaint over a "Christian Roommate Wanted" church noticeboard ad; HUD
  dismissed for no reasonable cause, reportedly saying it *"defers to Constitutional considerations."*
  *Confidence: low-moderate — reported only in press and advocacy coverage; I could not retrieve the
  HUD determination itself.*

---

## Part 2 — Platform vs. individual: the crux

**This is where the business risk actually sits, and the ticket's instinct is correct.**

The 2012 win came *after* Roommate.com had already lost the §230 fight and been enjoined by the
district court. It took four more years of litigation and a merits holding that only exists in one
circuit. A startup does not get to plan on that.

Three lines of authority say a platform is treated as a **co-author** of discrimination when it builds
the discriminatory axis into its own product:

1. **The 2008 en banc test itself** — structured, platform-authored questions and pre-populated
   answers make the platform an information content provider; free text does not.

2. ***Vargas v. Facebook*, 9th Cir. (21 June 2023)** — §230 did **not** immunise Meta against FHA/FEHA
   claims over its ad-targeting tools, because the challenge was to Facebook's *own conduct as a
   co-developer of content*, not to its publication of third-party content. Facebook had offered
   targeting options keyed to protected characteristics and auto-segmented users into those buckets.
   *This is the 2008 holding applied to a modern structured-targeting UI.*
   *Confidence: high on outcome and rationale; sourced from litigation-tracker and firm write-ups
   rather than the opinion text, which I could not retrieve — treat exact wording as unverified.*
   [ACLU case page](https://www.aclu.org/cases/vargas-v-facebook-inc)

3. **DOJ v. Meta Platforms (S.D.N.Y., settled June 2022)** — originating in a 2019 HUD charge of
   discrimination. Meta agreed to retire its "Special Ad Audience" tool for housing ads, submit to
   court-supervised algorithmic remedies, and pay a civil penalty. The theory was that the *platform's
   own delivery and targeting machinery* discriminated on FHA-protected characteristics including sex.
   [DOJ press release](https://www.justice.gov/archives/opa/pr/justice-department-secures-groundbreaking-settlement-agreement-meta-platforms-formerly-known)
   · [DOJ case page](https://www.justice.gov/crt/case/united-states-v-meta-platforms-inc-fka-facebook-inc-sdny)

**Synthesis.** The roommate exemption — wherever it exists — protects *the choice*. Nothing in it
protects a platform that manufactures the choice into a schema. The platform's defence is entirely
derivative: it works only if the underlying conduct is lawful in that jurisdiction (which is what the
2012 court said in terms — "As the underlying conduct is not unlawful, Roommate's facilitation … does
not violate the FHA"). **The moment the underlying conduct is not clearly exempt, the platform is the
easiest defendant in the chain, not the hardest.** It is centralised, it is a business, it has assets,
and it authored the field.

---

## Part 3 — Mrs. Murphy (§3603(b)) and the advertising trap (§3604(c))

**Short answer: Mrs. Murphy does not help this product at all, and §3604(c) is a live hazard.**

### The exemption does not fit the fact pattern

[42 U.S.C. §3603(b)](https://www.law.cornell.edu/uscode/text/42/3603) exempts only:

- **(b)(1)** *"any single-family house sold or rented by an owner"*, capped at three such houses, and
  — critically — only if sold or rented *"(A) without the use in any manner of the sales or rental
  facilities or the sales or rental services of any real estate broker, agent, or salesman, or of such
  facilities or services of any person in the business of selling or renting dwellings"* and
  *"(B) without the publication, posting or mailing … of any advertisement or written notice in
  violation of section 3604(c)."*
- **(b)(2)** *"rooms or units in dwellings containing living quarters occupied or intended to be
  occupied by no more than four families living independently of each other, if the owner actually
  maintains and occupies one of such living quarters as his residence."*

Both require an **owner**. Students in a shared rental are tenants. Neither limb reaches "four
undergraduates who are joint tenants choosing a fifth." And (b)(1) independently collapses if a
"person in the business of … renting dwellings" is used — which is a live question for a marketplace
even one that takes no money.

### The §3604(c) trap

This is the point the ticket asks about, and it is **settled and unambiguous on the statutory text**.

§3603(b) opens: *"Nothing in section 3604 of this title **(other than subsection (c))** shall apply
to—"*. The Mrs. Murphy exemption exempts you from §3604(a), (b), (d) and (e) — **but never from
§3604(c), the advertising ban.**

HUD's own regulation says the same: [24 CFR §100.10(c)](https://www.law.cornell.edu/cfr/text/24/100.10)
— *"Nothing in this part, **other than the prohibitions against discriminatory advertising**, applies
to"* the exempt single-family and small owner-occupied categories.

Confirmed judicially in ***United States v. Hunter***, 459 F.2d 205 (4th Cir. 1972): §3603(b)
establishes an exemption only from §3604(a), (b) and (d); while an exempt owner *"is free to indulge
his discriminatory preferences in selling or renting that dwelling, neither the Act nor the
Constitution gives him a right to publicize his intent to so discriminate."*
[Justia](https://law.justia.com/cases/federal/appellate-courts/F2/459/205/381727/) ·
[CourtListener](https://www.courtlistener.com/opinion/303132/united-states-v-bill-r-hunter-dba-the-courier/)

Note the precise scope of the trap: §3604's preamble reads *"As made applicable by section 3603 of
this title and except as exempted by sections 3603(b) and 3607 of this title"* — so the **§3607**
exemptions (religious organisations, private clubs, housing for older persons) *do* reach §3604(c).
Only the Mrs. Murphy exemptions are carved out of it.

**So, answering question 4 directly: yes — under federal law, stating a preference is treated
differently from acting on one, and more harshly.** You can lawfully refuse and still be liable for
having said why.

The **only** federal escape from §3604(c) for shared housing is the Ninth Circuit's "no dwelling"
reading. It is not an exemption; it is a jurisdictional gap. Outside the Ninth Circuit, a *published
listing* saying "female housemate wanted" is the most exposed artefact this product could generate —
more exposed than the filter itself.

---

## Part 4 — Non-US jurisdictions

### United Kingdom

**The UK carve-out is broader than the US one on protected characteristics, and narrower on who
qualifies.**

**Equality Act 2010, Schedule 5, paragraph 3 — "small premises"**
([legislation.gov.uk](https://www.legislation.gov.uk/ukpga/2010/15/schedule/5/paragraph/3))

Applies to *"anything done by a person in relation to the disposal, occupation or management of part
of small premises"* where that person or a relative resides in another part and shares parts (other
than storage and access) with other residents. Premises are "small" if they accommodate at most two
other households, or provide accommodation for not more than six persons besides the resident and
their household.

Effect — para. 3(2): ***"Sections 33(1), 34(1) and 35(1) apply only in so far as they relate to
race."***

Read that carefully: within the exception, the prohibitions on disposal/permission/management
discrimination **survive only for race**. Sex, religion, sexual orientation, disability, age and the
rest fall away. **The UK carve-out is the mirror image of what people assume: race is the one thing
you may never filter on, and sex is comfortably within the exception.**

This matches how the UK market actually operates. SpareRoom's own published policy states that a
resident landlord *"can have a preference on your new flatmate, but still not when it comes to race"*,
requires the preference to be explained *"clearly and respectfully"*, gives *"Female preferred as
other housemates are female"* as acceptable and *"No men allowed"* as unacceptable, and reserves the
right to strip unexplained preferences from an ad.
[SpareRoom discrimination policy](https://www.spareroom.co.uk/content/default/discrimination/)
*Confidence: this is industry practice, not law — but it is a decade-plus of unchallenged operation
by the dominant UK flatshare platform, which is meaningful evidence about enforcement reality.*

**Equality Act 2010, Schedule 23, paragraph 3 — "communal accommodation"**
([legislation.gov.uk](https://www.legislation.gov.uk/ukpga/2010/15/schedule/23/paragraph/3))

*"A person does not contravene this Act, so far as relating to sex discrimination or gender
reassignment discrimination, only because of anything done in relation to — (a) the admission of
persons to communal accommodation; (b) the provision of a benefit, facility or service linked to the
accommodation."* Communal accommodation is defined as *"residential accommodation which includes
dormitories or other shared sleeping accommodation which for reasons of privacy should be used only
by persons of the same sex."* Conditions: it must be *"managed in a way which is as fair as possible
to both men and women"*, and for gender reassignment the conduct must be *"a proportionate means of
achieving a legitimate aim."*

This is the provision that legitimises single-sex halls of residence. It is a weaker fit for a private
flatshare (shared *sleeping* accommodation is the trigger) but is the right hook for any
university-partnered dormitory product.

**Where the risk actually sits in the UK.** Part 4 (premises) governs *disposal and management of
premises*. A matching platform disposes of nothing — so its own exposure runs through **Part 3
(services, s.29)** as a service provider, and through **s.111 (instructing, causing or inducing
contraventions)** and **s.112 (aiding contraventions)**. Both s.111 and s.112 require an underlying
contravention by someone. If the students' choice is inside Sch. 5 para. 3, there is no contravention
to aid — the platform's derivative exposure collapses with it. **That chain holds only for the
resident-sharer scenario.** A student who *has not yet moved in* and is assembling a household from
scratch may not have a resident to anchor para. 3 — see Uncertainties.

Note also the EHRC's new statutory Code of Practice for services (laid before Parliament 21 May 2026)
**expressly does not cover Part 4 premises**: *"This Code does not deal with Part 4 of the Act."*
[GOV.UK draft Code](https://www.gov.uk/government/publications/equality-act-2010-draft-code-of-practice-for-services-public-functions-and-associations-2026/equality-act-2010-draft-code-of-practice-for-services-public-functions-and-associations-2026)
So there is no current EHRC statutory guidance directly on flatshare selection — a real gap.

The same Code reflects **For Women Scotland Ltd v The Scottish Ministers** (UKSC 2025), confirming
"sex" in the EqA 2010 means biological sex. That has direct product consequences for how a gender
field handles trans and non-binary users in the UK. *Confidence: high that the case exists and says
this; I did not read the judgment.*

**Advertising in the UK.** The EqA 2010 contains **no direct analogue to §3604(c)** for premises.
EHRC's [guidance on discriminatory adverts](https://www.equalityhumanrights.com/guidance/guidance-discriminatory-adverts)
frames adverts as unlawful where they restrict *"jobs, goods, services or facilities"* — the framing
is employment and services, not premises. A discriminatory ad is generally treated as *evidence* of
discrimination, or as an unlawful instruction under s.111, rather than as a standalone offence. **This
is the single biggest structural difference from US law: in the UK, filtering and advertising are
broadly treated alike; in the US federal system they are deliberately treated differently.**
*Confidence: moderate — I could not retrieve the EHRC page directly (403); this rests on search
summaries plus the absence of any advertising provision in EqA Part 4.*

### European Union

**The EU is the worst jurisdiction for this feature, and the reason is a single sentence.**

**Directive 2004/113/EC** (equal treatment of men and women in access to and supply of goods and
services) — [text via legislation.gov.uk](https://www.legislation.gov.uk/eudr/2004/113)

- **Art. 3(1):** applies to *"all persons who provide goods and services, which are available to the
  public irrespective of the person concerned … and which are offered outside the area of private and
  family life and the transactions carried out in this context."*
- **Art. 3(2):** ***"This Directive does not prejudice the individual's freedom to choose a
  contractual partner as long as an individual's choice of contractual partner is not based on that
  person's sex."***
- **Art. 3(3):** *"This Directive shall not apply to the content of media and advertising nor to
  education."*
- **Recital 3:** *"While prohibiting discrimination, it is important to respect other fundamental
  rights and freedoms, including the protection of private and family life and transactions carried
  out in that context…"*

Art. 3(2) is a bespoke anti-carve-out. Every other protected ground gets freedom-of-contractual-partner
protection; **sex specifically does not.** A platform is a service provider *available to the public*
and is therefore squarely inside Art. 3(1) even if the individual student's choice is arguably inside
the private-and-family-life exclusion. The individual and the platform separate cleanly here, and the
platform lands on the wrong side.

Art. 3(3) may partially shield *listing text* (as "advertising content") while leaving the *filter*
exposed — the opposite of the US federal position. That inversion is worth internalising: **in the US
the published statement is the exposed part; in the EU the structured filter is.**
*Confidence: moderate on the Art. 3(3) reading — this is my inference from the text, not a holding I
found.*

**Race is separately and explicitly covered.** Directive 2000/43/EC Art. 3(1)(h) extends to access to
and supply of goods and services available to the public *including housing*. I could not retrieve the
verbatim text (legislation.gov.uk serves it as PDF only; EUR-Lex would not render). *Confidence:
moderate on wording, high on substance.* Practical upshot is the same as the UK: **race must never be
filterable, anywhere.**

**No horizontal directive.** The proposed Equal Treatment Directive (COM(2008)426), which would have
extended goods-and-services protection to religion, disability, age and sexual orientation, has been
blocked in Council since 2008. The Commission listed it for withdrawal in its 2025 Work Programme,
then reversed after protest in July 2025; adoption remains unlikely.
[European Parliament Legislative Train](https://www.europarl.europa.eu/legislative-train/theme-a-new-push-for-european-democracy/file-anti-discrimination-directive)
*Confidence: moderate — status from Parliament tracker plus advocacy reporting.*

### Ireland

**Equal Status Act 2000** ([irishstatutebook.ie](https://www.irishstatutebook.ie/eli/2000/act/8/enacted/en/print.html)
· [revised text, Law Reform Commission](https://revisedacts.lawreform.ie/eli/2000/act/8/revised/en/html))

- **s.6(1)** prohibits discrimination in disposing of premises, terminating tenancies, and *"providing
  accommodation or any services or amenities related to accommodation."*
- **s.6(2)(c)** disapplies s.6(1) to disposals or accommodation *"which is not available to the public
  generally or a section of the public."*
- **s.6(2)(d)** disapplies it to *"the provision of accommodation by a person in a part (other than a
  separate and self-contained part) of the person's home, or where the provision of the accommodation
  affects the person's private or family life or that of any other person residing in the home."*
- **s.6(2)(e)** permits *"the provision of accommodation to persons of one gender where embarrassment
  or infringement of privacy can reasonably be expected to result from the presence of a person of
  another gender."*
- **s.12** — *"A person shall not publish or display or cause to be published or displayed an
  advertisement which indicates an intention to engage in prohibited conduct or might reasonably be
  understood as indicating such an intention."*

Ireland is the closest structural analogue to US federal law: the *choice* is exempt (s.6(2)(d)/(e)),
the *advertisement* is separately banned (s.12). Whether s.12 is read as tracking the s.6(2) exemptions
(so that an exempt preference cannot be an "intention to engage in prohibited conduct") is the whole
question, and I found no authority resolving it. Note s.6(2)(c) — *"not available to the public
generally or a section of the public"* — is a poor fit for an open marketplace, which is precisely how
the NYC exemption fails too. *Confidence: high on statutory text, low on how s.12 interacts.*

### Germany

**Allgemeines Gleichbehandlungsgesetz (AGG) §19**
([gesetze-im-internet.de](https://www.gesetze-im-internet.de/agg/__19.html))

- **§19(5), sentence 1:** *"Die Vorschriften dieses Abschnitts finden keine Anwendung auf
  zivilrechtliche Schuldverhältnisse, bei denen ein besonderes Nähe- oder Vertrauensverhältnis der
  Parteien oder ihrer Angehörigen begründet wird."* — the anti-discrimination provisions do not apply
  to civil-law relationships establishing a special relationship of closeness or trust.
- **§19(5), sentence 2:** *"Bei Mietverhältnissen kann dies insbesondere der Fall sein, wenn die
  Parteien oder ihre Angehörigen Wohnraum auf demselben Grundstück nutzen."* — for tenancies this may
  particularly apply where the parties use residential space on the same property.
- **§19(5), sentence 3:** renting for non-temporary use is generally not a "Massengeschäft" under
  §19(1)(1) where the landlord lets no more than 50 units.
- **§19(2):** race and ethnic origin are prohibited grounds across a *wider* set of civil-law
  relationships than the other characteristics — again, race is the outlier that never gets exempted.
- **§19(3):** differential treatment in letting is permitted to create and maintain *"sozial stabiler
  Bewohnerstrukturen"* — socially stable resident structures. A genuinely unusual provision with no
  UK or US analogue.

A German *WG* (Wohngemeinschaft) selecting a flatmate is close to the paradigm case for §19(5). The
statute does not say what "besonderes Nähe- oder Vertrauensverhältnis" means; the standard commentary
is that it is unregulated and fact-specific. *Confidence: high on statutory text, moderate on
application to housemate selection specifically.*

---

## Part 5 — Student housing: is it treated differently?

**Sometimes, but never in a way that helps a private marketplace.**

- **US, Title IX.** [20 U.S.C. §1686](https://www.law.cornell.edu/uscode/text/20/1686) — nothing in
  Title IX shall be construed to prohibit an educational institution from *maintaining separate living
  facilities for the different sexes.* This is the authority for single-sex dorms. **It runs to
  educational institutions receiving federal funds, not to a marketplace**, and it is an interpretive
  provision within Title IX, not an FHA exemption.
- **US, FHA.** There is **no student-housing exemption in the FHA.** In *United States v. University
  of Nebraska at Kearney* (D. Neb. 2013) the court held university residential facilities *are*
  "dwellings" under the FHA, rejecting the argument that educational housing sits outside it and
  noting any such exemption would have to come from Congress or HUD.
  [DOJ memorandum](https://www.justice.gov/crt/about/hce/documents/unk_mem_4-19-13.pdf) ·
  [Civil Rights Litigation Clearinghouse](https://clearinghouse.net/case/15045/)
  Note the tension this creates with the Ninth Circuit's "an independent living unit … stop the FHA at
  the front door" reading — a dorm room is exactly the sub-unit the Ninth Circuit said was not a
  dwelling. That tension is unresolved.
- **UK.** Sch. 23 para. 3 (communal accommodation) is the student-halls provision, and it is a *sex
  and gender reassignment* exception specifically. Applies to dormitory-style shared sleeping
  accommodation, not obviously to a five-bed terraced house.
- **NY.** Exec. Law §296(5)(a) exempts *"the restriction of the rental of all rooms in a housing
  accommodation to individuals of the same sex"* — which is how single-sex student rooming houses
  operate.

**Net:** universities get a sex-based living-facilities allowance almost everywhere. A private
platform does not inherit it. If the product runs *through* a university partnership (map constraint
13), that is worth revisiting with counsel — the partnership might bring the product inside the
institution's own allowance, or might just make the university a co-defendant. I found nothing
resolving this. **Genuinely open.**

---

## Part 6 — US state law where it diverges materially

### California — the most favourable US jurisdiction, by statute

[Cal. Gov. Code §12927](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12927)
defines "discrimination" under FEHA to **exclude**:

- **§12927(c)(2)(A):** *"Refusal to rent or lease a portion of an owner-occupied single-family house
  to a person as a roomer or boarder living within the household, **provided that no more than one
  roomer or boarder is to live within the household**, and the owner complies with subdivision (c) of
  Section 12955, which prohibits discriminatory notices, statements, and advertisements."*
- **§12927(c)(2)(B):** *"Where the sharing of living areas in a single dwelling unit is involved, the
  use of words stating or tending to imply that the housing being advertised is available only to
  persons of one sex."*

Two things follow, and they cut opposite ways:

1. **(B) is a gift.** California has an **express statutory carve-out permitting single-sex
   *advertising* for shared living areas.** This is the only jurisdiction surveyed with a clean,
   on-point, positive statutory answer for the advertising question. It stacks on top of the Ninth
   Circuit holding.
2. **(A) is nearly useless.** One roomer, owner-occupied, and it *keeps* the advertising ban. It does
   not describe a student household. But note that (A) and (B) are independent — (B) does not depend
   on (A).

Also live in California: the **Unruh Civil Rights Act** (Civ. Code §51) applies to "business
establishments" and covers sex, gender, gender identity and sexual orientation. A platform is a
business establishment. The 2012 Roommate.com decision addressed FEHA, not Unruh (and a concurrence
disputed the FEHA analysis). *Confidence: low-moderate — I did not find authority applying Unruh to a
housemate-matching platform. Flag for counsel.*

### New York State — surprisingly permissive

[NY Exec. Law §296(5)(a)](https://www.nysenate.gov/legislation/laws/EXC/296) ·
[FindLaw](https://codes.findlaw.com/ny/executive-law/exc-sect-296/)

§296(5)(a) prohibits refusal to rent, discriminatory terms, **and** — at subparagraph (3) — printing
or circulating *"any statement, advertisement or publication, or … any form of application … or …
any record or inquiry"* expressing *"any limitation, specification or discrimination"* on protected
grounds including sex and gender identity or expression.

**But the exemptions disapply the whole of paragraph (a), advertising included**, for:

1. rental in a building with not more than two families living independently, owner resident in one;
2. ***"the restriction of the rental of all rooms in a housing accommodation to individuals of the
   same sex"***;
3. ***"the rental of a room or rooms in a housing accommodation, if such rental is by the occupant of
   the housing accommodation** or by the owner of the housing accommodation and the owner resides in
   such housing accommodation."*

Exemption (2) is an **express same-sex exemption**. Exemption (3) reaches **rental by the occupant** —
i.e. an existing student tenant letting a room to a housemate, no ownership required. Together these
are a better fit for this product than anything in federal law.

*Confidence: high on substance, moderate on exact subdivision numbering — sources rendered the
paragraph structure inconsistently and I could not retrieve a clean official text (dhr.ny.gov serves a
scanned PDF; Justia and Cornell returned 403). Verify numbering before relying on it.*

### New York City — the problem case

[NYC Admin. Code §8-107(5)](https://nycadmincode.readthedocs.io/t08/c01/)

§8-107(5)(a) bans declaring, printing or circulating any statement or advertisement expressing
discrimination as to *"race, creed, color, national origin, gender, age, disability, sexual
orientation, marital status, partnership status, or alienage or citizenship status."*

The owner-occupied two-family exemption is conditioned on the accommodation *"**not** having been
publicly advertised, listed, or otherwise offered to the general public."*

**A public housemate marketplace is, definitionally, offering to the general public.** That condition
appears designed to prevent exactly the thing this product does. There is a separate exemption for
rental of rooms by the occupant/owner residing there; my two sources disagreed on whether the
"not publicly advertised" condition attaches to that one as well. **Resolve this before considering a
NYC campus.** *Confidence: high that the condition exists on the two-family exemption; low on whether
it reaches the room-rental exemption.*

Also note NYC's list omits "sex" and uses "gender" — which in the NYC HRL is defined to include gender
identity and expression. A gender filter in NYC is a filter on a protected characteristic with
essentially no room to move.

---

## What is SETTLED

1. **§3603(b) (Mrs. Murphy) does not exempt anyone from §3604(c) (advertising).** Statutory text
   ("other than subsection (c)"), HUD's own regulation (24 CFR §100.10(c)), and *US v. Hunter*.
2. **Mrs. Murphy does not fit this product regardless** — it requires an owner-occupier. Students are
   tenants.
3. **The 2008 en banc holding is about CDA §230 only, is still good law, and turns on structure:**
   platform-authored required questions with pre-populated answers → no immunity; user-written free
   text → immunity. The test is *material contribution to the alleged illegality.*
4. **The 2012 holding is about FHA/FEHA applicability**, rests on "dwelling" plus constitutional
   avoidance, and is **binding only in the Ninth Circuit.**
5. **In the Ninth Circuit, a housemate gender filter — including its publication — is lawful under the
   FHA and FEHA.** The court said so in terms.
6. **HUD's live regulations contain no shared-living or roommate exception to the advertising ban.**
   The famous "female roommate wanted is fine" rule traces to 24 CFR Part 109, rescinded in 1996.
7. **US student housing has no FHA exemption; dorms are dwellings.** Title IX §1686 lets *institutions*
   run single-sex facilities; it does not travel to a marketplace.
8. **UK Sch. 5 para. 3: within the small-premises exception, sex is permissible and race is not.**
9. **UK Sch. 23 para. 3 permits sex and gender-reassignment distinctions in communal accommodation**,
   subject to fairness and (for gender reassignment) proportionality.
10. **EU Directive 2004/113/EC Art. 3(2) withholds contractual-partner freedom precisely where the
    choice is based on sex**, and Art. 3(1) catches public-facing service providers.
11. **Germany AGG §19(5) and Ireland ESA s.6(2)(d)/(e) exempt the personal choice.**
12. **California §12927(c)(2)(B) expressly permits single-sex advertising for shared living areas.**
13. **New York State §296(5)(a) expressly exempts same-sex room restriction and rental-by-the-occupant,
    and the exemption reaches the advertising provision.**
14. **Race is the one characteristic no surveyed jurisdiction exempts.** US, UK, EU, Germany, Ireland —
    all draw the line there and only there.
15. **Platforms are being held liable for their own structured targeting machinery** — *Vargas v.
    Facebook*; DOJ v. Meta.

## What is GENUINELY UNCERTAIN

1. **Whether the 2012 "not a dwelling" holding travels outside the Ninth Circuit.** No circuit split
   exists because no other circuit has ruled. A district court in the Second, Fifth or Eleventh
   Circuit is not bound and might well read "dwelling" naturally. **This is the biggest single
   unknown, and it is fully determined by campus choice.**
2. **Whether the platform's derivative defence survives where the underlying conduct is exempt but not
   *held* lawful.** The Ninth Circuit reasoned: underlying conduct lawful → facilitation lawful. That
   chain is untested where the underlying conduct is merely *carved out of a statute* (UK Sch. 5, NY
   §296(5)) rather than *outside the statute's reach*. An exemption that protects the individual does
   not automatically protect a business that industrialises the exempt act.
3. **Whether a forming household of not-yet-resident students fits exemptions written for a resident
   landlord and a lodger.** UK Sch. 5 para. 3 requires someone who *"resides, and intends to continue
   to reside"* in the premises. NY exemption (3) requires *"the occupant"*. Germany §19(5) sentence 2
   points to parties *using* space on the same property. **The map's "needs a place" persona — people
   forming a household from scratch with no incumbent resident — may fall outside every one of these.**
   That is a real gap that maps directly onto a core product primitive.
4. **Whether "sex" includes gender identity for these purposes, and how the filter should treat trans
   and non-binary users.** This is actively moving in opposite directions: HUD published a proposed
   rule on 28 April 2026 ("Equal Access to Housing in HUD Programs Revisions") to strip "gender
   identity" and "sexual orientation" from its regulations and replace them with "sex", pursuant to a
   January 2025 executive order; comments closed 29 June 2026 and it is not final as of today. The UK
   Supreme Court in *For Women Scotland* held "sex" in the EqA means biological sex. Several US states
   and NYC protect gender identity expressly and independently of HUD. **A single global gender field
   cannot be correct in all of these at once.**
   [Federal Register listing](https://www.federalregister.gov/documents/2026/04/28/2026-08244/equal-access-to-housing-in-hud-programs-revisions)
   *Confidence: moderate — federalregister.gov blocked direct fetch; status from search summaries and
   housing-policy organisations.*
5. **Whether the NYC room-rental exemption carries the "not publicly advertised" condition.** Sources
   conflict.
6. **Whether Ireland's s.12 advertising ban tracks the s.6(2) exemptions.** No authority found.
7. **Whether the Unruh Act reaches a housemate-matching platform in California.** Not addressed by the
   2012 case.
8. **Whether a university partnership changes the analysis** — bringing the product inside an
   institution's own single-sex-facilities allowance, or simply adding a co-defendant. Nothing found.
9. **Whether "free for students" (map constraint 11) helps.** The commercial-transaction hooks in
   several regimes (AGG "Massengeschäft"; EU "goods and services"; FHA "person in the business of
   selling or renting dwellings") may read differently for a free service. Untested and I found no
   authority. **Do not assume it helps.**

---

## Design constraints that follow

Ordered by how directly the law implies them.

1. **Free text beats a structured field — and this comes straight from the case that lost.** The 2008
   en banc drew the line exactly here: platform-authored questions with pre-populated answers destroy
   §230 immunity; the user's own unprompted free text keeps it. If gender preference is expressed as
   the user's own words in a profile, the platform is a publisher. If it is a dropdown the platform
   designed, the platform is a co-author. **This is the highest-leverage design decision in the
   ticket.**

2. **If it must be structured, make it *self-descriptive*, not *exclusionary*.** "This household is
   all women" is a fact about the poster. "Show me only women" is a filter the platform authored and
   executed. Ranking by declared facts the user volunteered is a materially weaker target than
   executing an exclusion the platform built. (Not a safe harbour — *Vargas* shows algorithmic
   segmentation on declared attributes is still attackable — but a better position.)

3. **Soft-rank, don't hard-exclude.** The 2008 court's language about the search system was that it
   *"limit[ed] the listings available to subscribers"*. A compatibility weighting that surfaces
   better matches without removing anyone from the corpus is a different artefact from a filter that
   makes people invisible. This also fits map constraint 3 (hard filters → compatibility score) — the
   gender preference should live on the *score* side of that pipeline, not the *hard filter* side.
   **This is a concrete amendment to constraint 3 worth making explicit.**

4. **Never required.** "By requiring subscribers to provide the information as a condition of
   accessing its service" is the first clause of the sentence that cost Roommates.com its immunity.
   Optional, skippable, and with no penalty for skipping.

5. **Race must never be filterable, rankable, collectable, or inferable — anywhere.** This is the one
   line every surveyed jurisdiction draws and none of them exempts. Constraint 10 already says this;
   it should be restated as an absolute rather than a default. Watch for proxies: nationality,
   language, dietary preference, "cultural fit" free text.

6. **Require a stated reason for the preference, and keep it positively framed.** The SpareRoom model
   ("Female preferred as other housemates are female" ✓ / "No men allowed" ✗) is a decade of
   unchallenged UK practice, and it converts an exclusion into an explanation. It also produces the
   contemporaneous record you would want if challenged.

7. **Keep the preference private where advertising bans have no exemption; publish it only where they
   do.** The US federal split between §3604(a) conduct and §3604(c) speech means the *listing text*
   is the more exposed artefact outside the Ninth Circuit. Architecturally: a preference used to rank
   a private feed ≠ a preference rendered into a public listing. Build these as separable, because
   California and New York permit publication while federal law outside the Ninth Circuit may not,
   and the EU inverts the whole thing (Art. 3(3) shields advertising content, Art. 3(1) catches the
   filter).

8. **Build it as jurisdiction config, not as a hardcoded field.** Campus is unchosen (ticket 06). The
   correct shape differs between the Ninth Circuit, NYC, the UK and the EU, and HUD's position on
   gender identity is mid-flight. A single boolean `genderFilterEnabled` is not enough; the *shape*
   (structured vs. free text, rank vs. exclude, private vs. published, which values exist) needs to
   vary. **Cheap to design in now, expensive to retrofit.**

9. **Decide trans and non-binary handling explicitly and early.** A binary gender field is both a
   legal exposure and a product failure. Note that a self-declared identity field the user writes is,
   again, better positioned than a platform-authored binary enum — the design constraints converge.

10. **Do not monetise the filter.** Putting the gender preference behind a paywall or a promoted
    listing converts it from a facility into a service the platform *supplies for consideration*,
    which strengthens every "the platform is the discriminator" argument. Relevant to ticket 11.

11. **Retain the reason-for-preference text and the filter's provenance.** If a complaint lands, the
    defence is "the user chose this and said why", and that needs evidence.

---

## Answering the ticket's questions directly

| Question | Answer |
|---|---|
| Does the roommate exemption hold? | **In the Ninth Circuit, yes and squarely. Elsewhere in the US, unresolved. In the UK, yes but only for resident-sharers and only excluding race. In the EU, weakest — Art. 3(2) is aimed at exactly this.** |
| Does it protect the platform or only the chooser? | **Only the chooser, directly. The platform's protection is entirely derivative and collapses if the underlying choice isn't exempt in that jurisdiction. And §230 immunity — a separate shield — is forfeited by making the preference a structured platform-authored field.** |
| Mrs. Murphy / §3603(b)? | **No help. Requires owner-occupancy, which students don't have — and it expressly does not exempt advertising.** |
| Is advertising treated differently from private filtering? | **Yes, and asymmetrically by jurisdiction. US federal: advertising is *harder* to exempt (§3604(c) survives Mrs. Murphy). EU: advertising content is *excluded* from the directive while the filter is not. UK: broadly treated alike. California and New York expressly permit single-sex shared-living advertising.** |
| Student housing treated differently? | **Yes for institutions (Title IX §1686; UK Sch. 23 para. 3; NY §296(5)(a)(ii)); no for private marketplaces. Dorms are "dwellings" under the FHA.** |
| Does constraint 10 need reopening? | **No — but it needs a qualifier: the filter's *shape* must be jurisdiction-configurable, race must be an absolute never, and the gender preference belongs on the compatibility-score side of the matching pipeline rather than the hard-filter side.** |

---

## Sources

**Primary — US federal**
- [42 U.S.C. §3603 (exemptions)](https://www.law.cornell.edu/uscode/text/42/3603) — Cornell LII
- [42 U.S.C. §3604 (prohibitions, incl. (c) advertising)](https://www.law.cornell.edu/uscode/text/42/3604) — Cornell LII
- [24 CFR §100.10 (exemptions; advertising carve-back)](https://www.law.cornell.edu/cfr/text/24/100.10)
- [24 CFR §100.75 (discriminatory advertisements)](https://www.law.cornell.edu/cfr/text/24/100.75)
- [20 U.S.C. §1686 (Title IX, living facilities)](https://www.law.cornell.edu/uscode/text/20/1686)
- [*Fair Housing Council v. Roommates.com*, 521 F.3d 1157 (9th Cir. 2008) (en banc) — opinion PDF](https://cdn.ca9.uscourts.gov/datastore/opinions/2008/04/02/0456916.pdf)
- [*Fair Housing Council v. Roommate.com*, 666 F.3d 1216 (9th Cir. 2012) — opinion PDF](https://cdn.ca9.uscourts.gov/datastore/opinions/2012/02/02/09-55272.pdf) · [FindLaw mirror](https://caselaw.findlaw.com/court/us-9th-circuit/1592538.html)
- [*United States v. Hunter*, 459 F.2d 205 (4th Cir. 1972)](https://law.justia.com/cases/federal/appellate-courts/F2/459/205/381727/) · [CourtListener](https://www.courtlistener.com/opinion/303132/united-states-v-bill-r-hunter-dba-the-courier/)
- [DOJ press release — Meta settlement (June 2022)](https://www.justice.gov/archives/opa/pr/justice-department-secures-groundbreaking-settlement-agreement-meta-platforms-formerly-known) · [DOJ case page](https://www.justice.gov/crt/case/united-states-v-meta-platforms-inc-fka-facebook-inc-sdny)
- [DOJ memorandum, *US v. University of Nebraska at Kearney*](https://www.justice.gov/crt/about/hce/documents/unk_mem_4-19-13.pdf)
- [HUD proposed rule, "Equal Access to Housing in HUD Programs Revisions" (28 Apr 2026)](https://www.federalregister.gov/documents/2026/04/28/2026-08244/equal-access-to-housing-in-hud-programs-revisions) — *not retrievable directly; listing only*

**Primary — US state**
- [Cal. Gov. Code §12927](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12927)
- [NY Exec. Law §296](https://www.nysenate.gov/legislation/laws/EXC/296) · [FindLaw](https://codes.findlaw.com/ny/executive-law/exc-sect-296/)
- [NYC Admin. Code §8-107](https://nycadmincode.readthedocs.io/t08/c01/)

**Primary — UK**
- [Equality Act 2010, Sch. 5 para. 3 (small premises)](https://www.legislation.gov.uk/ukpga/2010/15/schedule/5/paragraph/3) · [Sch. 5 in full](https://www.legislation.gov.uk/ukpga/2010/15/schedule/5)
- [Equality Act 2010, Sch. 23 para. 3 (communal accommodation)](https://www.legislation.gov.uk/ukpga/2010/15/schedule/23/paragraph/3)
- [Equality Act 2010, Part 4 (Premises), ss. 32–38](https://www.legislation.gov.uk/ukpga/2010/15/part/4)
- [EHRC draft Code of Practice for services, public functions and associations (2026), GOV.UK](https://www.gov.uk/government/publications/equality-act-2010-draft-code-of-practice-for-services-public-functions-and-associations-2026/equality-act-2010-draft-code-of-practice-for-services-public-functions-and-associations-2026)
- [EHRC guidance on discriminatory adverts](https://www.equalityhumanrights.com/guidance/guidance-discriminatory-adverts) — *403 on fetch; via search summary*

**Primary — EU / Ireland / Germany**
- [Council Directive 2004/113/EC (gender, goods and services)](https://www.legislation.gov.uk/eudr/2004/113)
- [Council Directive 2000/43/EC (race)](https://www.legislation.gov.uk/eudr/2000/43) — *PDF only; text not verified verbatim*
- [European Parliament Legislative Train — anti-discrimination (horizontal) directive](https://www.europarl.europa.eu/legislative-train/theme-a-new-push-for-european-democracy/file-anti-discrimination-directive)
- [Equal Status Act 2000 (Ireland), s.6](https://www.irishstatutebook.ie/eli/2000/act/8/section/6/enacted/en/html) · [revised text](https://revisedacts.lawreform.ie/eli/2000/act/8/revised/en/html)
- [AGG §19 (Germany), gesetze-im-internet.de](https://www.gesetze-im-internet.de/agg/__19.html)

**Secondary — flagged as such, lower confidence**
- [SpareRoom, "Equal opportunities and discrimination in flatsharing"](https://www.spareroom.co.uk/content/default/discrimination/) — industry practice, not law
- [ACLU case page, *Vargas v. Facebook*](https://www.aclu.org/cases/vargas-v-facebook-inc)
- [Eric Goldman, "Uh-Oh, the Ninth Circuit Is Messing Again With Its Roommates Ruling — Vargas v. Facebook"](https://blog.ericgoldman.org/archives/2023/06/uh-oh-the-ninth-circuit-is-messing-again-with-its-roommates-ruling-vargas-v-facebook.htm)
- [G.S. Hans, "Revisiting Roommates.com", 36 Berkeley Tech. L.J.](https://btlj.org/wp-content/uploads/2023/01/0009-36-3-Hans_Web.pdf)
- [Civil Rights Litigation Clearinghouse, *US v. UNK*](https://clearinghouse.net/case/15045/)
- [Rescinded 24 CFR Part 109, hosted copy](https://www.fhcci.org/wp-content/uploads/2018/06/HUD-Part-109-Fair-Housing-Advertising-Rescinded.pdf) — *PDF text not machine-readable in this session*

**Sources I could not retrieve** (noted for honesty about coverage): eCFR and federalregister.gov (redirect block), uscode.house.gov (connection refused), law.justia.com and Cornell §296 (403), Google Scholar (login wall), EUR-Lex HTML/PDF (empty render), Library of Congress CFR archive (403), CourtListener opinion HTML/API (JS render / 401). All primary propositions above are sourced from at least one host that did render; where they are not, I have said so inline.
