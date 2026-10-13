import { useEffect, useRef, useState } from "react";

const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;
const companies = [
  {
    id: "agro",
    name: "KF Agro",
    short: "Agro",
    sector: "Agronegócio",
    logo: "kf-agro.png",
    photo: "horizonte.webp",
    alt: "Horizonte rural com campos verdes e luz do entardecer",
  },
  {
    id: "air",
    name: "KF Air",
    short: "Air",
    sector: "Aviação",
    logo: "kf-air.png",
    photo: "air.webp",
    alt: "Helicóptero em voo diante de uma paisagem montanhosa",
  },
  {
    id: "servico",
    name: "KF Serviço",
    short: "Serviço",
    sector: "Serviços empresariais",
    logo: "kf-servico.png",
    photo: "servicos.webp",
    alt: "Ambiente profissional com mesa de reunião e luz natural",
  },
  {
    id: "maquinas",
    name: "KF Caminhões e Máquinas Pesadas",
    short: "Máquinas",
    sector: "Caminhões e máquinas pesadas",
    logo: "kf-caminhoes.png",
    photo: "maquinas.webp",
    alt: "Equipamentos pesados em uma paisagem industrial",
  },
  {
    id: "calcados",
    name: "VD Calçados",
    short: "Calçados",
    sector: "Varejo de calçados",
    logo: "vd-calcados.png",
    photo: "calcados.webp",
    alt: "Calçados de salto em uma composição de produto",
  },
];

const credits = [
  {
    name: "Jesse Gardner",
    label: "Horizonte rural",
    url: "https://unsplash.com/photos/qjSyQqqzKMg",
  },
  {
    name: "João Pedro Schmitz",
    label: "Lavoura vista do alto",
    url: "https://unsplash.com/photos/-hcAksTrih8",
  },
  {
    name: "Melanie Dretvic",
    label: "Helicóptero em voo",
    url: "https://unsplash.com/photos/Hp0FWPj02jo",
  },
  {
    name: "Nastuh Abootalebi",
    label: "Ambiente profissional",
    url: "https://unsplash.com/photos/eHD8Y1Znfpk",
  },
  {
    name: "Dominik Vanyi",
    label: "Máquinas pesadas",
    url: "https://unsplash.com/photos/Mk2ls9UBO2E",
  },
  {
    name: "Laura Chouette",
    label: "Calçados",
    url: "https://unsplash.com/photos/FFHOf-HvHZs",
  },
];

