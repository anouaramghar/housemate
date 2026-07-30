# Contexte — HouseMate

Glossaire du domaine. Ces mots sont la langue du projet : ils s'utilisent tels quels dans le code,
l'API et l'interface. Aucun synonyme.

Ce fichier est **uniquement un glossaire**. Les décisions techniques vivent dans
[.scratch/housemate-marketplace/spec.md](.scratch/housemate-marketplace/spec.md), les décisions
produit dans [map.md](.scratch/housemate-marketplace/map.md).

## Termes

### Person

Un étudiant vérifié. Porte un **housing status**.

### Housing status

L'état d'une Person : `has a place` (a un logement, cherche des colocataires) ou `needs a place`
(cherche un logement). C'est la seule primitive du produit — on parcourt des personnes, pas des
annonces.

### Household

Le groupe. Objet de première classe. **Une propriété est optionnelle** : trois personnes qui
n'ont nulle part où vivre forment un Household valide. C'est le cœur du produit.

Traverse quatre états : `forming` → `locked` → `coordinating` → `settled`.

### Settled

L'état final : le groupe déclare avoir signé son bail. Le produit a fait son travail.

Le Household passe en lecture seule, le **group profile** est révoqué automatiquement pour que le
lien cesse de circuler, et le Household est exclu du nettoyage de fin de saison — c'est une réussite,
pas un fantôme.

**C'est le seul signal de réussite du produit.** Sans lui, on ne peut mesurer que des inscriptions,
jamais des gens logés.

Un membre le déclare, les autres confirment ; l'unanimité stricte n'est pas requise, car c'est un
constat et non un engagement. Réversible : si la signature échoue, retour à `coordinating`.

**On croit le groupe sur parole.** Aucune preuve de bail n'est demandée, aucun document n'est
téléversé. Vérifier voudrait dire toucher au document légal, ce qui est hors périmètre — le produit
s'arrête avant le bail.

### Target

La taille visée d'un Household, déclarée par le groupe. Seul le groupe peut la modifier — jamais
une propriété, jamais le système.

### Open slots

`target − members`. De l'arithmétique, pas un objet. Rien à réserver, rien à tenir. C'est ce qui
permet à un seul objet Household de servir les deux formes (avec ou sans propriété).

Ne jamais dire « seat » ni « space ».

### Lock

L'engagement explicite du groupe, pris quand `open slots == 0` et que **tous** les membres ont
consenti.

**Lock porte sur les personnes, jamais sur le bâtiment.** Un groupe sans logement peut locker.

Concrètement, lock est une **promesse sociale** — rien de légal ne lie les membres. Ce qu'il change :
le Household se ferme aux nouvelles demandes, le groupe obtient son **group profile** partageable, et
partir sans **release** est enregistré. Sa vraie valeur n'est pas la contrainte : c'est qu'il
transforme trois personnes qui discutent en une entité qui peut se présenter à un propriétaire.

### Release

Les membres restants absolvent un membre qui part, sans coût pour lui.

C'est la seule réponse non-financière à la contagion du défaut : sans release, le désistement d'une
seule personne contamine tout le groupe, ce qui rend les groupes d'inconnus impossibles à financer.

**Release n'est pas une variante de « retirer un membre ».** Partir *avec* release et partir *sans*
release sont deux actes différents, aux conséquences différentes.

**Portée de la conséquence dans le MVP :** un départ apparaît dans l'historique du Household —
« parti, libéré par le groupe » ou « parti, sans libération » — visible **uniquement par les membres
restants**. La trace suit le Household, jamais la Person. Rien n'apparaît sur un profil public.

La pression qui donne son sens à release ne vient donc pas d'un score, mais des personnes que tu
laisses et qui le verront écrit. Limite assumée : quelqu'un qui abandonne trois groupes différents
n'est repéré par personne en année une.

### Match

Intérêt mutuel (double opt-in). La **seule** chose qui débloque la conversation entre deux Persons.
Rend le contact non sollicité structurellement impossible, plutôt que simplement interdit.

**Un match ne donne aucun droit d'entrée dans un Household.** Il ouvre la conversation, rien de plus.
Un membre peut t'apprécier et le groupe te refuser quand même — c'est toujours le groupe qui décide.

### Les deux parcours

On parcourt **des Persons** et **des Households**, séparément, parce que ce sont deux questions
différentes : « ai-je envie de vivre avec cette personne ? » et « ai-je envie d'entrer dans ce
groupe ? ».

Une même Person apparaît légitimement dans les deux — celle qui a un logement et cherche des
colocataires est à la fois une Person et un membre de Household. Ce n'est pas une duplication à
corriger.

Deux règles qui rendent ça lisible :

- La carte d'une Person membre d'un Household **montre toujours ce Household** et permet d'y aller.
  On ne tombe jamais sur quelqu'un sans voir qu'il a déjà un groupe.
- Une Person dans un Household `locked` **disparaît des deux parcours** : elle n'est plus sur le
  marché.

### Join request

La demande d'une Person pour entrer dans un Household `forming`. Le groupe l'examine et décide.

