export type Ligne = {
  /** numéro de vers (romain), suspendu dans la marge */
  n: string;
  /** incise en italique vermillon : la voix qui se confesse */
  tete?: string;
  texte: string;
  /** portion mise en italique (voix basse) */
  voix?: string;
};

export type Partie = {
  id: string;
  cle: string;
  folio: string;
  rubriqueAvant?: string;
  rubriquesMarge: string[];
  lignes: Ligne[];
  rubriqueApres?: string;
  planche?: "vierge" | "chapelet";
};

export const titre = "ROSAIRE";
export const souseTitre = "Texte inédit — pour voix grave et batterie sèche";
export const epigraphe = "Ici, la pluie tombe sur une ville qui prie mal.";

export const fiche = [
  ["Tempo", "88 BPM"],
  ["Tonalité", "Ré mineur"],
  ["Durée", "4:12"],
  ["Prod", "Orgue d'église (1974) pitché de −3 demi-tons, 808 sèche"],
  ["Voix", "Une seule piste, aucune dédoublée"],
  ["Prise", "Bruxelles, janvier"],
];

export const refrain: Ligne[] = [
  { n: "i", texte: "Rosaire autour du poignet, je m'étrangle", voix: "en douceur" },
  { n: "ii", texte: "Sept Pater, sept Ave, pour faire taire", voix: "la peur" },
  { n: "iii", texte: "Le cierge coule sur l'autel, j'ai le cœur", voix: "en moelle de pierre" },
  { n: "iv", tete: "Pardonnez-moi, mon Père —", texte: "j'ai couché avec la guerre" },
];

export const parties: Partie[] = [
  {
    id: "couplet-1",
    cle: "Couplet I",
    folio: "ij",
    rubriqueAvant: "Voix basse, sans orgueil. On entend la pluie derrière la porte.",
    rubriquesMarge: [
      "Rimes suffisantes, en écho — la voix traîne sur la dernière.",
      "Ne pas faire vibrer le mot « discipline ».",
    ],
    planche: "vierge",
    lignes: [
      { n: "1", texte: "J'ai grandi dans une cuisine où l'on comptait les fins de mois" },
      { n: "2", texte: "Maman priait la Vierge, moi je priais", voix: "devant le miroir" },
      { n: "3", texte: "Le hall sentait l'encens froid, le chlore et la racine" },
      { n: "4", texte: "On était douze à traîner dehors, il en reste trois —", voix: "discipline" },
      { n: "5", texte: "Le curé disait « sois sage », j'entendais « ferme-la, tiens-toi droit »" },
      { n: "6", texte: "J'ai volé les Hosties roses derrière l'autel", voix: "contre le froid" },
      { n: "7", texte: "Le Bon Dieu a les mains vides, la Vierge a les yeux en vitre" },
      { n: "8", texte: "J'ai appris à lire dans la douleur —", voix: "c'est la seule lettre" },
    ],
    rubriqueApres: "Batterie sèche, sans réverbération. On laisse le silence faire le poids.",
  },
  {
    id: "couplet-2",
    cle: "Couplet II",
    folio: "v",
    rubriqueAvant: "On monte d'un ton. La colère est polie : elle tutoie personne.",
    rubriquesMarge: [
      "Elle : jamais nommée. Le prénom se tait, comme un aveu qu'on refuse.",
      "Sur « haïr sa vie », couper la nappe une demi-mesure avant la fin.",
    ],
    lignes: [
      { n: "9", texte: "Elle sentait la cannelle et les dimanches", voix: "sans foi" },
      { n: "10", texte: "On s'aimait comme on vole : en silence,", voix: "à l'heure du toit" },
      { n: "11", texte: "Deux oiseaux morts dans la cage, deux enfants", voix: "dans le noir" },
      { n: "12", texte: "Elle me tendait le miroir, je lui rendais", voix: "le désarroi" },
      { n: "13", texte: "On s'est quittés un dimanche, devant l'église Sainte-Catherine" },
      { n: "14", texte: "Elle a gardé le rosaire, j'ai gardé", voix: "la racine" },
      { n: "15", texte: "Depuis j'écris des lettres que je brûle", voix: "dans la nuit" },
      { n: "16", texte: "À celle qui m'a appris qu'aimer,", voix: "c'est haïr sa vie" },
    ],
    rubriqueApres: "Deux temps de rien. La pluie revient par la fenêtre de gauche.",
  },
];

export const pont: Partie = {
  id: "pont",
  cle: "Pont — parlé",
  folio: "ix",
  rubriqueAvant: "Parler, ne pas chanter. La batterie tombe : il ne reste que l'orgue.",
  rubriquesMarge: ["Quatre antithèses. Les poser comme des gifles calmes."],
  lignes: [
    { n: "17", texte: "On m'a dit « sois un saint », j'ai été", voix: "une créature" },
    { n: "18", texte: "On m'a dit « tends l'autre joue », j'ai tendu", voix: "la ceinture" },
    { n: "19", texte: "On m'a dit « Dieu t'écoute », j'ai répondu", voix: "« il a tort »" },
    { n: "20", texte: "Ainsi soit-il — j'ai plus d'ave", voix: "que de confort" },
  ],
};

export const outro =
  "Le cierge s'éteint. On n'entend plus que la ville, et quelqu'un qui compte des grains dans le noir.";

export const lexique: { terme: string; glose: string }[] = [
  {
    terme: "Hosties roses",
    glose:
      "Oublies roses, sucreries belges de la taille d'une pièce. Ici : ce qu'on vole à sept ans quand on n'a pas d'argent et que le Bon Dieu ne répond pas.",
  },
  {
    terme: "Moelle de pierre",
    glose:
      "Le lithopédion : l'enfant devenu pierre dans le ventre de sa mère. Ici : un cœur qui a cessé de grandir et qui pèse quand même.",
  },
  {
    terme: "Pater · Ave",
    glose:
      "Le Pater Noster et l'Ave Maria. Sept de chacun font un septième de rosaire : de quoi occuper les mains d'un voleur.",
  },
  {
    terme: "Molenbeek",
    glose: "Commune de Bruxelles-Capitale. Se prononce avec la pluie dedans.",
  },
  {
    terme: "Racine",
    glose: "Ce qui reste d'un quartier quand on l'a quitté, et qui vous appelle par votre nom de baptême.",
  },
];

/** Texte plat, pour le presse-papiers. */
export function texteComplet(): string {
  const out: string[] = [];
  out.push("ROSAIRE");
  out.push("Texte inédit — pour voix grave et batterie sèche");
  out.push("");
  const bloc = (p: Partie, label: string) => {
    out.push(`— ${label} —`);
    p.lignes.forEach((l) => {
      out.push(`${l.n}. ${l.texte}${l.voix ? " " + l.voix : ""}`);
    });
    out.push("");
  };
  bloc(parties[0], "Couplet I");
  out.push("— Refrain —");
  refrain.forEach((l) => out.push(`${l.texte} ${l.voix ?? ""}`.trim()));
  out.push("");
  bloc(parties[1], "Couplet II");
  out.push("— Refrain —");
  refrain.forEach((l) => out.push(`${l.texte} ${l.voix ?? ""}`.trim()));
  out.push("");
  bloc(pont, "Pont — parlé");
  out.push("— Outro —");
  out.push(outro);
  out.push("Ainsi soit-il.");
  return out.join("\n");
}
