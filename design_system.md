# G2M — Design System

Document de référence de la charte graphique du site G2M (V2 — identité premium IA / Data), établi à partir de l'analyse de `css/style.css` et des pages existantes (`diagnostic.html` — page la plus riche en composants —, `index.html`, `formation.html`, header/footer communs à toutes les pages).

Toutes les valeurs ci-dessous existent déjà dans le code. Ce document ne fait que les cataloguer : en cas de doute, `css/style.css` reste la source de vérité.

---

## Identité visuelle

### Couleurs principales
| Rôle | Variable CSS | HEX |
|---|---|---|
| Primaire (accent, CTA, liens actifs, icônes) | `--color-primary` | `#56B6E8` |
| Primaire foncé (hover boutons/cartes/pilules) | `--color-primary-hover` | `#2D8FFF` |
| Accent vif (hover liens, second stop de dégradés) | `--color-secondary` | `#00D4FF` |

### Couleurs secondaires / neutres
| Rôle | Variable CSS | HEX |
|---|---|---|
| Fond de page (base, le plus sombre) | `--color-dark` | `#05080D` |
| Noir (footer, navbar sans support `backdrop-filter`) | `--color-black` | `#02040A` |
| Surface de carte (fond des cartes/panneaux sombres) | `--color-surface` | `#0B1220` |
| Surface de carte, ton clair (dégradés de cartes, bandes de fond) | `--color-surface-soft` | `#101A2B` |
| Blanc | `--color-white` | `#FFFFFF` |
| Gris clair (texte sur fond sombre, badges, pilules claires) | `--color-gray-light` | `#C7D2E0` |
| Gris (texte discret, métadonnées) | `--color-gray` | `#8A94A6` |
| Gris foncé (éléments très discrets : `.opco-logo`) | `--color-muted` | `#5F6B7A` |

Des triplets RGB équivalents existent pour la plupart des couleurs (`--color-primary-rgb`, `--color-primary-hover-rgb`, `--color-secondary-rgb`, `--color-dark-rgb`, `--color-black-rgb`, `--color-surface-rgb`, `--color-surface-soft-rgb`, `--color-gray-light-rgb`) : ils servent uniquement aux halos, dégradés translucides et ombres teintées via `rgba(...)`.