**Chemin indépendant du match.** Il n'est pas nécessaire d'avoir matché avec un membre pour demander
à rejoindre — sinon trouver un groupe deviendrait aussi lent que trouver une personne, ce qui annule
l'intérêt du Household.

Le double opt-in existe quand même, porté par le groupe : tu demandes (opt-in 1), le groupe accepte
(opt-in 2).

**L'acceptation exige l'unanimité des membres.** Pas la majorité : la décision ne s'applique pas au
groupe mais à chaque personne séparément, puisque chacune va partager une cuisine et une salle de
bain pendant un an. Le veto est donc légitime, et son coût est faible dans des groupes de 3 à 5. La
majorité aurait en plus un effet pervers : sachant qu'on peut être mis en minorité, on ne se prononce
plus franchement, et le produit perd le signal qu'il cherchait.

**Le silence fait expirer la demande, jamais l'approuver.** Chaque membre dispose d'un délai (5
jours) ; passé ce délai sans réponse complète, la demande expire et le demandeur est prévenu
clairement. Faire entrer quelqu'un chez soi par défaut, parce qu'un membre a oublié de cliquer,
serait le pire résultat possible : une expiration frustre, une approbation par silence trahit. Un
groupe incapable de répondre en 5 jours est de toute façon un groupe mort, et le demandeur a besoin
de le savoir.

**Une join request n'ouvre aucune conversation.** Tant que le groupe n'a pas accepté, le demandeur ne
peut écrire à personne. La conversation s'ouvre d'un seul coup avec tout le groupe au moment de
l'acceptation. Pour décider sans discuter, le groupe voit le profil complet du demandeur et sa
compatibilité avec **l'ensemble** des membres.

### Convergence

Le moment où un Household `forming` se met d'accord sur ses contraintes communes : budget, quartier,
date d'emménagement. Chacun donne sa préférence **en privé d'abord**, puis tout est révélé — pour que
personne ne soit ancré par celui qui a répondu le plus fort.

Le résultat est enregistré sur le Household : un artefact partagé, pas un message qui défile dans une
conversation.

**La convergence avertit, elle ne bloque jamais.** Un désaccord non résolu s'affiche clairement au
moment du lock — « vous n'êtes pas encore d'accord sur le budget, locker quand même ? » — mais
n'empêche pas la transition. Même philosophie que l'avertissement sur une propriété trop grande : le
produit informe, le groupe décide.

Conséquence structurelle : la convergence vit **à côté** du Household, jamais dedans. Elle produit des
contraintes, elle ne conditionne aucune transition. Le module le plus profond du système reste ainsi
indépendant du plus incertain.

### Les deux conditions du lock

Le lock a exactement deux conditions dures, et rien d'autre ne peut s'y ajouter :

```
lock  ⟺  open slots == 0  ET  consentement unanime des membres
```

La convergence n'en fait pas partie.

### Régime abrité / non abrité

Un Household est **abrité** si et seulement si un membre **réside déjà** dans le logement où
entrerait le nouveau venu. Évalué en direct. C'est le test de la loi elle-même — Equality Act,
annexe 5, §3, qui dit *« resides »*. Un bail signé mais pas encore habité ne crée aucun occupant et
n'abrite rien.

Un Household formé de zéro est **non abrité pendant toute sa vie joignable** : on ne peut le
rejoindre que pendant `forming`, et il n'a alors aucun résident.

### Préférence de genre

Le seul critère d'identité que le produit accepte. Aucun autre — l'origine n'est exemptée dans aucune
juridiction étudiée, et cette exclusion est définitive, pas une simplification de v1.

Son expression **dépend du régime** :

- **Abrité** → filtre dur autorisé. Les personnes exclues disparaissent de la liste. C'est le droit
  que la loi donne à celui qui réside.
- **Non abrité** → classement uniquement. Les personnes restent visibles, plus bas.

**Coût assumé, et il est réel :** la moitié la plus originale du produit — le groupe formé de zéro —
est celle qui a le moins de protection juridique, donc le contrôle le plus faible. Une femme qui ne
veut vivre qu'avec des femmes trouvera le classement insuffisant dans ce régime : elle ne veut pas
qu'un homme soit 7ᵉ, elle veut qu'il soit absent. On ne peut pas le lui donner là.

À noter : l'avertissement « le texte libre bat le champ structuré » vient d'une affaire américaine
(§230), un mécanisme qui n'existe pas au Royaume-Uni. Le principe — ce que la plateforme rédige est
sa propre parole — reste sensé, mais l'argument juridique précis doit être revérifié par l'avocat.

### Group profile

La vue en lecture seule d'un Household `locked`, destinée aux propriétaires. Accessible par simple
lien, sans compte. Révocable et expirable.

## Mots interdits

- **« listing »** — le produit n'indexe pas le marché locatif. On parcourt des personnes.
- **« group »** quand on veut dire **Household**.
- **« seat »**, **« space »** quand on veut dire **slot**.
- **« reputation »** — reporté à l'année trois. Le MVP a un **journal d'événements** du Household.