function Arrow({
  direction = "right",
}: {
  direction?: "right" | "down" | "up";
}) {
  return (
    <svg
      className={`arrow arrow-${direction}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function Wordmark({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`wordmark ${footer ? "wordmark-footer" : ""}`}
      href="#inicio"
      aria-label="Grupo KF, voltar ao início"
    >
      <span>Grupo</span>
      <strong>KF</strong>
    </a>
  );
}

function Logo({
  index,
  className = "",
}: {
  index: number;
  className?: string;
}) {
  const company = companies[index];
  return (
    <div className={`company-logo ${className}`}>
      <img
        src={asset(`logos/${company.logo}`)}
        alt={`Logotipo ${company.name}`}
        width="1448"
        height="1086"
        loading="lazy"
      />
    </div>
  );
}

function Photo({
  name,
  alt,
  className = "",
}: {
  name: string;
  alt: string;
  className?: string;
}) {
  return (
    <figure className={`photograph ${className}`}>
      <img
        src={asset(`photos/${name}.webp`)}
        alt={alt}
        loading="lazy"
        width="1600"
        height="1100"
      />
      <figcaption>Imagem representativa do segmento</figcaption>
    </figure>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstMenuLink = useRef<HTMLAnchorElement>(null);
  const heroTabs = useRef<(HTMLButtonElement | null)[]>([]);
  const company = companies[active];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) firstMenuLink.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
        <Wordmark />
        <nav
          id="main-navigation"
          aria-label="Navegação principal"
          className={menuOpen ? "navigation navigation-open" : "navigation"}
        >
          <a ref={firstMenuLink} href="#grupo" onClick={closeMenu}>
            O grupo
          </a>
          <a href="#negocios" onClick={closeMenu}>
            Nossos negócios
          </a>
          <a href="#horizontes" onClick={closeMenu}>
            Horizontes
          </a>
          <a
            className="navigation-explore"
            href="#empresas"
            onClick={closeMenu}
          >
            Conheça as empresas <Arrow />
          </a>
        </nav>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-controls="main-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span>{menuOpen ? "Fechar" : "Menu"}</span>
          <span className="menu-lines" aria-hidden="true" />
        </button>
      </header>

      <main id="conteudo">
        <section id="inicio" className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-intro">Uma visão que conecta.</p>
            <h1 id="hero-title">
              Diferentes
              <br />
              negócios.
              <br />
              Uma mesma
              <br />
              visão.
            </h1>
            <div className="hero-bottom">
              <p>
                Da terra ao céu.
                <br />
                Em cada negócio, novas possibilidades.
              </p>
              <a
                className="round-link"
                href="#grupo"
                aria-label="Conhecer o Grupo KF"
              >
                <Arrow direction="down" />
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div
              role="tabpanel"
              id="hero-panel"
              aria-labelledby={`hero-tab-${active}`}
              className="hero-image-wrap"
            >
              <img
                key={company.photo}
                className={`hero-image hero-image-${company.id}`}
                src={asset(`photos/${company.photo}`)}
                alt={company.alt}
                width="1600"
                height="1200"
                fetchPriority="high"
              />
              <div className="hero-image-label">
                <span>{company.sector}</span>
                <a href={`#${company.id}`}>
                  {company.name} <Arrow />
                </a>
              </div>
            </div>
            <div
              className="hero-selector"
              role="tablist"
              aria-label="Explore os segmentos do grupo"
            >
              {companies.map((item, index) => (
                <button
                  key={item.id}
                  ref={(element) => {
                    heroTabs.current[index] = element;
                  }}
                  role="tab"
                  id={`hero-tab-${index}`}
                  aria-controls="hero-panel"
                  aria-selected={active === index}
                  tabIndex={active === index ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => {
                    let next = index;
                    if (event.key === "ArrowRight")
                      next = (index + 1) % companies.length;
                    else if (event.key === "ArrowLeft")
                      next = (index - 1 + companies.length) % companies.length;
                    else if (event.key === "Home") next = 0;
                    else if (event.key === "End") next = companies.length - 1;
                    else return;
                    event.preventDefault();
                    setActive(next);
                    heroTabs.current[next]?.focus();
                  }}
                >
                  {item.short}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="brand-strip" aria-label="As empresas do Grupo KF">
          {companies.map((item, index) => (
            <a
              href={`#${item.id}`}
              key={item.id}
              aria-label={`Conhecer ${item.name}`}
            >
              <Logo index={index} />
              <span>{item.sector}</span>
            </a>
          ))}
        </div>

        <section
          id="grupo"
          className="group-section section-padding"
          aria-labelledby="group-title"
        >
          <div className="section-kicker">
            <span className="small-line" />O Grupo KF
          </div>
          <div className="group-content">
            <h2 id="group-title">
              A diversidade
              <br />é o que nos
              <br />
              move.
            </h2>
            <div className="group-description">
              <p className="lead">
                Cinco empresas, diferentes vocações e uma identidade em comum.
              </p>
              <p>
                O Grupo KF reúne negócios no agronegócio, na aviação, nos
                serviços empresariais, em caminhões e máquinas pesadas e no
                varejo de calçados.
              </p>
              <p>
                Uma visão compartilhada, expressa em cada segmento. É nessa
                conexão que o grupo encontra sua identidade.
              </p>
              <a className="text-link" href="#negocios">
                Explore nossos negócios <Arrow />
              </a>
            </div>
          </div>
        </section>

        <section
          id="negocios"
          className="businesses"
          aria-labelledby="businesses-title"
        >
          <div className="businesses-heading section-padding">
            <h2 id="businesses-title">
              Um encontro de
              <br />
              diferentes horizontes.
            </h2>
            <p>
              Conheça as empresas
              <br />
              que dão forma ao Grupo KF.
            </p>
          </div>
          <div id="empresas">
            <article
              id="agro"
              className="agro-section"
              aria-labelledby="agro-title"
            >
              <div className="agro-top">
                <div className="business-heading">
                  <p className="segment-label">Agronegócio</p>
                  <h3 id="agro-title">
                    A visão começa
                    <br />
                    na terra.
                  </h3>
                </div>
                <Logo index={0} />
                <p className="business-description">
                  O campo como ponto de partida.
                  <br />A KF Agro representa a atuação do grupo no agronegócio,
                  com a produção rural e a soja em seu horizonte.
                </p>
              </div>
              <Photo
                name="agro"
                alt="Lavoura vista do alto, com linhas de cultivo em uma paisagem rural"
                className="agro-photo"
              />
              <div className="agro-caption">
                <span>KF Agro</span>
                <p>Terra. Cultivo. Possibilidades.</p>
              </div>
            </article>

            <article
              id="air"
              className="air-section section-padding"
              aria-labelledby="air-title"
            >
              <div className="air-copy">
                <p className="segment-label">Aviação</p>
                <h3 id="air-title">
                  Uma nova
                  <br />
                  perspectiva.
                </h3>
                <p className="business-description">
                  Olhar além. Enxergar de outro ângulo.
                  <br />A KF Air traz a aviação e o universo dos helicópteros
                  para a diversidade de negócios do grupo.
                </p>
                <Logo index={1} />
              </div>
              <div className="air-visual">
                <Photo name="air" alt={companies[1].alt} />
                <p className="photo-note">
                  KF Air <span>O céu amplia o horizonte.</span>
                </p>
              </div>
            </article>

            <div className="work-section section-padding">
              <article
                id="servico"
                className="service-section"
                aria-labelledby="service-title"
              >
                <div className="work-heading">
                  <p className="segment-label">Serviços empresariais</p>
                  <Logo index={2} />
                </div>
                <h3 id="service-title">
                  O valor está
                  <br />
                  em fazer.
                </h3>
                <p className="business-description">
                  A KF Serviço integra o grupo no segmento de serviços
                  empresariais. Uma expressão da diversidade que faz parte da
                  identidade KF.
                </p>
                <Photo name="servicos" alt={companies[2].alt} />
              </article>
              <article
                id="maquinas"
                className="machines-section"
                aria-labelledby="machines-title"
              >
                <Photo name="maquinas" alt={companies[3].alt} />
                <div className="work-heading">
                  <p className="segment-label">Caminhões e máquinas pesadas</p>
                  <Logo index={3} />
                </div>
                <h3 id="machines-title">
                  Força para
                  <br />
                  movimentar.
                </h3>
                <p className="business-description">
                  Caminhões, equipamentos e máquinas pesadas. Um universo de
                  robustez que amplia os segmentos representados pelo Grupo KF.
                </p>
              </article>
            </div>

            <article
              id="calcados"
              className="retail-section"
              aria-labelledby="retail-title"
            >
              <Photo name="calcados" alt={companies[4].alt} />
              <div className="retail-copy">
                <p className="segment-label">Varejo de calçados</p>
                <h3 id="retail-title">
                  Outras formas
                  <br />
                  de caminhar.
                </h3>
                <p className="business-description">
                  Com a VD Calçados, também conhecida como Via Dupla, o grupo se
                  conecta ao universo do varejo. Calçados como expressão de
                  estilo e movimento no dia a dia.
                </p>
                <Logo index={4} />
                <span className="retail-signature">
                  VD Calçados / Via Dupla
                </span>
              </div>
            </article>
          </div>
        </section>

        <section
          id="horizontes"
          className="geography-section section-padding"
          aria-labelledby="geography-title"
        >
          <div className="geography-intro">
            <div className="section-kicker">
              <span className="small-line" />
              Nossos horizontes
            </div>
            <h2 id="geography-title">
              O Brasil,
              <br />
              em diferentes
              <br />
              perspectivas.
            </h2>
            <p>
              Do Nordeste ao Sul, paisagens e vocações diversas compõem nossas
              referências.
            </p>
          </div>
          <div className="places">
            <div>
              <span>Nordeste</span>
              <h3>Maceió</h3>
              <p>Alagoas</p>
            </div>
            <div>
              <span>Sul</span>
              <h3>Santa Catarina</h3>
            </div>
            <div>
              <span>Sul</span>
              <h3>Rio Grande do Sul</h3>
            </div>
          </div>
        </section>

        <section className="closing section-padding" aria-label="Grupo KF">
          <p>Diferentes caminhos. Uma identidade.</p>
          <div className="closing-title">
            Juntos,
            <br />
            um horizonte
            <br />
            mais amplo.
          </div>
          <a className="closing-link" href="#empresas">
            Conheça nossas empresas <Arrow />
          </a>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <Wordmark footer />
          <div>
            <p>A diversidade é o que nos move.</p>
            <a href="#inicio">
              Voltar ao início <Arrow direction="up" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Grupo KF</span>
          <button onClick={() => dialog.current?.showModal()}>
            Fotografias e créditos
          </button>
        </div>
      </footer>
      <dialog
        ref={dialog}
        className="credits-dialog"
        aria-labelledby="credits-title"
      >
        <div className="dialog-heading">
          <h2 id="credits-title">Fotografia</h2>
          <button
            aria-label="Fechar créditos"
            onClick={() => dialog.current?.close()}
          >
            ×
          </button>
        </div>
        <p>
          As fotografias ilustram os segmentos. Não retratam instalações,
          produtos, equipamentos ou operações do Grupo KF.
        </p>
        <ul>
          {credits.map((item) => (
            <li key={item.url}>
              <span>{item.label}</span>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.name} <Arrow />
              </a>
            </li>
          ))}
        </ul>
        <p className="credits-license">
          Fotografias disponibilizadas sob a{" "}
          <a
            href="https://unsplash.com/license"
            target="_blank"
            rel="noopener noreferrer"
          >
            licença Unsplash
          </a>
          . Logotipos fornecidos pelo Grupo KF.
        </p>
      </dialog>
    </>
  );
}