### Couleurs de fond
- **Fond de page** : `--color-dark` (#05080D), recouvert de trois halos radiaux (primaire / primaire foncé / secondaire à faible opacité) et d'un léger pointillé — défini une seule fois sur `body`, se répète verticalement tous les 1400px (1000px sur mobile).
- **Image de fond générale** (`body::before`) : `images/Image_fond.png` en `background-attachment:fixed`, `cover`, `center`, opacité **45%** — visible derrière tout le contenu, sans impact sur la mise en page (voir « Fond de page (image + voile) »).
- **Voile de contraste** (`body::after`) : aplat `rgba(var(--color-black-rgb), 0.20)` entre l'image et le contenu, pour préserver la lisibilité des textes.
- **Fond des cartes** (`.card`, `.pave`, `.module`, `.audience-card`, `.journey-frame`, `.callout`) : dégradé sombre `linear-gradient(165deg, rgba(surface-soft,.96) 0%, rgba(surface,.98) 100%)` — les cartes ne sont plus claires depuis la V2, elles sont désormais des surfaces sombres en verre.
- **Fond des panneaux de mise en avant** (`.diag-intro`, `.method-intro`, `.day-section`, `.bottom-block`) : dégradé translucide `rgba(primary,.12)` → `rgba(primary-hover,.06)` sur une base `rgba(surface,.82)`, posé sur le fond sombre de la page.
- **Fond du footer** : halo radial primaire discret + dégradé quasi noir `--color-dark → --color-black`.
- **Fond du bloc CTA final** (`.final-cta`, `.bottom-cta`) : `--gradient-brand` (voir dégradés) + deux halos (blanc et cyan).

### Couleurs des textes
- Titres (`h1–h4`) sur fond sombre : blanc (`--title-color` = `#FFFFFF`) par défaut.
- **Exception accent** : `.hero-title-text` (H1 accueil) et `.page-header h1` (H1 pages internes) utilisent `--title-accent-color` (= `--color-primary`, bleu clair) plutôt que le blanc, pour donner du relief au titre principal de chaque page.
- Texte courant sur fond sombre : `--text-on-dark` = `--color-gray-light` (#C7D2E0).
- Dans les cartes (désormais sombres elles aussi) : mêmes règles que le reste de la page — titres en blanc, texte courant en `--text-on-dark`. Il n'y a plus de logique « texte foncé sur carte claire » depuis la V2.
- Accroche de page (`.hero-tagline--home`) : couleur spécifique `#0078D4` (exception ponctuelle documentée depuis la V1, non généralisée, conservée telle quelle).

### Couleurs des boutons
- **Bouton principal** (`.cta-button`) : dégradé `linear-gradient(135deg, --color-primary → --color-primary-hover)`, texte blanc, bordure translucide blanche, ombre teintée bleue ; hover → dégradé `--color-primary-hover → --color-secondary` + `translateY(-3px)` + halo lumineux.
- **Variante sur fond `--gradient-brand`** (`.final-cta .cta-button`, `.bottom-cta .cta-button`) : fond blanc / texte `--color-dark`, hover → fond `--color-gray-light` / texte `--color-black`.
- **Étiquette-pilule de carte** (`.card-title`, `.pave-title` en lien) : pilule translucide `rgba(primary,.12)` bordée `rgba(primary,.20)`, texte `--color-primary` ; hover → fond `rgba(primary,.22)`, texte blanc. (Ce n'est plus une pilule pleine comme en V1.)

Il n'existe que ces trois familles de boutons/liens forts. Ne pas en créer de nouvelles variantes (voir « Règles d'utilisation »).

### Couleurs des liens
- Lien de navigation (`.nav-link`) : blanc, fond transparent ; actif/survolé → fond `rgba(primary,.14)` + texte `--color-primary`.
- Dernier item de navbar (`NOUS CONTACTER`) : dégradé `primary → primary-hover` en permanence ; hover → dégradé `primary-hover → secondary`.
- Lien de carte (`.pave-link`) : `--color-primary`, hover → `--color-secondary` (cyan vif), flèche qui glisse de 4px.
- Lien du footer (`.footer-legal`) : `--color-gray`, hover → `--color-primary`.
- Lien générique dans le contenu légal (`.legal-content a`) : `--color-primary`, hover → `--color-secondary`.

> Il n'existe plus de lien « retour » (`.back-link`) depuis la refonte de la navigation : la fonction de retour à l'accueil est désormais portée par le logo d'angle (voir « Header »).

### Dégradés
| Nom | Usage | Définition |
|---|---|---|
| `--gradient-brand` | CTA finale, halos de marque | `linear-gradient(135deg, --color-dark 0%, --color-surface 55%, --color-primary-hover 100%)` |
| Fond de page | `body` | 3 halos radiaux (primaire / primaire foncé / secondaire) + dégradé vertical + trame de points |
| Image de fond | `body::before` / `body::after` | `Image_fond.png` (opacité 45%) + voile noir (20%), voir section dédiée |
| Cartes | `.card`, `.pave`, `.module`, `.audience-card`, `.journey-frame`, `.callout` | `linear-gradient(165deg, surface-soft → surface)` |
| Panneaux « highlight » | `.diag-intro`, `.method-intro`, `.day-section`, `.bottom-block` | `linear-gradient(135deg, rgba(primary,.12), rgba(primary-hover,.06)), rgba(surface,.82)` |
| Footer | `.footer-inner` | halo radial primaire (haut, centré) + `linear-gradient(180deg, --color-dark, --color-black)` |

---

## Typographie

- **Police principale (titres)** : `Montserrat` (`--font-heading`), graisses chargées : 600 et 700.
- **Police secondaire (texte courant)** : `Inter` (`--font-body`), graisses chargées : 400 et 500.

(Tailles, graisses, interlignages et espacements titre ↔ texte inchangés depuis la V1 — la refonte V2 n'a porté que sur les couleurs, fonds, ombres et bordures, jamais sur la typographie ou les espacements.)

### Tailles de titres (desktop → mobile, via `clamp()` ou paliers responsives)
| Élément | Taille | Contexte |
|---|---|---|
| H1 — Accueil | `clamp(28px, 4.4vw, 56px)` | `.hero-title-text` |
| H1 — Pages internes | `clamp(26px, 3.6vw, 42px)` | `.page-header h1` |
| H2 — Intros mises en avant | `clamp(24px, 3.2vw, 42px)` | `.diag-intro h2`, `.method-intro h2` |
| H2 — Sections | 26–32px fixes selon section | `.day-section h2` (26px), `.final-cta h2` (32px), `.outcomes-section h2` / `.audience-section h2` (28px), `.callout h2` (28px), `.legal-content h2` (22px) |
| H3 | 15–19px | `.pave-subtitle` / `.step-content h3` (19px), `.journey-frame h3` (18px), `.module h3` / `.audience-card h3` (15/14px) |
| H4 | 14px, `--color-gray` | `.step-content h4` (utilisé comme sous-titre, pas comme titre de section) |

### Paragraphes
- Texte de hero / intro / callout / mentions légales : **17px**, `line-height:1.8`.
- Texte de carte (`.card-text`, `.pave-desc`, `.module p`, `.audience-card p`) : **15px**, `line-height:1.7`.
- Métadonnées footer : `clamp(10px, 1.3vw, 12px)`.
- **Texte introductif sous le titre principal (`<h1>`) de chaque page** : `text-align:center` partout, de manière homogène — `.page-header .intro` (défaut), `.page-header .intro.intro--justify` (certifications.html, approche.html, nous-rejoindre.html), `.page-header--wide .intro` (a-propos.html), `.intro-banner-text` (developpement.html), `.diag2-hero-text` (diagnostic.html), `.uc-hero-desc` (les 5 `cas-usage-*.html`), `.rd-hero-lead`/`.rd-hero-text` (expertise-developpement.html), `.intro--typewriter` (cas-usages.html). Les paragraphes justifiés qui restent dans le site (`.method-intro p.intro--justify`, `.pave-desc--justify`, textes de cartes/sections en milieu de page…) sont volontairement hors de cette règle : elle ne s'applique qu'au texte d'intro sous le H1, pas au contenu du reste de la page.

### Graisses
- **Titres** : H1 = 700 ; H2/H3/H4 = 600 par défaut (certains H2 de section passent explicitement en 700 — cf. tableau ci-dessus).
- **Textes courants** : 400 ; surtitres/badges/taglines (`.overline`, `.badge`, `.step-eyebrow`, `.hero-tagline`) : 500–600.

### Interlignage
- `line-height:1.7` par défaut sur `body`.
- `1.8` pour les paragraphes longs (hero, callout, panneaux, mentions légales).
- `1.5` pour les listes courtes en carte (`.step-content .g2m-list li`).

### Espacements titre ↔ texte (variables, 3 paliers responsives : desktop ≥1600px / 1280–1599px / 768–1279px / <768px)
- `--gap-title-sub` (24/20/16px) : titre → sous-titre.
- `--gap-sub-text` (20/16/12px) : sous-titre → texte.
- `--gap-title-intro` (24/20/16px) : titre de section → introduction.
- `--gap-text-button` (32/28/24/20px) : texte → bouton.

---

## Mise en page

(Inchangée depuis la V1 : la refonte graphique n'a jamais touché aux largeurs, grilles, colonnes ou breakpoints.)

### Largeurs maximales de contenu
- Navbar : 1100px (820px en version compacte `.navbar--compact`, utilisée sur toutes les pages actuelles).
- Hero / en-têtes de page (`.hero`, `.page-header`, `.page-hero`) : 900px.
- Grilles de cartes (`.section-preview`, `.services-grid`, `.paves`, `.modules`, `.audience-grid`) : 1100px.
- Grilles larges (`.cards`, `.steps`, `.journey`, `.audience-section`, `.day-section`) : 1100–1400px.
- Panneaux centrés (`.callout`, `.final-cta`, `.bottom-cta`, `.bottom-block`, `.legal-content`) : 820–900px.
- Footer : 1100px.

### Marges latérales
`padding:0 24px` quasi systématique sur les conteneurs pleine largeur (gouttière mobile-safe identique partout).

### Padding des sections (variables)
- `--gap-header-hero` (48/40/36/32px) : header → hero.
- `--hero-pb` (64/56/48/40px) : padding-bottom du hero (texte → cartes).
- `--spacing-title-text` (40/32/28/24px) : introduction → contenu.

### Espacement vertical entre sections
- `--spacing-section` (96/80/64/56px) : espacement standard entre deux sections.
- `--spacing-section-tight` (72/60/48/44px) : sections fortement liées.

### Espacement entre cartes / blocs
- `--spacing-cards` (32/28/24/20px), utilisé comme `gap` sur toutes les grilles.
- `--card-padding` (30/26/24/20px) : padding interne des cartes.

### Grille
CSS Grid pour toutes les grilles de contenu ; Flexbox pour la navbar, le footer et l'agencement interne des cartes (`flex-direction:column`, pour aligner les boutons en bas de carte).

### Nombre de colonnes desktop
- `.section-preview` : auto-fit, min 220px.
- `.services-grid`, `.paves` : 3 colonnes.
- `.modules` : 2 colonnes.
- `.audience-grid` : 4 colonnes.
- `.cards` (diagnostic) : 3 colonnes (+ `.card--full` en pleine largeur).
- `.steps-grid` : 4 colonnes.
- `.journey-grid` : 3 colonnes.

### Nombre de colonnes mobile
- 1 colonne : `.services-grid`, `.paves` (<900px), `.modules`, `.cards` (<700px), `.steps-grid` (<600px), `.journey-grid` (<900px), `.audience-grid` (<520px).
- 2 colonnes intermédiaires : `.audience-grid` (900px), `.cards`, `.steps-grid` (1100px).

### Breakpoints responsive utilisés dans le site
`1599px` / `1280px` (paliers de tailles de police fluides), `1300px` (taille/position du logo d'angle), `1100px` (grilles → 2 colonnes), `900px` (navbar empilée, logo d'angle masqué, grilles → 1 colonne), `768px`/`767px` (palier d'espacements), `700px`, `600px`, `520px` (dernières grilles → 1 colonne).

---

## Composants

### Header
- **Logo d'angle** (`.corner-logo`, `position:fixed; top:20px; left:32px; height:150px`, réduit à 90px sous 1300px, masqué sous 900px) : positionné **à gauche** depuis la V2 (auparavant à droite), et **cliquable** — enveloppé dans un lien `<a href="index.html">`, il ramène à l'accueil sur toutes les pages, y compris `index.html` elle-même.
- Navbar en pilule flottante et sticky (`.navbar`, fond noir translucide + `backdrop-filter:blur(18px)`), variante compacte `.navbar--compact` utilisée partout.
- **Il n'y a plus de lien « Retour à l'accueil » / « Retour à Formation »** (`.back-link`, ex-positionné à gauche à côté de la navbar) : cette classe a été retirée du HTML et du CSS. La fonction de retour est désormais assurée uniquement par le clic sur le logo d'angle.

### Menu
- `.nav-menu` en ligne (flex), chaque `.nav-item` peut ouvrir un `.dropdown` au survol/focus (fondu + translation verticale).
- Dernier item (`NOUS CONTACTER`) toujours mis en avant avec un dégradé `--color-primary → --color-primary-hover` permanent, et décalé à l'extrémité droite de la pastille nav (`margin-left:auto` sur ce `.nav-item`, le reste du groupe restant compact à gauche).

### Hero
Deux familles visuellement identiques (mêmes largeurs, mêmes animations) mais réservées à des contextes différents :
- `.hero` : page d'accueil uniquement.
- `.page-header` / `.page-hero` : toutes les pages internes.
- **`.hero-tagline--white`** : exception ponctuelle, `contact.html` uniquement — passe la tagline `.hero-tagline--home` en blanc au lieu de `--color-primary` (couleur par défaut de `.hero-tagline`/`.hero-tagline--home` sur toutes les autres pages, non touchée).

#### `.hero-veil-wrap` — voile + ligne de séparation (toutes les pages, référence : `developpement.html`)
Habillage "hero premium" appliqué de façon homogène sur les 27 pages du site (identique partout, seul le point d'ancrage HTML change selon la structure de chaque hero). Composants :
- **`.hero-veil-wrap`** : wrapper `position:relative` qui enveloppe le `.corner-logo` (ou `.chatbot-button` sur `index.html`, qui n'a pas de corner-logo), la `<nav>`, le bloc hero de la page (`.page-header`, `.page-hero`, `.hero`, `.diag2-hero`, `.rd-hero`, `.uc-hero` ou `.elig-hero` selon la page) ET `.hero-divider`. Logo et nav gardent leur rendu et leur `z-index` (90/100) inchangés malgré leur nouvel emplacement dans le DOM — `.corner-logo` est `position:fixed` et `.navbar` est `position:sticky`, tous deux positionnés indépendamment de leur ancêtre. Le wrapper démarre à `top:0` de la page réelle (pas seulement sous la nav) et sa hauteur s'arrête pile à la ligne de séparation : le `margin-bottom:160px` de `.hero-divider` se collapse hors de `.hero-veil-wrap` (aucune bordure/padding sur le wrapper), donc n'entre jamais dans sa hauteur.
- **`.hero-veil`** (`position:absolute; inset:0; height:100%; z-index:-1`) : ne remplace ni ne masque le fond du site (`body::before`/`::after`, image + voile sombre, toujours présents) — ajoute un halo radial bleu diffus derrière le H1 (`radial-gradient(ellipse 700px 420px at 50% 340px, rgba(primary,.22), transparent 70%)`) + un voile blanc **linéaire** uniforme sur toute la largeur, qui ne s'estompe que verticalement (`linear-gradient(180deg, rgba(255,255,255,.13) 0%, rgba(255,255,255,.07) 55%, transparent 100%)`). Aucune bordure, aucun rectangle visible.
- **`.hero-divider`** (+ `.hero-divider-dot`) : juste après le bloc hero, avant la section suivante — remplace `.scroll-indicator` (retirée sur toutes les pages utilisant ce composant, la ligne est désormais seule à marquer la fin de la hero). Trait `width:72%` (`max-width:900px`) × 1px, `margin:24px auto 160px`, dégradé horizontal à 5 arrêts (transparent → `rgba(primary,.12)` → `rgba(primary,.9)` au centre → `rgba(primary,.12)` → transparent) pour un fondu progressif aux extrémités, avec un point lumineux 5px au centre (`box-shadow` en halo).
- **Cas particuliers de placement** : les 5 `cas-usage-*.html` enveloppent tout leur contenu dans `<main class="uc-page">`, déplacé pour englober `.hero-veil-wrap` (logo+nav+hero+divider), le reste des sections continuant juste après dans le même `<main>`. `expertise-developpement.html` fait l'inverse : `.hero-veil-wrap` (et `.final-cta`) restent *hors* de `<main class="rd-page">`, qui a lui-même `max-width:1100px; margin:0 auto` (pensé pour les sections de contenu) — les y inclure ferait hériter la hero et le CTA de ce même plafond de largeur (bandes plus sombres sur les côtés, bug corrigé). `index.html` n'a pas de `.corner-logo` (remplacé par `.chatbot-button`, laissé hors du wrapper) et conserve son `.hero-logo-reveal` (canvas + halo + anneau animés) intact sous le voile. `conditions-eligibilite.html` (`.elig-hero.diag2-dot-bg`) garde son habillage propre (texture à points) : le voile s'ajoute derrière, sans le remplacer. Sur `diagnostic.html`, `.diag2-hero-strip` (les 3 points "Aucun prérequis technique…") est volontairement sorti de `.hero-veil-wrap` et placé juste après `.hero-divider` : la hero (et son voile) se limite au titre + texte d'intro, la ligne de séparation apparaît avant le bandeau de points, pas après. `.diag2-hero-strip{margin-top:-80px; padding-top:60px}` compense partiellement le `margin-bottom:160px` de `.hero-divider` (pensé pour un gros écart avant une section standard) pour un espacement au-dessus du bandeau plus généreux qu'un simple resserrement complet ; `.diag2-levels{padding-top:8px}` (au lieu de 56px) resserre fortement l'espace après le bandeau, avant "Trois niveaux".

- **`.cert-page .page-header`** (certifications.html) : padding haut/bas augmenté (`+40px` / `+80px` par rapport à `.page-header` standard) pour une hero de hauteur comparable aux autres pages (référence : partenaires.html) — espacement interne titre/intro inchangé, `.hero-veil`/`.hero-divider` suivent automatiquement la nouvelle hauteur du contenu.
- **`.rd-hero`** (expertise-developpement.html) : même correctif, `padding:calc(var(--gap-header-hero) + 40px) 0 80px` (au lieu de `var(--gap-header-hero) 0 0`) pour une hero de hauteur comparable aux autres pages (référence : partenaires.html).
- **`.rd-steps`** (3 étapes recto-verso, expertise-developpement.html) : `display:grid; grid-template-columns:repeat(3,1fr)` (2 sous 900px, 1 sous 600px) au lieu d'un empilement vertical de cartes longues. Chaque `.rd-step-card` est un carré (`aspect-ratio:1/1`, largeur = hauteur, identique sur les 3) plutôt qu'une bande horizontale. Le flip 3D est inchangé dans son mécanisme (`.rd-flip-inner` tourne à 180° via `.is-flipped`, ajouté/retiré par `js/rd-flip.js`) mais `.rd-flip-front` passe désormais en `position:absolute; inset:0` (comme `.rd-flip-back` déjà avant) pour se superposer exactement dans le carré, et son contenu passe d'une ligne horizontale (numéro + titre + bouton côte à côte) à une colonne verticale : `.rd-step-number` en haut, `.rd-step-title` en dessous, `.rd-step-more` (`margin-top:auto`) plaqué en bas de la carte — au même niveau sur les 3 cartes quelle que soit la longueur du titre. `.rd-flip-back{overflow-y:auto}` en filet de sécurité si un texte au dos dépassait la hauteur du carré sur un très petit écran.
- **`.rd-booster-link`** (expertise-developpement.html) : passe en `display:block; width:fit-content; margin:0 auto` (au lieu de `inline-block`) pour être centré horizontalement dans `.rd-booster-card`, sans changer l'alignement des paragraphes du bloc.
- **`.rd-section-head h2`** (tous les titres de section, expertise-developpement.html) : taille réduite à `clamp(18px,2.2vw,24px)` (au lieu de `clamp(24px,3vw,32px)`) et repassé en `white-space:nowrap` pour tenir sur une seule ligne (repli `white-space:normal` sous 600px pour éviter tout débordement horizontal sur mobile).
- **`.rd-result-stats`** (section "résultats concrets", expertise-developpement.html) : remplace l'ancien grand encadré de texte (`.rd-result-panel`, supprimé) + les 2 `.rd-mini-card` (supprimées) par 4 cartes-stats sur une ligne (`grid-template-columns:repeat(4,1fr)`, 2 sous 900px, 1 sous 520px), même identité visuelle que les autres cartes de la page. Chaque `.rd-result-stat` centre verticalement/horizontalement un `.rd-result-stat-value` (gros libellé, `.rd-result-stat-value--num` agrandit spécifiquement le "30+" en traitement chiffre-clé) + un `.rd-result-stat-label` en dessous. Le texte d'intro sous le titre est repassé en `.rd-section-intro` (même composant court/centré que les autres sections de la page) à la place du long paragraphe encadré. Apparition au scroll : réutilise tel quel `.rd-reveal-item` (fondu + `translateY`, stagger par `nth-child`, déjà actif sur cette section via `.rd-reveal`) — aucun CSS/JS supplémentaire nécessaire.

### Sections
Blocs de contenu toujours centrés, largeur maximale + padding horizontal fixe (voir « Mise en page »). Familles principales : grilles de cartes, panneaux « highlight » (fond dégradé translucide), `.callout` (panneau sombre, alterne le ton avec les autres sections), `.final-cta`/`.bottom-cta` (CTA de fin de page).

### Cartes
Famille unifiée `.card` / `.pave` / `.module` / `.audience-card` / `.journey-frame` : fond dégradé **sombre** (`surface-soft → surface`), `border-radius:var(--radius)`, bordure `rgba(primary,.12)`, ombre `--shadow`, hover = léger soulèvement (`translateY(-6px)`) + bordure `rgba(primary,.30)` + `--shadow-hover` (halo bleu). Variante `.step-content--dark|--blue|--pale|--light` pour les cartes d'étape : depuis la V2, les 4 tons sont tous sombres (noir plein, surface teintée bleu, surface claire, dégradé translucide clair sur surface) — il n'y a plus de tons clairs/blancs.

### Boutons
Voir « Couleurs des boutons ». Un seul bouton plein en dégradé (`.cta-button`), une étiquette-pilule translucide de carte (`.card-title`/`.pave-title`), un lien texte avec flèche (`.pave-link`).

### Listes
`.g2m-list` : puces personnalisées (chevron en `mask-image` SVG, couleur `--color-primary`), pas de `list-style` natif.

### Images
- Illustrations d'étape/parcours (`.step-visual`, `.journey-visual`) : ratio `3/4`, `object-fit:cover`, fond `rgba(surface,.82)` + bordure pointillée `rgba(primary,.24)` tant qu'aucune image n'est présente.
- Logos (`.corner-logo`, `.footer-logo`, `.hero-logo`) : cercle (`border-radius:50%` sauf `.corner-logo`).

### Icônes
Toutes les icônes (flèches, chevrons de liste) sont des SVG inline encodés en `mask-image` colorées via `background-color:currentColor` ou une couleur de variable — aucune police d'icônes, aucun fichier SVG externe.

### Formulaires
Aucun formulaire HTML natif présent actuellement sur le site (le contact passe par un lien `mailto`/ancre `#contact`). À concevoir en cas de besoin en réutilisant les couleurs, rayons et ombres existants (pas de nouveau style de champ sans validation).

### Footer
`.site-footer` > `.footer-inner` (carte quasi noire arrondie, halo radial primaire en haut, `display:flex` centré) > `.footer-logo` + `.footer-info` (nom, tagline, coordonnées, lien mentions légales). Identique sur toutes les pages, sans variation.

### Logos partenaires / certifications
Composant ajouté pour `partenaires.html` et `certifications.html` (logos externes tiers, à ne pas confondre avec les logos G2M ci-dessus) :
- **`.partner-logos`** : grille (`.section-preview`-like, `repeat(auto-fit, minmax(160px, 1fr))`), utilisée quand les logos n'ont besoin d'aucun texte d'accompagnement (ex. réseau de partenaires, label).
- **`.partner-logo`** : plaque **blanche** (exception délibérée à la palette sombre V2, au même titre que `.final-cta .cta-button` — nécessaire ici car la plupart des logos externes sont sur fond transparent et illisibles posés directement sur le fond sombre du site), `border-radius:var(--radius)`, `box-shadow:var(--shadow-sm)`, hover = léger soulèvement. L'image à l'intérieur est centrée et cadrée en `object-fit:contain`.
- **`.card-logo`** : variante plus légère, une simple image (hauteur 64px, centrée, `object-fit:contain`) posée directement en haut d'une `.card` existante, sans plaque blanche — réservée aux logos déjà auto-porteurs sur fond sombre (badges circulaires type Qualiopi/Bpifrance/CIR). À utiliser uniquement quand le logo lui-même a déjà un fond opaque/coloré suffisant pour rester lisible sur une carte sombre ; sinon préférer `.partner-logo`.

### À propos — valeurs, chiffres-clés, équipe (`a-propos.html`)
Composants repris de la maquette CSS fournie séparément pour cette page (fond de bannière dégradé, halos plein cadre, bordures animées) — deux exceptions de couleur ponctuelles (`#2B2F37`, dans `.page-header--wide` et `.intro-banner`) s'ajoutent à `#0078D4` dans la liste des HEX documentés hors palette.
- **`.page-header--wide`** : bannière plein cadre (`max-width:none`) avec dégradé `--color-dark → #2B2F37 → --color-primary` + deux halos radiaux + filets `border-top/bottom` ; `h1` en `--color-primary`, `.intro`/`.hero-tagline--home` en blanc.
- **`.method-intro--sm-title`** : `h2` à `24px` ; combiné avec elle, `.method-intro p` passe en `--color-primary`, `16px`. Utilisée pour "Nos valeurs" (a-propos.html) : encadré retiré (`background:none;border:none;box-shadow:none`), ne garde que `padding:0 24px` (plus de padding vertical, plus de fond/bordure carte) — le titre et le sous-titre restent posés directement sur le fond sombre de la page comme les autres titres de section (même écart titre/sous-titre, régi par `--gap-title-intro`, commun à tout le site).
- **`.audience-section--accent-intro`** : le paragraphe d'intro passe en `--color-primary` ; le `h2` réduit sa marge basse à 8px.
- **`.values-frieze`** (+ `.values-frieze-item`, `.values-frieze-body`, `.values-frieze-title`, `.values-frieze-text`, `.values-frieze-divider`) : "Nos valeurs" (Engagement/Compétences/Sens du résultat) — remplace les 3 cartes `.cards--light` (supprimées) par 3 lignes horizontales éditoriales, sans encadré. Chaque `.values-frieze-item` est en `flex` (icône `flex:none` à gauche + `.values-frieze-body` `flex:1` à droite, `align-items:center` pour centrer verticalement l'icône sur le bloc titre+texte), titre/texte alignés à gauche, colonne `max-width:820px`. Séparées par `.values-frieze-divider` (trait pleine largeur du contenu × 1px, `linear-gradient` transparent → `rgba(primary,.5)` → transparent) — un seul entre chaque paire, aucun après la 3e valeur (juste absent du HTML, pas de `:last-child` à gérer). Sous 600px : `.values-frieze-item` repasse en colonne (icône au-dessus, tout centré). Titre (`.values-frieze-title`) en blanc, casse normale (Majuscule initiale uniquement, pas de `text-transform:uppercase`). **`.value-icon-frame` / `.value-icon`** : photo circulaire réduite à 110px (170px dans la version verticale précédente, 140px dans l'ancienne version carte), plus de chevauchement `margin-top` négatif ; entourée d'un anneau conique animé (`@property --ring-angle`, 0°→360°) déclenché par `.values-frieze-item:hover`.
- **`.card--border-draw`** (+ `@property --card-border-angle`) : liseré conique (`conic-gradient` masqué en anneau) qui se "dessine" de 0° à 360° au survol (1.6s ease). Combiné à `.card--full` (via `.card--full.card--border-draw`, absent de `.card--full` de `diagnostic.html`) : fond `#212C40`, `card-subtitle` 21px, `card-text`/`g2m-list` en blanc semi-gras, image non-logo en 320px max arrondie.
- **`.card--full--plain`** (NOTRE MISSION / NOTRE SAVOIR-FAIRE, a-propos.html) : retire uniquement le fond, la bordure statique, le padding, l'ombre et le liseré conique animé de `.card--border-draw` (y compris au survol) — texte et mise en page restent identiques à `.card--full.card--border-draw` standard, simplement affichés à même le fond de la page plutôt que dans un encadré. La photo de NOTRE SAVOIR-FAIRE a depuis été retirée du HTML ; celle de NOTRE MISSION reste, élargie à `max-width:440px` (au lieu de 320px). Structure interne de cette carte revue : `.card--full-heading` (titre + sous-titre bleu, pleine largeur) sort de la ligne flex texte+photo, qui devient `.card--full-row` (nouveau, remplace le rôle de contexte de stretch auparavant tenu par `.card--full` lui-même) contenant `.card--full-text` (paragraphe + liste) et `.card--full-media`. Résultat : la photo (`align-self:stretch` + `object-fit:cover`, sans hauteur intrinsèque propre) s'aligne uniquement sur `.card--full-text` — elle commence au niveau de la première ligne du texte, pas du titre, et finit à la dernière ligne. `.card--full-row{flex-direction:column}` sous 700px (texte et photo empilés). `.card-subtitle` (le titre "NOTRE MISSION"/"NOTRE SAVOIR-FAIRE") et `.journey-subtitle` (le sous-titre bleu, "Qui donne du sens à notre travail…") y sont centrés (`text-align:center`, au lieu de `left` par défaut) — le second nécessite `.card--full.card--border-draw.card--full--plain .journey-subtitle` (4 classes) pour gagner en spécificité sur la règle existante `.card--full.card--border-draw .journey-subtitle{text-align:left}`.
- **`.sf-cards`** (+ `js/sf-cards-reveal.js`) : les 3 puces `.g2m-list` de "Notre savoir-faire" sont devenues 3 `.card.card--border-draw` classiques (texte des 3 puces inchangé mot pour mot, simplement scindé à la césure `:` déjà présente en titre `.sf-card-title` gras + `.card-text` descriptif, avec `.sf-card-icon` — SVG inline blanc, 32px — au-dessus). Fond bleu translucide (`rgba(primary,.55)`), contenu centré ; la bordure (statique et liseré conique animé au survol) est en blanc plutôt qu'en `--color-primary` — même traitement que `.cards--expertise` (developpement.html). Apparition au scroll dédiée (même schéma `IntersectionObserver` → `.is-inview` une seule fois) : fondu + `translateY(24px)→0` en 0.6s ease-out, stagger 0.12s par carte ; le hover (`translateY(-6px)`) reste actif après coup via une règle de spécificité supérieure, comme `.cards--sky`.
- **`.stats-row-title`** : titre "G2M en chiffres" posé sur le fond sombre de la page, juste au-dessus du bandeau `.stats-row` — porte lui-même la marge haute responsive (170/130/90px) que `.stats-row` portait auparavant (`.stats-row` n'a plus qu'un `margin-top:32px` pour rester proche de son titre). `h2` centré, blanc, `font-size:24px` (même taille que les autres titres de section de la page, voir note ci-dessous).
- **`.stats-row`** (+ `.card--border-draw`, `--card-border-draw-radius:0px`) : bandeau plein cadre 4 colonnes (2/1 sous 700/420px), plaque `rgba(255,255,255,.35)` sans arrondi ; `.stat-number` (Montserrat 700, `clamp(44px,5.2vw,68px)`, `--color-primary`) + `.stat-label` (Inter 600, 14px, blanc).
- **Titres de section unifiés (page `a-propos.html`)** : "Notre mission" / "Notre savoir-faire" (`.card--full.card--border-draw .card-subtitle`), "Nos valeurs" (`.method-intro--sm-title h2`), "G2M en chiffres" (`.stats-row-title h2`) et "Notre équipe" (`.audience-section--accent-intro h2`) partagent désormais tous la même taille fixe `font-size:24px` (plus de `clamp()` ni d'héritage de la taille 28px partagée par `.audience-section h2` ailleurs sur le site).
- **`.team-grid`** : flexbox centré, cartes en `flex-basis` 1/3 (2 sous 700px, 1 sous 520px). **`.team-card`** : dégradé teinté primary→surface, bordure `rgba(primary,.40)`. `.team-card-top` (photo + titre, colonne sous 480px), `.team-photo` (130px, cercle), `.team-card h3`, `.team-role` (italique, majuscules, `--color-gray`), `.team-expertise`, `.team-link` (texte simple `--color-primary` → `--color-secondary`). `.team-group-title` centré au-dessus de chaque groupe (marge haute plus large pour le premier).

### Développement — bandeau intro, expertises, méthodologie, gages de confiance (`developpement.html`)
Même origine que la section À propos ci-dessus (maquette CSS dédiée) ; nécessite `<body class="page-developpement">` pour scoper les redéfinitions de `.diag-intro` sans affecter `diagnostic.html` / `expertise-data-ia.html` / `expertise-metier-ia.html` (qui utilisent `.diag-intro.diag-intro--compact`, non touché).
- **`.intro-banner`** : bandeau plein cadre, fond dégradé `--color-dark → #2B2F37 → --color-primary`, texte (55%) + photo (40%, `max-width:460px`), colonne sous 900px.
- **`body.page-developpement .diag-intro`** : panneau sans encadré (texte centré directement sur le fond de page) — `.overline` devient le grand titre blanc, `h2` devient un sous-titre bleu 16px.
- **`.cards--expertise .card`** : plaque `rgba(var(--color-primary-rgb),.55)`, texte blanc avec ombre portée. Survol sobre et haut de gamme plutôt qu'un cadre épais : liseré conique animé (`.card--border-draw::before`) ramené à `padding:1.5px` (au lieu de 5px) et adouci en `rgba(255,255,255,.85)` (au lieu de `--color-white` plein), transition accélérée à 0.3s ease-out (au lieu de 1.4s) pour une apparition franche mais discrète. Au survol de la carte : `border-color` passe à `rgba(255,255,255,.5)` (repos `.35`), fond légèrement éclairci (`rgba(primary,.62)` au lieu de `.55`) et `box-shadow` gagne un très léger halo blanc (`0 0 22px rgba(255,255,255,.08)`) en plus de `--shadow-hover` — le tout en 0.3s ease-out, sans miser sur l'épaisseur de bordure. `.expertise-icon` : centré en haut de carte dans `.expertise-icon-wrap` (120px, position:relative) au lieu du coin bas-droit ; `.expertise-icon--transparent` retire la plaque blanche (toujours utilisée en combo dans le HTML). Icône à 90px, recolorée en blanc au pixel près (6 fichiers `images/developpement-expertise-*-white.webp`, générés depuis les `.webp` d'origine bleu marine — alpha conservé, RGB forcé en blanc — pour rester lisibles en blanc pur sur fond de carte bleu plutôt qu'en marine sur plaque blanche). `.expertise-icon-orbit` (120px, concentrique à `.expertise-icon`, `z-index:1` sous l'icône à `z-index:2`) : anneau de particules (6 `.orbit-dot`, 3-5px, mélange blanc/bleu primary/primary-hover, intensités de halo variées) qui gravitent en continu autour de l'icône sur 3 rayons (40/50/58px), rotation `linear` infinie (7s/8.5s/10.5s par paire, `animation-delay` négatif différent par anneau pour déphaser leur position de départ sans trajectoire par angle) + scintillement d'opacité indépendant par point (2.6-4s ease-in-out, désynchronisé de la vitesse de rotation) pour un rendu organique plutôt que mécanique. La rotation tourne en permanence en arrière-plan (évite tout à-coup au déclenchement) mais `.expertise-icon-orbit` reste à `opacity:0` au repos : seul le survol de toute la carte (`.cards--expertise .card:hover`, pas seulement de l'icône) le fait apparaître en fondu (0→1, 0.3s ease-out). L'icône elle-même reste totalement statique (aucune translation, flottement ni zoom, aucun hover propre). `.expertise-toggle` n'a plus de `min-height` fixe (supprimé — c'est lui qui créait le grand vide sous la flèche via le `margin-top:auto` du chevron) : la carte fermée s'ajuste désormais à son contenu réel. `.expertise-chevron{margin-top:10px}` (au lieu de `margin-top:auto; padding-top:20px`) et `.cards--expertise .card{padding-top/bottom:calc(var(--card-padding) * 0.65)}` réduisent le padding vertical de la carte — l'ensemble vise ~25-35% de hauteur en moins à l'état fermé, sans toucher à la largeur ni à la grille à 3 colonnes.
- **Accordéon des 6 cartes d'expertise** (+ `js/expertise-accordion.js`) : chaque carte est fermée par défaut (hauteur fortement réduite) et s'ouvre indépendamment des autres (plusieurs peuvent rester ouvertes en même temps). `.expertise-toggle` est un vrai `<button>` (icône + `.card-subtitle` + `.expertise-chevron`, `min-height:230px`, `aria-expanded` togglé en JS) qui pilote `.expertise-panel` (contenu = `.g2m-list`, id ciblé par `aria-controls`). Ouverture/fermeture en `grid-template-rows:0fr→1fr` (transition 0.4s ease-out) plutôt qu'un `max-height` fixe, pour une hauteur exacte quelle que soit la longueur de la liste ; `.expertise-panel-inner{overflow:hidden;min-height:0;}` est indispensable au fonctionnement de la technique. Le contenu de la liste suit avec un fondu + `translateY(10px)→0`. `.expertise-chevron` pivote à 180° via `.card.is-open`. `.cards--expertise .card` passe en `height:auto; align-self:start` (au lieu du stretch par défaut de `.cards`) pour qu'une carte ouverte n'étire pas ses voisines de la même ligne. `prefers-reduced-motion:reduce` coupe les trois transitions (panneau, liste, chevron) sans changer le comportement d'ouverture lui-même.
- **`.methodology`** : parcours horizontal de 6 `.milestone` reliés par des `.milestone-connector` (empilés, connecteurs masqués sous 900px). `.milestone-circle` (96px) reste neutre (gris) au repos et ne passe en `--color-primary` qu'en `.is-active` (ajouté au survol par `js/methodology.js`, avec rotation `.milestone-num.is-spinning`). **`.milestone-connector--dashed`** (Étape 5 → 6, "Maintenance" → "Mise à niveau") : remplace le trait plein (`background-image` uni) par un `repeating-linear-gradient` en pointillé, même couleur/opacité — distingue cette transition optionnelle du reste du parcours.
- **`.paves--spaced`** : marge supérieure additionnelle (`--spacing-section`).
- **`.paves--linked`** : au survol (ou `.pave.is-linked`, ajouté par `js/pave-links.js`), un `.pave-connector` SVG au-dessus de la carte se "dessine" (`stroke-dashoffset` séquencé) jusqu'à un nœud final `--end` qui pulse en continu.
- **`.pave-badge`** : badge circulaire 104px avec animation d'entrée et léger zoom au survol de la carte — alternative à `.pave-link` pour une carte qui se termine par un visuel plutôt qu'un lien.
- **`.pave-desc--justify`** : variante de `.pave-desc` en `text-align:justify`.
- **`.paves--linked`** passe en grille 4 colonnes sur une seule ligne (`grid-template-columns:repeat(4,1fr)`, au lieu des 3 colonnes par défaut de `.paves`) depuis l'ajout d'un 4e encadré "Recherche &amp; développement" — scopé à cette classe pour ne pas affecter un futur `.paves` à 3 éléments ailleurs sur le site. `max-width:1400px` (au lieu de 1100px pour `.paves` standard) — aligné sur la largeur de `.cards` (les 6 cartes bleues "Nos expertises techniques" plus haut sur la même page), pour que les 2 grilles occupent exactement la même largeur.
- **`.pave-title--nowrap`** : force `white-space:nowrap` sur un `.pave-title` isolé — utilisé sur "Recherche &amp; développement" pour rester sur une seule ligne malgré la colonne plus étroite d'une grille à 4.
- **`.paves--linked .pave-title`** : `font-size:12px` (au lieu de 13px par défaut) pour les 4 pastilles-titres, légèrement réduites pour mieux s'intégrer aux colonnes plus étroites de cette grille à 4. Repli responsive dédié (même paliers que `.audience-grid`) : 2 colonnes sous 900px, 1 colonne sous 520px. `.paves--linked .pave{min-height:400px; min-width:0;}` aligne les 4 cartes à la même taille — le `min-width:0` est nécessaire car un item de grille garde par défaut un `min-width:auto` (basé sur son contenu le plus large, ex. un lien qui ne casse pas), ce qui aurait sinon rendu les colonnes `1fr` inégales entre elles malgré la grille à 4 colonnes égales.

### Nous rejoindre — carrière, valeurs (`nous-rejoindre.html`)
- **`.rej-section-title`** : titre autonome centré (blanc, `clamp(18px,2.2vw,26px)`), sans panneau ni paragraphe associé — utilisé pour "Ce que vous gagnez concrètement en nous rejoignant.", juste au-dessus des 3 cartes Construire/Agir/Grandir. Ces 3 cartes réutilisent tel quel `.cards--sky` (défini pour `approche.html`, cf. plus haut) — même plaque bleu ciel translucide et même apparition au scroll (`js/appr-cards-reveal.js` chargé aussi sur cette page).
- **`.rej-values`** : liste "en escalier" des 3 valeurs (Autonomie/Esprit d'équipe/Bienveillance), reprise de la maquette. `.rej-values h2` ("Les valeurs qui nous rassemblent") reprend la même taille réduite que `.rej-section-title` (`clamp(18px,2.2vw,26px)`, blanc). Chaque `.rej-value` est un bloc empilé (grand numéro `.rej-value-num` + libellé majuscule `.rej-value-label`) séparé par un filet `border-bottom` ; l'indentation croissante (`margin-left:8%/16%` sur les lignes 2 et 3, réduite à 4%/8% sous 700px) crée l'effet de décalage diagonal de la maquette — pas de couleur hors palette.
- **`.rej-value-num`** (+ `js/rej-values-reveal.js`) : les chiffres "01/02/03" ne sont plus du texte mais des glyphes Montserrat Bold extraits en tracés SVG (`fontTools`, unités de la fonte 1000, groupe `transform="translate(0,720) scale(1,-1)"` pour repasser en repère écran) — nécessaire pour obtenir un vrai effet de tracé à la main, impossible sur du texte HTML. Chaque chiffre a 2 calques superposés : `.rej-num-stroke` (`fill:none`, `pathLength="1"` pour piloter `stroke-dashoffset:1→0` indépendamment de la longueur réelle du tracé, 2.2s ease-out) puis `.rej-num-fill` (`fill-opacity:0→1`, 1s, délai 2.2s) une fois le contour terminé, puis `.rej-value-label` (`opacity:0→1` + `translateY(10px)→0`, 0.8s, délai 3.2s). Déclenchement indépendant par `.rej-value` (une `IntersectionObserver` par élément, une seule fois chacune) plutôt qu'un déclenchement de section global. Tout désactivé sous `prefers-reduced-motion:reduce`.

### Notre approche — principes de travail, engagements, sécurité (`approche.html`)
- **`.appr-icon`** : médaillon circulaire blanc 48px posé en tête d'une `.card` classique, pour les 2 séries de 3 cartes (principes de travail / gages de confiance hébergement). Contenu = icône SVG inline 26px (`stroke="currentColor"`) dans la plupart des cas, ou une image PNG fournie (traits recolorés au pixel près, `.appr-icon img` 26px `object-fit:contain`) pour 2 cartes ("Sur-mesure", "Indépendance technologique") dont l'icône vient d'un visuel externe plutôt que d'un tracé SVG. Les deux formats partagent la même couleur "bleu nuit" (`--color-surface-soft`, `#101A2B`) et la même taille, pour rester identiques quel que soit le support d'origine de l'icône.
- **`.appr-pills`** (sur `.tag-list`) + **`.appr-pill`** (sur `.badge`) : les 4 badges d'engagement (Budget/Délais/Livrables/ROI mesurable) passent en `inline-flex` pour aligner une icône SVG 16px avant le libellé, sans changer la couleur ni la forme du `.badge` existant.
- **`.cards--sky`** : les 3 cartes de principes de travail (juste sous le texte introductif) passent en plaque bleu ciel translucide (`rgba(var(--color-primary-rgb),0.55)`, même traitement que `.cards--expertise` de `developpement.html`), texte blanc avec ombre portée pour la lisibilité sur le fond sombre de la page. Apparition au scroll (+ `js/appr-cards-reveal.js`, même convention `IntersectionObserver` → `.is-inview` une seule fois) : chaque `.card` part de `opacity:0` / `translateY(30px) scale(0.97)` et rejoint son état final en 2.8s ease-out (transform+opacity uniquement), décalée de 550ms par carte (0/0.55/1.1s) ; le hover (`translateY(-6px)`) reste actif après coup via une règle dédiée de spécificité supérieure. Désactivé sous `prefers-reduced-motion:reduce`.
- **`.appr-timeline`** (+ `js/appr-timeline-reveal.js`) : remplace les 3 cartes "Hébergement fiable / certifié / Infrastructure responsable" par une timeline verticale (même contenus, textes et icônes inchangés). `.appr-timeline-line` (trait bleu 2px à gauche) se dessine du haut vers le bas (`scaleY(0)→1`, transform-origin haut, 5.5s ease-out) une fois `.is-inview` ajouté (une seule fois). Chaque `.appr-timeline-step--1/2/3` révèle son icône (`.appr-timeline-dot svg/img`, fondu opacity), son halo (`.appr-timeline-dot::after`, radial-gradient primary) et son `.appr-timeline-content` (`opacity:0→1` + `translateX(20px)→0`, 0.5s ease-out) avec un délai croissant (0.2s/2.75s/5.3s) simulant la progression de la ligne. Au survol d'une étape : halo plein, léger anneau `box-shadow` sur le point, `text-shadow` bleu sur le titre — sans rebond ni rotation. Icône/point = `.appr-icon` existant (cercle blanc 48px, icône navy 26px), simplement replacé en tête de ligne au lieu d'en tête de carte. Le texte (`.appr-timeline-content .card-subtitle`/`.card-text`) passe à 17px (au lieu des 15px par défaut de `.card-*`) pour s'aligner sur la taille des autres paragraphes de la page (`.page-header .intro`, `.method-intro p`) ; `.card-text` reçoit aussi `max-width:800px` pour égaler la largeur de bloc du paragraphe d'intro juste au-dessus (`.method-intro p`), au lieu de s'étirer sur toute la largeur du bloc `flex:1`. Tout désactivé sous `prefers-reduced-motion:reduce` (état final affiché directement).
- **`.method-intro--no-frame h2`** : combiné à `.method-intro--no-frame` (déjà existant, cf. plus haut), le `h2` passe en blanc et en taille réduite (`clamp(18px,2.2vw,26px)` au lieu de `clamp(24px,3.2vw,42px)`) — utilisé pour les titres "Des engagements clairs" et "La sécurité de vos données, sans compromis." une fois l'encadré retiré. `.method-intro--no-frame` gagne aussi un `margin-top:calc(var(--spacing-section) * 2)` (au lieu des 56px de base de `.method-intro`), pour aérer l'espace après les 3 cartes bleu ciel et avant "La sécurité de vos données...".
- **`.appr-section-title`** : titre autonome (pas de paragraphe associé, pas de panneau) reprenant exactement le style `h2` de `.method-intro--no-frame` (blanc, `clamp(18px,2.2vw,26px)`, centré) — utilisé pour "Les piliers de notre accompagnement", juste avant les 3 cartes bleu ciel.
- **`.appr-pills-wrap`** (+ `js/appr-pills-reveal.js`) : révélation au scroll des 4 capsules d'engagement (Budget/Délais/Livrables/ROI mesurable), même convention `IntersectionObserver` → `.is-inview` (une seule fois) que `.diag2-steps-list` / `.formation-network`. Au passage en vue : les 4 `.appr-pill` remontent (`translateY(26px)→0`) et passent de `opacity:0→1` en 0.7s, décalées de 200ms chacune (transform+opacity uniquement) ; puis `.appr-pills-line` (trait dégradé bleu épais et lumineux, `scaleX(0)→1`, transform-origin gauche) se dessine sur 1.6s, et chaque `.appr-pill::after` reçoit un bref halo (`apprPillGlow`, radial-gradient primary, opacity seule) synchronisé au passage du trait. Trait masqué sous 800px (les capsules peuvent passer en plusieurs lignes) ; tout désactivé sous `prefers-reduced-motion:reduce` (état final affiché directement).

---

## Fond de page (image + voile)

Depuis la refonte V2, la page dispose d'une image de fond générale, ajoutée en plus du dégradé/halos déjà présents sur `body` — sans jamais modifier le HTML, ni impacter la mise en page.

- **`body::before`** — porte l'image `images/Image_fond.png` :
  - `position:fixed` + `top/left:0` + `width/height:100%` : couvre tout le viewport, en dehors du flux normal (aucun impact sur la disposition des éléments).
  - `background-size:cover`, `background-position:center`, `background-repeat:no-repeat`, `background-attachment:fixed`.
  - `opacity:0.45` — volontairement plus élevée que la fourchette initialement prévue (12–18%) : l'image source (`Image_fond.png`) est elle-même très sombre (mesh de points façon carte du monde, tons bleu nuit/noir), donc à 12–18% elle devenait quasiment invisible une fois combinée au dégradé de `body` et au voile de contraste.
  - `z-index:-2` : reste toujours derrière le fond propre de `body` (halos/dégradé) ET derrière tout le contenu réel (cartes, textes, navbar), qui sont peints par-dessus dans l'ordre normal du document.
  - `pointer-events:none` : n'intercepte aucun clic.
- **`body::after`** — voile sombre `rgba(var(--color-black-rgb), 0.20)`, même technique (`position:fixed`, `z-index:-1`) : se pose entre l'image et le contenu réel pour garantir le contraste des textes, quel que soit l'endroit de la page.

Le motif de l'image reste visible en continu (image fixe, ne défile pas avec la page) dans tous les espaces « vides » du fond (entre les cartes, dans les panneaux translucides comme `.diag-intro`), tandis que les cartes elles-mêmes (fond opaque en verre) et le contenu textuel restent parfaitement nets et lisibles au-dessus.

---

## Effets visuels

### Ombres
Trois niveaux, neutres (noir pur) avec halo bleu ajouté au hover fort : `--shadow-sm`, `--shadow`, `--shadow-hover` (`0 28px 90px rgba(0,0,0,.44), 0 0 36px rgba(primary,.14)`).

### Bordures
`1px solid rgba(primary, X%)` très discrètes (10–14% d'opacité au repos, jusqu'à 30% au hover fort) sur cartes, navbar, panneaux. Bordure en pointillés (`dashed`, teintée primaire) réservée aux zones d'image en attente de contenu (`.step-visual`, `.journey-visual`).

### Arrondis
`--radius-sm` (10px, petits éléments), `--radius` (14px, cartes), `--radius-lg` (24px, panneaux/step-content), `--radius-xl` (36px, grands panneaux/CTA/footer), `--radius-pill` (999px, boutons/badges/navbar).

### Effets au survol
- Cartes : `translateY(-6px)` + bordure `rgba(primary,.30)` + halo bleu (`--shadow-hover`).
- Boutons : `translateY(-3px)` + dégradé qui se décale vers le cyan (`primary-hover → secondary`) + halo lumineux + flèche qui glisse.
- Liens texte (`.pave-link`, `.footer-legal`, `.legal-content a`) : couleur qui bascule vers `--color-secondary` ou `--color-primary` + flèche qui glisse (le cas échéant).
- Navigation : fond translucide `rgba(primary,.14)` au survol/focus.

### Transitions
`0.2s–0.25s ease` sur `transform`, `background`, `box-shadow`, `color`, `border-color` — jamais plus long, jamais d'easing custom.

### Animations
`fadeInUp` (translation + fondu, 0.6–0.7s) sur les hero/en-têtes de page et sur les cartes, avec délais échelonnés par `nth-child` (0.08s / 0.16s / 0.24s) pour un effet de cascade. `prefers-reduced-motion: reduce` désactive globalement animations et transitions.

---

## Règles d'utilisation

- **Réutiliser les couleurs existantes** : toute nouvelle couleur doit être l'une des variables `:root` ci-dessus (ou une transparence `rgba()` de celles-ci). Ne pas introduire de nouveau HEX sans raison documentée (`#0078D4` est déjà une exception ponctuelle, ne pas en ajouter d'autres).
- **Réutiliser les classes CSS existantes** : les familles de composants (`.card`/`.pave`/`.module`/`.audience-card`/`.journey-frame`, `.hero`/`.page-header`/`.page-hero`) sont volontairement mutualisées dans `style.css`. Étendre une famille existante plutôt qu'en créer une nouvelle.
- **Ne pas créer de style inline** : tout style passe par `css/style.css`.
- **Ne pas multiplier les variantes de boutons** : se limiter à `.cta-button` (dégradé plein), `.card-title`/`.pave-title` (étiquette-pilule translucide) et `.pave-link` (lien texte + flèche).
- **Conserver une cohérence entre toutes les pages** : header (logo à gauche cliquable, navbar), footer, largeurs de contenu, espacements et animations doivent rester identiques sur l'ensemble du site (voir `page_template.html`).
- **Image de fond** : ne pas dupliquer `body::before`/`body::after` ailleurs ; toute page qui inclut `css/style.css` en hérite automatiquement.
