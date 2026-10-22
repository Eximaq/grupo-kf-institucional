import { useEffect, useRef, useState } from "react";

type Company = {
  id: string;
  name: string;
  line: string;
  sector: string;
  photo: string;
  logo: string;
  description: string;
  label: string;
  position?: string;
};

const asset = (file: string) => import.meta.env.BASE_URL + "assets/" + file;
declare const __VD_DELUXE_AVAILABLE__: boolean;
declare const __VD_KIDS_AVAILABLE__: boolean;
const vdDeluxeCover = __VD_DELUXE_AVAILABLE__ ? "kd-deluxe-capa.jpg" : "calcados.webp";
const vdKidsPhoto = __VD_KIDS_AVAILABLE__ ? "kd-kids-descricao.jpg" : "calcados.webp";

const companies: Company[] = [
  {
    id: "agro",
    name: "KF Agro",
    line: "Agronegócio",
    sector: "Agronegócio",
    photo: "kf-agro-capa.jpg",
    logo: "kf-agro.png",
    description: "A atuação do grupo no campo, com atividades ligadas ao agronegócio e à produção rural, incluindo a soja.",
    label: "Cultivo e produção rural",
    position: "center 47%",
  },
  {
    id: "air",
    name: "KF Air",
    line: "Aviação",
    sector: "Aviação",
    photo: "kf-air-capa.jpeg",
    logo: "kf-air.png",
    description: "O universo da aviação também faz parte do Grupo KF, com atuação associada ao segmento de helicópteros.",
    label: "Aviação e helicópteros",
    position: "center 46%",
  },
  {
    id: "servicos",
    name: "KF Serviço",
    line: "Serviços",
    sector: "Serviços empresariais",
    photo: "servicos.webp",
    logo: "kf-servico.png",
    description: "Uma frente de negócios dedicada ao setor de serviços, ampliando as áreas de atuação do grupo.",
    label: "Soluções em serviços",
    position: "center",
  },
  {
    id: "maquinas",
    name: "KF Caminhões e Máquinas Pesadas",
    line: "Caminhões & máquinas",
    sector: "Máquinas e equipamentos pesados",
    photo: "maquinas.webp",
    logo: "kf-caminhoes.png",
    description: "Caminhões, máquinas e equipamentos pesados integram uma das frentes de negócios do Grupo KF.",
    label: "Força e equipamentos",
    position: "center 60%",
  },
  {
    id: "calcados",
    name: "VD Calçados",
    line: "VD Calçados",
    sector: "Varejo de calçados",
    photo: vdDeluxeCover,
    logo: "vd-calcados.png",
    description: "A frente de varejo do Grupo KF reúne a VD Deluxe e a Via Dupla Kids, com ambientes dedicados à apresentação de calçados.",
    label: "Lojas VD Deluxe e Via Dupla Kids",
    position: "center 35%",
  },
];

// Keep the published photography visible until a new client image is uploaded.
function handleCompanyPhotoError(image: HTMLImageElement, company: Company) {
  const fallback = company.id === "air" ? "air.webp" : company.id === "calcados" ? "calcados.webp" : null;
  if (fallback && !image.src.endsWith("/photos/" + fallback)) {
    image.src = asset("photos/" + fallback);
  }
}

