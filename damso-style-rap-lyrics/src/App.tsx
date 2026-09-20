import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import chapelet from "./assets/chapelet.jpg";
import pluie from "./assets/pluie.jpg";
import vierge from "./assets/vierge.jpg";
import {
  epigraphe,
  fiche,
  lexique,
  outro,
  parties,
  pont,
  refrain,
  souseTitre,
  texteComplet,
  titre,
  type Ligne,
  type Partie,
} from "./data/lyrics";

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Rubrique({ children, label = false }: { children: ReactNode; label?: boolean }) {
  return (
    <p className="font-serif italic leading-snug text-rubric text-[0.95rem] md:text-[1.05rem]">
      {label && (
        <span className="caps-sm mr-2 align-[0.18em] not-italic opacity-70">rubrica</span>
      )}
      {children}
    </p>
  );
}

function Vers({
  l,
  i,
  showNums,
  dark = false,
  parle = false,
}: {
  l: Ligne;
  i: number;
  showNums: boolean;
  dark?: boolean;
  parle?: boolean;
}) {
  const taille = dark
    ? { fontSize: "clamp(1.45rem, 4.3vw, 3.05rem)", lineHeight: 1.14 }
    : { fontSize: "clamp(1.08rem, 2.05vw, 1.55rem)", lineHeight: 1.5 };
  return (
    <div className="relative pl-8 sm:pl-12">
      <span
        className={[
          "caps-sm absolute left-0 top-[0.5em] transition-opacity duration-300",
          dark ? "text-rubric-lit" : "text-rubric",
          showNums ? "opacity-100" : "opacity-0",
        ].join(" ")}
        aria-hidden={!showNums}
      >
        {l.n}
      </span>
      <p
        className={[
          i % 2 === 1 ? "ml-5 sm:ml-12" : "",
          parle ? "italic" : "",
          dark ? "text-paper" : "text-ink",
        ].join(" ")}
        style={taille}
      >
        {l.tete && (
          <span className={dark ? "italic text-rubric-lit" : "italic text-rubric"}>{l.tete} </span>
        )}
        {l.texte}
        {l.voix && (
          <span className={dark ? "italic text-paper/65" : "italic text-ink-soft"}> {l.voix}</span>
        )}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Bandeau du refrain — la page noire glissée dans le livre            */
/* ------------------------------------------------------------------ */

function BandeauRefrain({ fois, folio }: { fois: "I" | "II"; folio: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-paper">
      <img
        src={pluie}
        alt="Pluie nocturne sur les pavés de Bruxelles"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
        style={{ objectPosition: "50% 45%" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-night/60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night via-transparent to-night" />
      <div className="relative mx-auto max-w-[72rem] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mb-10 flex items-baseline justify-between border-b border-rubric-lit/40 pb-3">
          <span className="caps text-rubric-lit">Refrain · {fois}</span>
          <span className="caps-sm text-paper/60">folio {folio}</span>
        </div>
        <div className="space-y-5">
          {refrain.map((l, i) => (
            <Reveal key={l.n} delay={i * 0.07}>
              <Vers l={l} i={i} showNums dark />
            </Reveal>
          ))}
        </div>
        <p className="caps-sm mt-12 max-w-md text-paper/60">
          Silence d'une mesure entière. Les anges ne répondent pas.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section de paroles sur papier                                       */
/* ------------------------------------------------------------------ */

function Bloc({
  part,
  showRubriques,
  showNums,
  parle = false,
}: {
  part: Partie;
  showRubriques: boolean;
  showNums: boolean;
  parle?: boolean;
}) {
  return (
    <section className="mx-auto max-w-[72rem] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[13.5rem_1fr] lg:gap-14">
        {/* rail de marge : folio, rubriques, planche */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rule-ink pt-3">
            <span className="caps text-ink"> {part.cle} </span>
            <span className="caps-sm ml-2 text-rubric">folio {part.folio}</span>
          </div>

          <div
            className={[
              "mt-5 space-y-3 transition-all duration-500",
              showRubriques ? "max-h-[40rem] opacity-100" : "max-h-0 overflow-hidden opacity-0",
            ].join(" ")}
          >
            {part.rubriqueAvant && <Rubrique label>{part.rubriqueAvant}</Rubrique>}
            {part.rubriquesMarge.map((r) => (
              <p
                key={r}
                className="font-serif text-[0.9rem] italic leading-snug text-ink-faint border-l border-rubric/40 pl-3"
              >
                {r}
              </p>
            ))}
          </div>

          {part.planche === "vierge" && (
            <figure className="mt-8 hidden lg:block">
              <img
                src={vierge}
                alt="Statuette de Vierge en plâtre écaillé dans une cuisine sombre"
                className="h-auto w-40 mix-blend-multiply grayscale-[0.15]"
              />
              <figcaption className="caps-sm mt-2 text-ink-faint">
                Planche I — « la Vierge a les yeux en vitre »
              </figcaption>
            </figure>
          )}
        </aside>

        {/* colonne de texte */}
        <div>
          {part.rubriqueAvant && (
            <div
              className={[
                "lg:hidden mb-6 transition-opacity duration-500",
                showRubriques ? "opacity-100" : "hidden",
              ].join(" ")}
            >
              <Rubrique label>{part.rubriqueAvant}</Rubrique>
            </div>
          )}

          <div className="space-y-4 sm:space-y-5">
            {part.lignes.map((l, i) => (
              <Reveal key={l.n} delay={Math.min(i, 6) * 0.045}>
                <Vers l={l} i={i} showNums={showNums} parle={parle} />
              </Reveal>
            ))}
          </div>

          {part.rubriqueApres && (
            <div
              className={[
                "mt-10 max-w-xl rule-red pt-3 transition-all duration-500",
                showRubriques ? "opacity-100" : "max-h-0 overflow-hidden border-t-0 pt-0 opacity-0",
              ].join(" ")}
            >
              <Rubrique>{part.rubriqueApres}</Rubrique>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const [showRubriques, setShowRubriques] = useState(true);
  const [showNums, setShowNums] = useState(true);
  const [copie, setCopie] = useState(false);
  const reduce = useReducedMotion();

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(texteComplet());
    } catch {
      /* presse-papiers indisponible : on reste honnête */
    }
    setCopie(true);
    window.setTimeout(() => setCopie(false), 2200);
  };

  const bouton =
    "caps border px-3 py-2 transition-colors duration-200 disabled:opacity-50";

  return (
    <div className="grain min-h-screen bg-paper">
      {/* ---------- folio de tête ---------- */}
      <div className="mx-auto flex max-w-[72rem] items-baseline justify-between px-5 pt-5 sm:px-8 lg:px-12">
        <span className="caps text-ink">Rosaire · Paroles</span>
        <span className="caps-sm hidden text-ink-faint sm:block">
          Paroles inédites — dans la veine de Damso
        </span>
        <span className="caps-sm text-rubric">Folio j</span>
      </div>

      {/* ---------- frontispice ---------- */}
      <header className="relative lg:min-h-[86vh]">
        <div className="absolute inset-0 lg:hidden">
          <img
            src={chapelet}
            alt="Chapelet et chrysanthème séché sur du papier bible"
            className="h-full w-full object-cover opacity-35 mix-blend-multiply"
            style={{ objectPosition: "65% 50%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-paper/85 via-paper/70 to-paper" />
        </div>
        <div className="absolute inset-y-0 right-0 hidden w-[46%] lg:block">
          <img
            src={chapelet}
            alt="Chapelet et chrysanthème séché sur du papier bible"
            className="h-full w-full object-cover mix-blend-multiply"
            style={{ objectPosition: "55% 50%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/72 to-paper/10" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[86vh] max-w-[72rem] flex-col justify-end px-5 pb-14 pt-16 sm:px-8 lg:px-12 lg:pb-24">
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="caps text-rubric mb-6">{souseTitre}</p>
            <h1
              className="font-serif font-medium tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(3.4rem, 13.5vw, 11.5rem)", lineHeight: 0.82 }}
            >
              {titre}
            </h1>
            <p
              className="mt-8 max-w-[26ch] font-serif italic text-ink-soft"
              style={{ fontSize: "clamp(1.2rem, 2.4vw, 1.9rem)", lineHeight: 1.35 }}
            >
              «&nbsp;{epigraphe}&nbsp;»
            </p>
          </motion.div>

          {/* fiche technique */}
          <motion.dl
            className="mt-14 grid max-w-xl grid-cols-1 gap-x-12 gap-y-2 sm:grid-cols-2"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            {fiche.map(([k, v]) => (
              <div key={k} className="rule-ink flex items-baseline gap-3 pt-2">
                <dt className="caps-sm shrink-0 text-ink-faint">{k}</dt>
                <dd className="ml-auto text-right font-serif text-[0.98rem] leading-snug text-ink">
                  {v}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </header>

      {/* ---------- barre d'outils ---------- */}
      <div className="sticky top-0 z-50 border-y border-ink/20 bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[72rem] flex-wrap items-center gap-3 px-5 py-3 sm:px-8 lg:px-12">
          <span className="caps-sm mr-auto text-ink-faint">Appareil · réglage de lecture</span>
          <button
            type="button"
            onClick={() => setShowRubriques((v) => !v)}
            aria-pressed={showRubriques}
            className={`${bouton} ${
              showRubriques
                ? "border-rubric bg-rubric text-paper"
                : "border-rubric/50 text-rubric hover:bg-rubric/10"
            }`}
          >
            Rubriques
          </button>
          <button
            type="button"
            onClick={() => setShowNums((v) => !v)}
            aria-pressed={showNums}
            className={`${bouton} ${
              showNums
                ? "border-ink bg-ink text-paper"
                : "border-ink/40 text-ink hover:bg-ink/10"
            }`}
          >
            Versets
          </button>
          <button
            type="button"
            onClick={copier}
            aria-live="polite"
            className={`${bouton} ${
              copie ? "border-rubric text-rubric" : "border-ink/40 text-ink hover:bg-ink/10"
            }`}
          >
            {copie ? "Paroles copiées ✓" : "Copier les paroles"}
          </button>
        </div>
      </div>

      {/* ---------- couplet I ---------- */}
      <Bloc part={parties[0]} showRubriques={showRubriques} showNums={showNums} />

      {/* ---------- refrain I ---------- */}
      <BandeauRefrain fois="I" folio="iij" />

      {/* ---------- couplet II ---------- */}
      <Bloc part={parties[1]} showRubriques={showRubriques} showNums={showNums} />

      {/* ---------- refrain II ---------- */}
      <BandeauRefrain fois="II" folio="viij" />

      {/* ---------- pont ---------- */}
      <Bloc part={pont} showRubriques={showRubriques} showNums={showNums} parle />

      {/* ---------- outro ---------- */}
      <section className="mx-auto max-w-[72rem] px-5 pb-24 pt-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-8 w-16 border-t-2 border-rubric" />
          <p
            className="font-serif italic leading-snug text-ink-soft"
            style={{ fontSize: "clamp(1.05rem, 2vw, 1.4rem)" }}
          >
            {outro}
          </p>
          <p
            className="mt-10 font-serif text-rubric"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)", lineHeight: 1 }}
          >
            Ainsi soit-il.
          </p>
          <p className="caps-sm mt-4 text-ink-faint">Outro · folio xj</p>
        </div>
      </section>

      {/* ---------- lexique + colophon ---------- */}
      <footer className="bg-paper-deep">
        <div className="mx-auto max-w-[72rem] px-5 py-16 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[13.5rem_1fr] lg:gap-14">
            <div className="rule-ink pt-3">
              <span className="caps text-ink">Lexique</span>
              <p className="mt-4 font-serif text-[0.95rem] italic leading-snug text-ink-faint">
                Comme dans un missel : la glose au bas de la page, pour qui n'a pas grandi entre
                l'encens et le chlore.
              </p>
            </div>
            <dl className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
              {lexique.map((e) => (
                <div key={e.terme} className="rule-red pt-3">
                  <dt className="caps text-rubric mb-2">{e.terme}</dt>
                  <dd className="font-serif text-[1.02rem] leading-relaxed text-ink-soft">
                    {e.glose}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-16 flex flex-col gap-3 border-t border-ink/25 pt-5 sm:flex-row sm:items-baseline sm:justify-between">
            <span className="caps-sm text-ink-faint">
              Composé en EB Garamond &amp; Archivo · rubriques en vermillon · versets suspendus en
              marge
            </span>
            <span className="caps-sm text-rubric">Bruxelles, janvier — Ainsi soit-il.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
