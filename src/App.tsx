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

const companies: Company[] = [
  {
    id: "agro",
    name: "KF Agro",
    line: "Agronegócio",
    sector: "Agronegócio",
    photo: "agro.webp",
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
    photo: "air.webp",
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
    photo: "calcados.webp",
    logo: "vd-calcados.png",
    description: "Com a marca Via Dupla, o grupo também participa do comércio de calçados, conectando-se ao varejo.",
    label: "Varejo e estilo",
    position: "center 67%",
  },
];

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


function ContactPage() {
  const home = import.meta.env.BASE_URL;
  const contacts = [
    { email: "agro@example.com", phone: "(00) 90000-0001" },
    { email: "air@example.com", phone: "(00) 90000-0002" },
    { email: "servico@example.com", phone: "(00) 90000-0003" },
    { email: "maquinas@example.com", phone: "(00) 90000-0004" },
    { email: "calcados@example.com", phone: "(00) 90000-0005" },
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
              <h1 id="contact-title">A empresa certa.<br /><em>O contato direto.</em></h1>
              <p>Encontre o canal de cada uma das cinco empresas que integram o Grupo KF. Uma única página para consultar todos os segmentos.</p>
              <a href="#diretorio" className="contact-scroll">Ver contatos das empresas <Arrow diagonal /></a>
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
              <h2>Contatos por<br /><em>segmento.</em></h2>
              <p>Escolha a marca que você deseja conhecer. Cada empresa terá seus próprios canais oficiais de atendimento.</p>
              <div className="contact-demo-notice">
                <strong>Informações demonstrativas</strong>
                <span>Os e-mails com domínio example.com e os telefones abaixo são fictícios. Serão substituídos pelos contatos oficiais antes da entrega definitiva.</span>
              </div>
            </div>
            <div className="contact-directory-list">
              {companies.map((company, index) => (
                <article className="contact-company" key={company.id} aria-labelledby={"contact-name-" + company.id}>
                  <div className="contact-company-brand">
                    <span className="contact-company-mark"><BrandLogo company={company} /></span>
                    <div className="contact-company-name">
                      <h3 id={"contact-name-" + company.id}>{company.name}</h3>
                      <p>{company.sector}</p>
                    </div>
                  </div>
                  <dl className="contact-company-details">
                    <div><dt>E-mail</dt><dd>{contacts[index].email}</dd></div>
                    <div><dt>Celular / WhatsApp</dt><dd>{contacts[index].phone}</dd></div>
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
  const [maceioAvailable, setMaceioAvailable] = useState(false);
  const [videoMobile, setVideoMobile] = useState(false);
  const reelStops = [0, 4.2, 8.35];
  const reelTitles = realLocations ? ["Maceió · AL", "Santa Catarina", "Agro · Rio Grande do Sul"] : maceioAvailable ? ["Maceió · AL", "Aviação · ilustrativo", "Agro · ilustrativo"] : ["Apresentação", "Aviação", "Agronegócio"];
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
      .then((manifest: { realFootage?: boolean; maceioReal?: boolean }) => { if (live) { setRealLocations(manifest.realFootage === true); setMaceioAvailable(manifest.maceioReal === true); } })
      .catch(() => { if (live) { setRealLocations(false); setMaceioAvailable(false); } });
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
          <a className="header-action" href={contactHref}>Fale com o grupo <Arrow diagonal /></a>
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
                <a className="brands-item" href="#empresas" key={company.id} onClick={() => setSelected(index)} aria-label={"Explorar " + company.name}>
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
              <p className="lead">Cinco empresas, cada uma com sua especialidade, reunidas sob a marca Grupo KF.</p>
              <p>Do agronegócio à aviação, dos serviços aos equipamentos pesados e ao varejo: uma apresentação conjunta de negócios com atuação em diferentes mercados.</p>
              <p>A história, os marcos e a trajetória de cada empresa serão documentados aqui com informações e fotografias fornecidas pelo próprio grupo.</p>
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
                  <img src={asset("photos/" + current.photo)} alt={"Fotografia ilustrativa: " + current.label} style={{ objectPosition: current.position }} />
                  <span className="panel-photo-caption">REFERÊNCIA VISUAL DO SETOR · {current.sector.toUpperCase()}</span>
                </div>
                <div className="explorer-info">
                  <div className="explorer-logo"><BrandLogo company={current} /></div>
                  <div className="explorer-description">
                    <span>{current.sector}</span>
                    <p>{current.description}</p>
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
              <span>CONTATO EMPRESARIAL</span>
              <h2>Uma estrutura.<br /><em>Canais próprios.</em></h2>
              <p>Encontre o contato da empresa que você procura em um só lugar.</p>
            </div>
            <a href={contactHref} className="transition-link">Ver contatos <Arrow diagonal /></a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <h2>Conheça o<br /><em>Grupo KF.</em></h2>
              <a className="footer-contact" href={contactHref}>Contatos das empresas <Arrow diagonal /></a>
            </div>
            <a href="#inicio" className="footer-up" aria-label="Voltar ao início"><Arrow diagonal /></a>
          </div>
          <div className="footer-divider"/>
          <div className="footer-bottom">
            <GroupBrand light />
            <div className="footer-company-list">
              {companies.map((company, index) => <a href="#empresas" key={company.id} onClick={() => setSelected(index)}>{company.name}</a>)}
              <a href={contactHref}>Contato</a>
            </div>
          </div>
          <div className="footer-legal"><span>© {new Date().getFullYear()} Grupo KF</span><span>Imagens ilustrativas · <a href="https://unsplash.com/license" target="_blank" rel="noreferrer">Créditos fotográficos</a></span></div>
        </div>
      </footer>
    </>
  );
}