function handleKidsPhotoError(image: HTMLImageElement) {
  if (!image.src.endsWith("/photos/calcados.webp")) {
    image.src = asset("photos/calcados.webp");
  }
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg className="arrow-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {diagonal ? (
        <path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M4 12h16m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function GroupBrand({ light = false, href = "#inicio" }: { light?: boolean; href?: string }) {
  return (
    <a href={href} className={"group-brand" + (light ? " group-brand-light" : "")} aria-label="Grupo KF, ir para o início">
      <span className="brand-vertical" aria-hidden="true">GRUPO</span>
      <svg className="brand-emblem" viewBox="0 0 80 66" role="img" aria-label="Símbolo KF">
        <text x="7" y="54" fill="currentColor" fontSize="57" fontWeight="700" letterSpacing="-11" fontFamily="Georgia, serif">KF</text>
        <path d="M4 60 Q38 24 75 27" stroke="#16B668" strokeWidth="7" fill="none" strokeLinecap="square"/>
      </svg>
    </a>
  );
}

function BrandLogo({ company, className = "" }: { company: Company; className?: string }) {
  return (
    <span className={"brand-logo " + className}>
      <img src={asset("logos/" + company.logo)} alt={"Logomarca " + company.name} loading="lazy" />
    </span>
  );
}



const companySlugs = ["kf-agro", "kf-air", "kf-servico", "kf-caminhoes-maquinas", "vd-calcados"] as const;
const companyUrl = (index: number) => import.meta.env.BASE_URL + "empresas/" + companySlugs[index] + "/";


const machineSlides = [
  { title: "Motoniveladora", group: "Máquinas de terraplenagem", shot: "01", image: "01-motoniveladora.webp" },
  { title: "Pá-carregadeira", group: "Equipamentos de movimentação", shot: "02", image: "02-pa-carregadeira.webp" },
  { title: "Caminhão carroceria", group: "Veículos de carga", shot: "03", image: "03-caminhao-carroceria.webp" },
  { title: "Caminhão basculante", group: "Transporte de materiais", shot: "04", image: "04-caminhao-basculante.webp" },
  { title: "Retroescavadeira", group: "Equipamentos multifunção", shot: "05", image: "05-retroescavadeira.webp" }
];
function EquipmentShowcase() {
  const [active, setActive] = useState(0);
  const slide = machineSlides[active];
  const move = (delta: number) => setActive((value) => (value + delta + machineSlides.length) % machineSlides.length);
  return (
    <section className="equipment-showcase" aria-labelledby="equipment-showcase-title">
      <div className="container">
        <div className="equipment-heading"><div><p>PORTFÓLIO VISUAL</p><h2 id="equipment-showcase-title">Equipamentos em <em>evidência.</em></h2></div><p>Apresentação ilustrativa das categorias de máquinas e caminhões vinculadas à atuação do grupo.</p></div>
        <div className="equipment-stage" aria-roledescription="carrossel" aria-label="Apresentação de equipamentos">
          <div className="equipment-stage-left">
            <span className="equipment-index">{String(active + 1).padStart(2, "0")} <i/> {String(machineSlides.length).padStart(2, "0")}</span>
            <div className="equipment-copy" aria-live="polite">
              <span>{slide.group}</span>
              <h3>{slide.title}</h3>
              <p>Imagem conceitual para apresentação institucional. Os equipamentos e suas especificações devem ser validados antes de qualquer divulgação comercial.</p>
            </div>
            <div className="equipment-controls">
              <button type="button" onClick={() => move(-1)} aria-label="Equipamento anterior">←</button>
              <button type="button" onClick={() => move(1)} aria-label="Próximo equipamento">→</button>
            </div>
          </div>
          <div className="equipment-stage-visual">
            <img key={slide.image} src={asset("equipment/" + slide.image)} onError={(event) => { event.currentTarget.src = asset("photos/maquinas.webp"); }} alt={"Representação conceitual de " + slide.title} loading="lazy" />
            
          </div>
        </div>
        <div className="equipment-pager" aria-label="Selecionar equipamento">
          {machineSlides.map((item, id) => <button key={item.shot} type="button" className={active === id ? "is-active" : ""} aria-current={active === id ? "true" : undefined} onClick={() => setActive(id)}><span>{item.shot}</span>{item.title}</button>)}
        </div>
      </div>
    </section>
  );
}

function CompanyPage({ index }: { index: number }) {
  const company = companies[index];
  const home = import.meta.env.BASE_URL;
  const previous = (index + companies.length - 1) % companies.length;
  const next = (index + 1) % companies.length;
  return (
    <>
      <a className="skip-link" href="#conteudo">Ir para conteúdo</a>
      <header className="site-header company-header">
        <div className="container header-inner">
          <GroupBrand href={home} />
          <nav className="company-header-links" aria-label="Navegação institucional">
            <a href={home + "#grupo"}>O grupo</a>
            <a href={home + "#empresas"}>Empresas</a>
            <a href={home + "contato/"}>Diretório</a>
          </nav>
          <a className="company-home-link" href={home + "#empresas"}>Todas as empresas <Arrow diagonal /></a>
        </div>
      </header>
      <main id="conteudo" className={"company-page company-page-" + company.id}>
        <section className="company-hero">
          <div className="company-hero-image">
            {company.id === "maquinas" ? (
              <>
              <div className="company-hero-fleet" aria-label="Equipamentos da KF Caminhões e Máquinas Pesadas">
                {["01-motoniveladora.webp", "02-pa-carregadeira.webp", "05-retroescavadeira.webp", "04-caminhao-basculante.webp", "03-caminhao-carroceria.webp"].map((file, i) => (
                  <img key={file} src={asset("equipment/" + file)} alt={["Motoniveladora", "Pá-carregadeira", "Retroescavadeira", "Caminhão basculante", "Caminhão carroceria"][i]} />
                ))}
              </div>
              <img
                className="company-hero-uploaded"
                src={asset("photos/frota-kf-capa.png")}
                alt="Frota de caminhões e máquinas pesadas da KF em fundo branco"
                onError={(event) => { event.currentTarget.style.display = "none"; }}
                fetchPriority="high"
              />
              </>
            ) : (
              <img src={asset("photos/" + company.photo)} onError={(event) => handleCompanyPhotoError(event.currentTarget, company)} alt={"Imagem ilustrativa do setor de " + company.sector} fetchPriority="high" style={{objectPosition: company.position}} />
            )}
          </div>
          <div className="company-hero-shade" />
          <div className="container company-hero-inner">
            <nav className="company-breadcrumb" aria-label="Localização"><a href={home}>Grupo KF</a><span>/</span><a href={home + "#empresas"}>Empresas</a><span>/</span><span>{company.name}</span></nav>
            <div className="company-hero-copy">
              <span className="company-sector">{company.sector}</span>
              <h1>{company.name}</h1>
              <p>{company.description}</p>
              <a href="#apresentacao" className="company-explore">Conheça esta empresa <Arrow diagonal /></a>
            </div>
            {company.id !== "maquinas" && <span className="company-photo-legal">Fotografia ilustrativa do setor</span>}
          </div>
        </section>
        <section id="apresentacao" className="company-introduction">
          <div className="container company-intro-grid">
            <div className="company-intro-logo"><BrandLogo company={company} /><span>Empresa do Grupo KF</span></div>
            <div className="company-intro-description">
              <p className="company-superheading">ÁREA DE ATUAÇÃO</p>
              <h2>{company.sector}.</h2>
              <p>{company.description}</p>
              {company.id === "calcados" ? (
                <>
                  <p>As imagens a seguir apresentam as duas lojas de calçados do grupo: VD Deluxe e Via Dupla Kids.</p>
                  <figure className="vd-kids-feature">
                    <div className="vd-kids-image">
                      <img src={asset("photos/" + vdKidsPhoto)} onError={(event) => handleKidsPhotoError(event.currentTarget)} alt="Interior da loja Via Dupla Kids, com expositores de calçados infantis" loading="lazy" />
                    </div>
                    <figcaption>
                      <span>OUTRA LOJA DO GRUPO</span>
                      <strong>Via Dupla Kids</strong>
                      <p>O universo infantil também integra a apresentação das lojas VD.</p>
                    </figcaption>
                  </figure>
                </>
              ) : (
                <p>Esta página apresenta o segmento e a identidade da empresa. A história, as atividades específicas e os materiais institucionais serão acrescentados após a confirmação pelo Grupo KF.</p>
              )}
            </div>
          </div>
        </section>
        {company.id === "maquinas" && <EquipmentShowcase />}
        <section className="company-network">
          <div className="container company-network-layout">
            <div><span>ESTRUTURA EMPRESARIAL</span><h2>Parte de um grupo.<br /><em>Identidade própria.</em></h2></div>
            <div><p>O Grupo KF reúne empresas de diferentes segmentos. Explore as demais marcas e suas áreas de atuação em um só lugar.</p><a href={home + "#empresas"}>Conhecer o grupo <Arrow diagonal /></a></div>
          </div>
        </section>
        <section className="company-other">
          <div className="container">
            <div className="company-other-top"><span>CONTINUE EXPLORANDO</span><h2>Outras empresas.</h2></div>
            <div className="company-related">
              {[previous, next].map((id) => (
                <a href={companyUrl(id)} key={companies[id].id} className="company-related-item">
                  <div className={"company-related-photo" + (companies[id].id === "maquinas" ? " company-related-photo-machinery" : "")}><img src={companies[id].id === "maquinas" ? asset("photos/frota-kf-capa.png") : asset("photos/" + companies[id].photo)} onError={(event) => handleCompanyPhotoError(event.currentTarget, companies[id])} alt={companies[id].id === "maquinas" ? "Frota KF Caminhões e Máquinas Pesadas" : "Imagem ilustrativa de " + companies[id].sector} loading="lazy" /></div>
                  <div><small>{companies[id].sector}</small><strong>{companies[id].name}</strong></div>
                  <Arrow diagonal />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="contact-page-footer">
        <div className="container contact-page-footer-inner"><GroupBrand light href={home}/><span>© {new Date().getFullYear()} Grupo KF · Apresentação institucional</span><a href={home}>Voltar ao grupo <Arrow diagonal /></a></div>
      </footer>
    </>
  );
}

function ContactPage() {
  const home = import.meta.env.BASE_URL;
  const contacts = [
    { email: "agro@example.com" },
    { email: "air@example.com" },
    { email: "servico@example.com" },
    { email: "maquinas@example.com" },
    { email: "calcados@example.com" },
  ];

  return (
    <>
      <a className="skip-link" href="#conteudo">Ir para conteúdo</a>
      <header className="site-header contact-header">
        <div className="container header-inner">
          <GroupBrand href={home} />
          <nav aria-label="Navegação principal" className="contact-header-nav">
            <a href={home + "#grupo"}>O grupo</a>
            <a href={home + "#empresas"}>Empresas</a>
            <span aria-current="page">Contato</span>
          </nav>
          <a className="contact-back" href={home}>Voltar ao início <Arrow diagonal /></a>
        </div>
      </header>
      <main id="conteudo" className="contact-page">
        <section className="contact-cover" aria-labelledby="contact-title">
          <div className="container contact-cover-layout">
            <div className="contact-cover-copy">
              <p className="contact-eyebrow">GRUPO KF / CONTATO</p>
              <h1 id="contact-title">Cinco marcas.<br /><em>Uma apresentação.</em></h1>
              <p>Conheça as cinco empresas do Grupo KF e suas áreas de atuação. Informações institucionais reunidas em um só lugar.</p>
              <a href="#diretorio" className="contact-scroll">Conheça as empresas <Arrow diagonal /></a>
            </div>
            <div className="contact-cover-visual" aria-hidden="true">
              <img src={asset("photos/agro.webp")} alt="" />
              <div className="contact-cover-caption">AGRONEGÓCIO  /  AVIAÇÃO  /  SERVIÇOS  /  MÁQUINAS  /  CALÇADOS</div>
            </div>
          </div>
        </section>

        <section id="diretorio" className="contact-directory" aria-label="Diretório das empresas">
          <div className="container contact-directory-layout">
            <div className="contact-directory-intro">
              <p className="contact-kicker">NOSSAS EMPRESAS</p>
              <h2>Empresas e<br /><em>informações.</em></h2>
              <p>Escolha a marca que você deseja conhecer. Os e-mails apresentados nesta demonstração ainda não são oficiais.</p>
              <div className="contact-demo-notice">
                <strong>Informações demonstrativas</strong>
                <span>Os endereços de e-mail abaixo são demonstrativos e serão substituídos por informações oficiais, caso o grupo decida disponibilizá-las.</span>
              </div>
            </div>
            <div className="contact-directory-list">
              {companies.map((company, index) => (
                <article className="contact-company" key={company.id} aria-labelledby={"contact-name-" + company.id}>
                  <div className="contact-company-brand">
                    <span className="contact-company-mark"><BrandLogo company={company} /></span>
                    <div className="contact-company-name">
                      <h3 id={"contact-name-" + company.id}><a href={companyUrl(index)}>{company.name}</a></h3>
                      <p>{company.sector}</p>
                    </div>
                  </div>
                  <dl className="contact-company-details">
                    <div><dt>E-mail</dt><dd>{contacts[index].email}</dd></div>
                    
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="contact-outro">
          <div className="container contact-outro-row">
            <div><span>GRUPO KF</span><p>Conheça as empresas que fazem parte da nossa estrutura.</p></div>
            <a href={home + "#empresas"}>Explorar as empresas <Arrow diagonal /></a>
          </div>
        </section>
      </main>
      <footer className="contact-page-footer">
        <div className="container contact-page-footer-inner">
          <GroupBrand light href={home} />
          <span>© {new Date().getFullYear()} Grupo KF · Apresentação institucional</span>
          <a href={home}>Página inicial <Arrow diagonal /></a>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  const [selected, setSelected] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reelReady, setReelReady] = useState(false);
  const [reelError, setReelError] = useState(false);
  const [reelPlaying, setReelPlaying] = useState(true);
  const [reelChapter, setReelChapter] = useState(0);
  const [reelFraction, setReelFraction] = useState(0);
  const [realLocations, setRealLocations] = useState(false);
  const [videoMobile, setVideoMobile] = useState(false);
  const reelStops = [0, 4.2, 8.35];
  const reelTitles = ["Alagoas", "Rio Grande do Sul", "Santa Catarina"];
  const reelRef = useRef<HTMLVideoElement>(null);
  const current = companies[selected];
  const isContactPage = window.location.pathname.includes("/contato/");
  const contactHref = import.meta.env.BASE_URL + "contato/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  useEffect(() => {
    setVideoMobile(window.matchMedia("(max-width: 680px)").matches);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reelRef.current?.pause();
      setReelPlaying(false);
    }
  }, []);

  useEffect(() => {
    let live = true;
    fetch(import.meta.env.BASE_URL + "assets/videos/reel-manifest.json")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Missing reel manifest")))
      .then((manifest: { realFootage?: boolean }) => { if (live) setRealLocations(manifest.realFootage === true); })
      .catch(() => { if (live) setRealLocations(false); });
    return () => { live = false; };
  }, []);

  function onReelTime() {
    const position = reelRef.current?.currentTime ?? 0;
    const index = position >= reelStops[2] ? 2 : position >= reelStops[1] ? 1 : 0;
    const start = reelStops[index];
    const end = index === 2 ? 12.5 : reelStops[index + 1];
    setReelChapter(index);
    setReelFraction(Math.min(1, Math.max(0, (position - start) / (end - start))));
  }

  function jumpToReelScene(index: number) {
    const video = reelRef.current;
    if (!video) return;
    video.currentTime = reelStops[index];
    setReelChapter(index);
    setReelFraction(0);
    if (video.paused) {
      void video.play().then(() => setReelPlaying(true)).catch(() => setReelPlaying(false));
    }
  }

  function toggleReel() {
    const video = reelRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().then(() => setReelPlaying(true)).catch(() => setReelPlaying(false));
    } else {
      video.pause();
      setReelPlaying(false);
    }
  }

  const companyMatch = window.location.pathname.match(new RegExp("/empresas/([^/]+)/?(?:index[.]html)?$"));
  const companyIndex = companyMatch ? companySlugs.findIndex((slug) => slug === companyMatch[1]) : -1;
  if (companyIndex >= 0) return <CompanyPage index={companyIndex} />;
  if (isContactPage) return <ContactPage />;

  return (
    <>
      <a className="skip-link" href="#conteudo">Ir para conteúdo</a>
      <header className={"site-header" + (scrolled ? " is-scrolled" : "")}>
        <div className="header-inner container">
          <GroupBrand />
          <nav className={"site-nav" + (menuOpen ? " site-nav-open" : "")} aria-label="Navegação principal" id="site-navigation">
            <a href="#grupo" onClick={closeMenu}>O grupo</a>
            <a href="#empresas" onClick={closeMenu}>Nossas empresas</a>
            <a href="#presenca" onClick={closeMenu}>Nossa presença</a>
            <a href={contactHref} onClick={closeMenu}>Contato</a>
          </nav>
          <a className="header-action" href={contactHref}>Conheça o grupo <Arrow diagonal /></a>
          <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen(!menuOpen)}>
            <span>{menuOpen ? "Fechar" : "Menu"}</span>
            <span className={"menu-lines" + (menuOpen ? " menu-lines-open" : "")} aria-hidden="true"><i/><i/></span>
          </button>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero hero-reel" id="inicio" aria-labelledby="main-title">
          <div className="reel-background" aria-hidden="true">
            <img className="reel-poster" src={asset("photos/horizonte.webp")} alt="" fetchPriority="high" />
            <video
              ref={reelRef}
              className={"reel-video" + (reelReady ? " is-ready" : "")}
              src={videoMobile ? asset("videos/grupo-kf-reel-mobile.mp4") : asset("videos/grupo-kf-reel-fullhd.mp4")}
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              poster={asset("photos/horizonte.webp")}
              onLoadedData={() => { setReelReady(true); setReelError(false); }}
              onCanPlay={() => { setReelReady(true); }}
              onTimeUpdate={onReelTime}
              onError={() => { setReelReady(false); setReelPlaying(false); setReelError(true); }}
              onPause={() => setReelPlaying(false)}
              onPlay={() => setReelPlaying(true)}
            />
          </div>
          <div className="reel-shade" aria-hidden="true" />
          <div className="container reel-content">
            <div className="reel-intro">
              <span className="reel-overline">GRUPO KF</span>
              <h1 id="main-title">Negócios em<br /><em>diferentes setores.</em></h1>
              <p>O Grupo KF reúne empresas de agronegócio, aviação, serviços, caminhões e máquinas pesadas e varejo de calçados.</p>
              <a className="reel-link" href="#grupo">Quem somos <Arrow diagonal /></a>
            </div>
            <div className="reel-footer reel-footer-videos">
              <div className="reel-chapters" role="group" aria-label="Cenas da abertura institucional">
                {reelTitles.map((title, index) => (
                  <button
                    type="button"
                    className={"reel-chapter" + (index === reelChapter ? " is-current" : "")}
                    key={title}
                    onClick={() => jumpToReelScene(index)}
                    disabled={!reelReady}
                    aria-label={"Exibir cena " + title}
                    aria-current={index === reelChapter ? "true" : undefined}
                  >
                    <span className="reel-chapter-track"><span style={{ width: (index < reelChapter ? 100 : index === reelChapter ? reelFraction * 100 : 0) + "%" }} /></span>
                    <span className="reel-chapter-title"><small>0{index + 1}</small>{title}</span>
                  </button>
                ))}
              </div>
              <div className="reel-controls">
                <span>{realLocations ? "Imagens aéreas das regiões" : "Imagens de apresentação"}</span>
                {!reelError && <button className="reel-toggle" type="button" onClick={toggleReel} aria-label={reelPlaying ? "Pausar vídeo de abertura" : "Reproduzir vídeo de abertura"}>{reelPlaying ? "Pausar" : "Reproduzir"} <span aria-hidden="true">{reelPlaying ? "Ⅱ" : "▶"}</span></button>}
              </div>
            </div>
          </div>
        </section>

        <section className="brands" aria-label="Empresas que integram o Grupo KF">
          <div className="container">
            
            <div className="brands-grid">
              {companies.map((company, index) => (
                <a className="brands-item" href={companyUrl(index)} key={company.id} aria-label={"Explorar " + company.name}>
                  <BrandLogo company={company} />
                  <span>{company.line}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="grupo" className="about-section section-anchor" aria-labelledby="about-heading">
          <div className="container about-layout about-editorial">
            <div className="about-heading">
              <p className="about-section-tag">O GRUPO</p>
              <h2 id="about-heading">Quem <em>somos.</em></h2>
              <span className="about-signature" aria-hidden="true">KF</span>
            </div>
            <div className="about-text">
              <p className="lead">O Grupo KF é um grupo empresarial com décadas de trajetória no mercado, construído sobre os pilares do empreendedorismo, da visão estratégica e da busca contínua pela expansão e diversificação de seus negócios.</p>
              <p>Ao longo de sua história, o Grupo consolidou uma trajetória de crescimento e evolução, ampliando sua presença em diferentes segmentos e regiões do Brasil. Essa expansão reflete o compromisso com o desenvolvimento empresarial, a identificação de novas oportunidades e a construção de uma estrutura sólida, diversificada e preparada para acompanhar as transformações do mercado.</p>
              <p>Atualmente, o Grupo KF está presente nos estados de Alagoas, Rio Grande do Sul e Santa Catarina, mantendo uma atuação diversificada e uma visão de negócios que ultrapassa fronteiras regionais. Sua presença em diferentes mercados representa a amplitude de sua atuação e o potencial de crescimento de suas operações.</p>
              <p>Com uma perspectiva estratégica de longo prazo, o Grupo KF segue direcionado à expansão de suas atividades, ao fortalecimento de suas operações e à consolidação de novos negócios, sempre orientado pela eficiência, pela excelência na gestão e pela geração de valor.</p>
              <p>Mais do que expandir negócios, o Grupo KF constrói oportunidades, fortalece sua presença no mercado e projeta o futuro com solidez, estratégia e visão de longo prazo.</p>
              <a className="about-link" href="#empresas">Conheça as empresas <Arrow diagonal /></a>
            </div>
          </div>
        </section>

        <section id="empresas" className="portfolio-section section-anchor">
          <div className="container">
            <div className="portfolio-heading">
              <div>
                
                <h2>As cinco <em>empresas.</em></h2>
              </div>
              <p>Escolha uma marca para conhecer sua área de atuação.</p>
            </div>
            <div className="explorer">
              <div className="explorer-nav" role="tablist" aria-label="Empresas do Grupo KF" aria-orientation="vertical">
                {companies.map((company, index) => (
                  <button
                    type="button"
                    className={"explorer-tab" + (selected === index ? " is-active" : "")}
                    id={"company-tab-" + index}
                    key={company.id}
                    role="tab"
                    aria-selected={selected === index}
                    aria-controls="company-panel"
                    tabIndex={selected === index ? 0 : -1}
                    onClick={() => setSelected(index)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                        event.preventDefault();
                        const next = (index + 1) % companies.length;
                        setSelected(next);
                        document.getElementById("company-tab-" + next)?.focus();
                      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                        event.preventDefault();
                        const next = (index - 1 + companies.length) % companies.length;
                        setSelected(next);
                        document.getElementById("company-tab-" + next)?.focus();
                      } else if (event.key === "Home" || event.key === "End") {
                        event.preventDefault();
                        const next = event.key === "Home" ? 0 : companies.length - 1;
                        setSelected(next);
                        document.getElementById("company-tab-" + next)?.focus();
                      }
                    }}
                  >
                    
                    <span className="tab-body"><strong>{company.name}</strong><small>{company.sector}</small></span>
                    <span className="tab-arrow"><Arrow diagonal /></span>
                  </button>
                ))}
                
              </div>
              <div className="explorer-panel" role="tabpanel" id="company-panel" aria-labelledby={"company-tab-" + selected}>
                <div className="explorer-photo" key={current.id}>
                  {current.id === "maquinas" ? (
                    <div className="equipment-cover-grid" aria-label="Apresentação de máquinas e caminhões do Grupo KF">
                      {["01-motoniveladora.webp", "02-pa-carregadeira.webp", "05-retroescavadeira.webp", "04-caminhao-basculante.webp", "03-caminhao-carroceria.webp", "04-caminhao-basculante.webp"].map((file, i) => (
                        <img key={i} src={asset("equipment/" + file)} alt={["Motoniveladora", "Pá-carregadeira", "Retroescavadeira", "Caminhão basculante", "Caminhão carroceria", "Caminhão basculante em outro destaque"][i]} loading="lazy" />
                      ))}
                    </div>
                  ) : (
                    <>
                      <img src={asset("photos/" + current.photo)} onError={(event) => handleCompanyPhotoError(event.currentTarget, current)} alt={"Fotografia ilustrativa: " + current.label} style={{ objectPosition: current.position }} />
                      <span className="panel-photo-caption">REFERÊNCIA VISUAL DO SETOR · {current.sector.toUpperCase()}</span>
                    </>
                  )}
                </div>
                <div className="explorer-info">
                  <div className="explorer-logo"><BrandLogo company={current} /></div>
                  <div className="explorer-description">
                    <span>{current.sector}</span>
                    <p>{current.description}</p>
                    <a className="explorer-company-link" href={companyUrl(selected)}>Conhecer {current.name} <Arrow diagonal /></a>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="presenca" className="presence-section section-anchor">
          <div className="container presence-layout">
            <div>
              
              <h2>Do Nordeste<br /><em>à região Sul.</em></h2>
              <p>Maceió, Santa Catarina e Rio Grande do Sul fazem parte das referências regionais apresentadas pelo grupo. A distribuição das operações será confirmada com a empresa.</p>
            </div>
            <div className="locations" aria-label="Localidades mencionadas pelo grupo"><div className="regional-header"><span>BRASIL</span><strong>Referências regionais</strong></div>
              <div><span>01</span><strong>Maceió</strong><small>Alagoas</small></div>
              <div><span>02</span><strong>Santa Catarina</strong><small>Região Sul</small></div>
              <div><span>03</span><strong>Rio Grande do Sul</strong><small>Região Sul</small></div>
            </div>
          </div>
        </section>
        <section className="home-contact-transition" aria-label="Contato com as empresas">
          <div className="container home-contact-transition-inner">
            <div className="transition-art" aria-hidden="true"><span>KF</span><span>05 MARCAS</span></div>
            <div className="transition-message">
              <span>GRUPO KF</span>
              <h2>Conheça as<br /><em>nossas empresas.</em></h2>
              <p>Conheça as diferentes áreas de atuação que compõem o Grupo KF.</p>
            </div>
            <a href={contactHref} className="transition-link">Ver empresas <Arrow diagonal /></a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <h2>Conheça o<br /><em>Grupo KF.</em></h2>
              <a className="footer-contact" href={contactHref}>Conhecer as empresas <Arrow diagonal /></a>
            </div>
            <a href="#inicio" className="footer-up" aria-label="Voltar ao início"><Arrow diagonal /></a>
          </div>
          <div className="footer-divider"/>
          <div className="footer-bottom">
            <GroupBrand light />
            <div className="footer-company-list">
              {companies.map((company, index) => <a href={companyUrl(index)} key={company.id}>{company.name}</a>)}
              <a href={contactHref}>Contato</a>
            </div>
          </div>
          <div className="footer-legal"><span>© {new Date().getFullYear()} Grupo KF</span><span>Imagens ilustrativas · <a href="https://unsplash.com/license" target="_blank" rel="noreferrer">Créditos fotográficos</a></span></div>
        </div>
      </footer>
    </>
  );
}
