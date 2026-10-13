import { useEffect, useState } from "react";

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

function GroupBrand({ light = false }: { light?: boolean }) {
  return (
    <a href="#inicio" className={"group-brand" + (light ? " group-brand-light" : "")} aria-label="Grupo KF, ir para o início">
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

export default function App() {
  const [selected, setSelected] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const current = companies[selected];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

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
          </nav>
          <a className="header-action" href="#empresas">Ver empresas <Arrow diagonal /></a>
          <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen(!menuOpen)}>
            <span>{menuOpen ? "Fechar" : "Menu"}</span>
            <span className={"menu-lines" + (menuOpen ? " menu-lines-open" : "")} aria-hidden="true"><i/><i/></span>
          </button>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="main-title">
          <div className="hero-inner container">
            <div className="hero-copy">
              <h1 id="main-title">Da terra<br />ao céu.<br /><em>Grupo KF.</em></h1>
              <p>Agronegócio, aviação, serviços, caminhões e máquinas pesadas e varejo de calçados. Conheça as cinco empresas do grupo.</p>
              <a className="primary-link" href="#empresas">Explorar empresas <Arrow diagonal /></a>
              
            </div>
            <div className="hero-gallery" aria-label="Fotografias representativas das áreas de atuação">
              <div className="hero-photo hero-photo-main">
                <img src={asset("photos/air.webp")} alt="Helicóptero em voo, imagem ilustrativa do setor de aviação" fetchPriority="high" />
                <span className="photo-tag">Aviação</span>
              </div>
              <div className="hero-photo hero-photo-secondary">
                <img src={asset("photos/agro.webp")} alt="Lavoura representando o agronegócio" />
                <span className="photo-tag">Agronegócio</span>
              </div>
              <div className="hero-photo hero-photo-secondary">
                <img src={asset("photos/maquinas.webp")} alt="Máquinas pesadas representando o setor de equipamentos" />
                <span className="photo-tag">Máquinas</span>
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

        <section id="grupo" className="about-section section-anchor">
          <div className="container about-layout">
            <div className="about-heading">
              
              <h2>Empresas de<br /><em>setores diferentes.</em></h2>
            </div>
            <div className="about-text">
              <p className="lead">Agronegócio, aviação, serviços, máquinas pesadas e varejo. Cada empresa com sua própria área de atuação.</p>
              <p>O Grupo KF reúne essas cinco frentes. Explore abaixo as marcas e as atividades que fazem parte de sua estrutura.</p>
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
                  <span className="panel-photo-caption">IMAGEM REPRESENTATIVA · {current.sector.toUpperCase()}</span>
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
              
              <h2>De Alagoas<br /><em>ao Sul do Brasil.</em></h2>
              <p>Alagoas, Santa Catarina e Rio Grande do Sul aparecem entre as referências geográficas do Grupo KF.</p>
            </div>
            <div className="locations" aria-label="Localidades mencionadas pelo grupo">
              <div><span>01</span><strong>Maceió</strong><small>Alagoas</small></div>
              <div><span>02</span><strong>Santa Catarina</strong><small>Região Sul</small></div>
              <div><span>03</span><strong>Rio Grande do Sul</strong><small>Região Sul</small></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <h2>Conheça o<br /><em>Grupo KF.</em></h2>
            </div>
            <a href="#inicio" className="footer-up" aria-label="Voltar ao início"><Arrow diagonal /></a>
          </div>
          <div className="footer-divider"/>
          <div className="footer-bottom">
            <GroupBrand light />
            <div className="footer-company-list">
              {companies.map((company, index) => <a href="#empresas" key={company.id} onClick={() => setSelected(index)}>{company.name}</a>)}
            </div>
          </div>
          <div className="footer-legal"><span>© {new Date().getFullYear()} Grupo KF</span><span>Fotografias ilustrativas dos segmentos · <a href="https://unsplash.com/license" target="_blank" rel="noreferrer">Unsplash</a></span></div>
        </div>
      </footer>
    </>
  );
}
