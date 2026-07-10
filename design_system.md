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
- Dernier item (`NOUS CONTACTER`) toujours mis en avant avec un dégradé `--color-primary → --color-primary-hover` permanent.

### Hero
Deux familles visuellement identiques (mêmes largeurs, mêmes animations) mais réservées à des contextes différents :
- `.hero` : page d'accueil uniquement.
- `.page-header` / `.page-hero` : toutes les pages internes.

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
- **`.method-intro--sm-title`** : `h2` ramené à `clamp(22px,2.8vw,34px)` ; combiné avec elle, `.method-intro p` passe en `--color-primary`.
- **`.audience-section--accent-intro`** : le paragraphe d'intro passe en `--color-primary` ; le `h2` réduit sa marge basse à 8px.
- **`.cards--light`** : cartes en plaque translucide claire (`rgba(255,255,255,.35)`), `.card-subtitle` centré/majuscules, `.card-text` blanc justifié — pour les 3 cartes de valeurs.
- **`.value-icon-frame` / `.value-icon`** : photo circulaire 140px, remontée en chevauchement au-dessus de la carte (`margin-top` négatif), entourée d'un anneau conique animé (`@property --ring-angle`, 0°→360° au hover de la carte).
- **`.card--border-draw`** (+ `@property --card-border-angle`) : liseré conique (`conic-gradient` masqué en anneau) qui se "dessine" de 0° à 360° au survol (1.6s ease). Combiné à `.card--full` (via `.card--full.card--border-draw`, absent de `.card--full` de `diagnostic.html`) : fond `#212C40`, `card-subtitle` 21px, `card-text`/`g2m-list` en blanc semi-gras, image non-logo en 320px max arrondie.
- **`.stats-row`** (+ `.card--border-draw`, `--card-border-draw-radius:0px`) : bandeau plein cadre 4 colonnes (2/1 sous 700/420px), plaque `rgba(255,255,255,.35)` sans arrondi ; `.stat-number` (Montserrat 700, `clamp(44px,5.2vw,68px)`, `--color-primary`) + `.stat-label` (Inter 600, 14px, blanc).
- **`.team-grid`** : flexbox centré, cartes en `flex-basis` 1/3 (2 sous 700px, 1 sous 520px). **`.team-card`** : dégradé teinté primary→surface, bordure `rgba(primary,.40)`. `.team-card-top` (photo + titre, colonne sous 480px), `.team-photo` (130px, cercle), `.team-card h3`, `.team-role` (italique, majuscules, `--color-gray`), `.team-expertise`, `.team-link` (texte simple `--color-primary` → `--color-secondary`). `.team-group-title` centré au-dessus de chaque groupe (marge haute plus large pour le premier).

### Développement — bandeau intro, expertises, méthodologie, gages de confiance (`developpement.html`)
Même origine que la section À propos ci-dessus (maquette CSS dédiée) ; nécessite `<body class="page-developpement">` pour scoper les redéfinitions de `.diag-intro` sans affecter `diagnostic.html` / `expertise-data-ia.html` / `expertise-metier-ia.html` (qui utilisent `.diag-intro.diag-intro--compact`, non touché).
- **`.intro-banner`** : bandeau plein cadre, fond dégradé `--color-dark → #2B2F37 → --color-primary`, texte (55%) + photo (40%, `max-width:460px`), colonne sous 900px.
- **`body.page-developpement .diag-intro`** : panneau sans encadré (texte centré directement sur le fond de page) — `.overline` devient le grand titre blanc, `h2` devient un sous-titre bleu 16px.
- **`.cards--expertise .card`** : hauteur uniforme (355px min), plaque `rgba(255,255,255,.40)`, texte blanc avec ombre portée. `.expertise-icon` : médaillon circulaire blanc 76px en bas à droite de la carte (translation au hover) ; `.expertise-icon--transparent` retire la plaque. `.expertise-icon-fx` (+ `.eifx-line`, `.eifx-dot(--a/--b/--c)`) : effet "réseau de données" (traits en `stroke-dashoffset`, points lumineux, rotation 7s) qui n'apparaît qu'au survol de la carte.
- **`.methodology`** : parcours horizontal de 6 `.milestone` reliés par des `.milestone-connector` (empilés, connecteurs masqués sous 900px). `.milestone-circle` (96px) reste neutre (gris) au repos et ne passe en `--color-primary` qu'en `.is-active` (ajouté au survol par `js/methodology.js`, avec rotation `.milestone-num.is-spinning`).
- **`.paves--spaced`** : marge supérieure additionnelle (`--spacing-section`).
- **`.paves--linked`** : au survol (ou `.pave.is-linked`, ajouté par `js/pave-links.js`), un `.pave-connector` SVG au-dessus de la carte se "dessine" (`stroke-dashoffset` séquencé) jusqu'à un nœud final `--end` qui pulse en continu.
- **`.pave-badge`** : badge circulaire 104px avec animation d'entrée et léger zoom au survol de la carte — alternative à `.pave-link` pour une carte qui se termine par un visuel plutôt qu'un lien.
- **`.pave-desc--justify`** : variante de `.pave-desc` en `text-align:justify`.

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
