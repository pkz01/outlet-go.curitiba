import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Plus,
  Star,
  X,
} from 'lucide-react';
import { categories, gallery, products, type Product } from '@/data';

const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=R.+Waldemar+Loureiro+Campos,+3615+-+Boqueirão,+Curitiba+-+PR';
const whatsappUrl = 'https://wa.me/5543991359944?text=Ol%C3%A1!%20Vi%20uma%20pe%C3%A7a%20no%20site%20da%20Outlet.Go%20Curitiba%20e%20gostaria%20de%20saber%20mais%20sobre%20ela.';

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand-mark ${light ? 'brand-mark-light' : ''}`} href="#inicio" aria-label="Outlet.Go Curitiba">
      <span>OUTLET</span><b>.GO</b>
    </a>
  );
}

function useCarousel(images: string[], interval = 3500) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || images.length <= 1) return;
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % images.length), interval);
    return () => clearInterval(timer);
  }, [paused, images.length, interval]);
  return { index, setIndex, paused, setPaused };
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filteredProducts = useMemo(
    () => activeCategory === 'Todos' || activeCategory === 'Acessórios' ? products : products.filter((product) => product.category === activeCategory),
    [activeCategory],
  );

  const closeMenu = () => setMenuOpen(false);
  const navItems = [['Início', 'inicio'], ['Categorias', 'categorias'], ['Marcas', 'marcas'], ['Galeria', 'galeria'], ['Avaliações', 'avaliacoes'], ['Localização', 'localizacao'], ['Contato', 'contato']];

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <BrandMark />
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
            {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <a className="header-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a>
            <a className="header-map" href={mapsUrl} target="_blank" rel="noreferrer">Como chegar <ArrowUpRight size={16} /></a>
          </div>
          <button className="menu-button" aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main>
        <section id="inicio" className="hero-section">
          <div className="hero-image" />
          <div className="hero-overlay" />
          <div className="hero-content page-width">
            <p className="eyebrow hero-eyebrow">OUTLET.GO CURITIBA <span /></p>
            <h1>Seu estilo.<br /><em>Seu preço.</em><br />Seu outlet.</h1>
            <p className="hero-copy">Encontre grandes oportunidades, produtos incríveis e uma experiência de compra que vale a pena conhecer.</p>
            <div className="hero-buttons"><a className="button button-light" href="#categorias">Conheça a loja <ArrowUpRight size={17} /></a><a className="text-link light-link" href={mapsUrl} target="_blank" rel="noreferrer">Como chegar <span>↗</span></a></div>
            <div className="hero-metrics"><div><strong>4,6 <Star size={15} fill="currentColor" /></strong><span>no Google</span></div><div><strong>554</strong><span>avaliações</span></div><div><strong>PR</strong><span>Curitiba</span></div></div>
          </div>
          <div className="hero-scroll">OUTLET.GO <span /></div>
        </section>

        <section id="categorias" className="catalog-section section-pad"><div className="page-width"><div className="section-heading"><p className="eyebrow">03 / CATEGORIAS</p><h2>Escolha por <em>estilo.</em></h2></div><div className="category-row">{categories.map((category) => <button className={activeCategory === category ? 'category-pill active' : 'category-pill'} key={category} onClick={() => setActiveCategory(category)}>{category}<span>↗</span></button>)}</div><div id="produtos" className="product-header"><div><p className="eyebrow">VITRINE FEMININA</p><h3>{activeCategory === 'Todos' ? 'Achados para chamar de seus.' : activeCategory}</h3></div><p className="catalog-note">Produtos, valores, tamanhos e disponibilidade são meramente ilustrativos. Consulte a loja.</p></div><div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />)}</div></div></section>

        <section className="about-section section-pad" id="sobre"><div className="page-width about-grid"><div className="about-images"><img className="about-main" src="/images/goo.jpg" alt="Fachada da Outlet.Go Curitiba" /><img className="about-small" src="/images/goooo.jpg" alt="Vista aérea da Outlet.Go Curitiba" /><span className="about-number">04</span></div><div className="about-copy"><p className="eyebrow">04 / SOBRE A LOJA</p><h2>Conheça a<br /><em>Outlet.Go.</em></h2><p>Uma loja em Curitiba para quem busca boas oportunidades de compra, variedade e uma experiência agradável.</p><div className="feature-list"><Feature title="Boas oportunidades" text="Descobertas que fazem sentido para o seu estilo." /><Feature title="Variedade" text="Uma loja ampla para olhar sem pressa." /><Feature title="Atendimento" text="Um time pronto para ajudar você." /><Feature title="Fácil acesso" text="No Boqueirão, com estacionamento no local." /></div></div></div></section>

        <section id="marcas" className="brands-section section-pad"><div className="page-width"><div className="section-heading split-heading"><div><p className="eyebrow">05 / CURADORIA</p><h2>Encontre seus<br /><em>favoritos.</em></h2></div><p className="section-intro">Marcas e novidades para preencher com o que você encontra na loja. Este espaço está pronto para receber a curadoria da Outlet.Go.</p></div><div className="brand-placeholders">{['Sua marca favorita', 'Novidades da loja', 'Essenciais', 'Descobertas'].map((label, index) => <div key={label} className="brand-placeholder"><span>0{index + 1}</span><strong>{label}</strong><small>Espaço editável</small></div>)}</div></div></section>

        <section id="galeria" className="gallery-section section-pad"><div className="page-width"><div className="section-heading split-heading"><div><p className="eyebrow">06 / ESPAÇO OUTLET.GO</p><h2>Conheça<br /><em>nossa loja.</em></h2></div><p className="section-intro">Um espaço grande, aberto e cheio de possibilidades para você encontrar a próxima oportunidade.</p></div><div className="gallery-grid">{gallery.map((item, index) => <button key={item.src} className={`gallery-item ${item.className}`} onClick={() => setLightbox(index)}><img src={item.src} alt={item.label} /><span className="gallery-label">{item.label} <ArrowUpRight size={16} /></span></button>)}</div></div></section>

        <section className="experience-section section-pad"><div className="page-width experience-grid"><div><p className="eyebrow">07 / EXPERIÊNCIA</p><h2>Uma experiência<br /><em>que vale a pena.</em></h2><p className="experience-copy">Clientes destacam boas oportunidades, bom atendimento e uma loja ampla para explorar.</p></div><div className="experience-cards"><div><Plus /><strong>Boas<br />oportunidades</strong></div><div><Plus /><strong>Bom<br />atendimento</strong></div><div><Plus /><strong>Variedade<br />para escolher</strong></div><div><Plus /><strong>Estacionamento<br />no local</strong></div></div></div></section>

        <section id="avaliacoes" className="reviews-section section-pad"><div className="page-width"><div className="section-heading"><p className="eyebrow">08 / QUEM CONHECE</p><h2>Quem conhece, <em>recomenda.</em></h2></div><div className="reviews-layout"><div className="rating-card"><span className="rating-score">4,6</span><div className="stars">★★★★★</div><span>554 avaliações no Google</span><a className="text-link" href="#localizacao">Visite a loja <span>↗</span></a></div><div className="quotes">{['Boa experiência de compra no geral, bons preços.', 'Vendedora Ana Cristina muito simpática e atendente Camila do caixa também.', 'Ótimo atendimento, gostei das roupas e marcas oferecidas. A loja é enorme, recomendo, vale a pena conhecer!'].map((quote) => <blockquote key={quote}><span>“</span><p>{quote}</p><small>Cliente Outlet.Go</small></blockquote>)}</div></div></div></section>

        <section className="hours-section section-pad" id="horarios"><div className="page-width hours-grid"><div><p className="eyebrow">09 / PROGRAME SUA VISITA</p><h2>Venha nos <em>visitar.</em></h2><p>Escolha o melhor momento para descobrir a loja. Em feriados, os horários podem sofrer alterações.</p><a className="button button-dark" href={mapsUrl} target="_blank" rel="noreferrer">Como chegar <ArrowUpRight size={17} /></a></div><OpeningHours /></div></section>

        <section className="location-section section-pad" id="localizacao"><div className="page-width location-grid"><div className="location-copy"><p className="eyebrow">10 / ENCONTRE A GENTE</p><h2>Onde <em>estamos.</em></h2><div className="address"><MapPin /><p>Outlet.Go Curitiba<br />R. Waldemar Loureiro Campos, 3615<br />Boqueirão · Curitiba - PR<br />81720-140</p></div><p className="phone">(43) 99135-9944</p><div className="location-actions"><a className="button button-dark" href={mapsUrl} target="_blank" rel="noreferrer">Como chegar <ArrowUpRight size={17} /></a><a className="button button-outline" href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp <MessageCircle size={17} /></a><a className="button button-outline mobile-call" href="tel:+5543991359944">Ligar agora</a></div></div><div className="map-card"><div className="map-grid-lines" /><div className="map-pin"><MapPin size={30} fill="currentColor" /></div><span className="map-label">BOQUEIRÃO<br /><b>CURITIBA · PR</b></span></div></div></section>

        <section id="contato" className="final-cta"><div className="cta-image" /><div className="cta-overlay" /><div className="page-width cta-content"><p className="eyebrow">OUTLET.GO CURITIBA</p><h2>Encontre sua próxima<br /><em>oportunidade.</em></h2><p>Venha conhecer a Outlet.Go Curitiba e descubra tudo o que a loja tem a oferecer.</p><div className="hero-buttons"><a className="button button-light" href={mapsUrl} target="_blank" rel="noreferrer">Como chegar <ArrowUpRight size={17} /></a><a className="button button-ghost-light" href={whatsappUrl} target="_blank" rel="noreferrer">Fale conosco <MessageCircle size={17} /></a></div></div></section>
      </main>

      <footer className="site-footer"><div className="page-width footer-grid"><div><BrandMark light /><p className="footer-tagline">Moda, oportunidade<br />e descobertas em Curitiba.</p><div className="socials"><span><Instagram size={17} /></span><span><MessageCircle size={17} /></span></div></div><div><h4>Visite a loja</h4><p>R. Waldemar Loureiro Campos, 3615<br />Boqueirão · Curitiba - PR<br />81720-140</p><a href="tel:+5543991359944">(43) 99135-9944</a></div><div><h4>Explorar</h4><div className="footer-links"><a href="#categorias">Feminino</a><a href="#categorias">Categorias</a><a href="#marcas">Marcas</a><a href="#galeria">Galeria</a><a href="#avaliacoes">Avaliações</a></div></div><div><h4>Horários</h4><p>Segunda a quinta · 10h–20h<br />Sexta · 9h–21h<br />Sábado · 9h–20h<br />Domingo · 10h–19h</p></div></div><div className="footer-bottom page-width"><span>© 2026 Outlet.Go Curitiba. Todos os direitos reservados.</span><span>Uma loja para descobrir.</span></div></footer>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      {lightbox !== null && <Lightbox index={lightbox} onClose={() => setLightbox(null)} onChange={setLightbox} />}
    </div>
  );
}

function ProductCard({ product, onSelect }: { product: Product; onSelect: (product: Product) => void }) {
  const { index, setIndex, setPaused } = useCarousel(product.images);
  return (
    <article className="product-card">
      <div className="product-photo" style={{ backgroundColor: product.tone }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {product.images.map((img, i) => (
          <img key={img} src={img} alt={`${product.name} — foto ${i + 1}`} className={i === index ? 'is-active' : ''} />
        ))}
        <span>{product.category}</span>
        {product.images.length > 1 && (
          <div className="carousel-dots">
            {product.images.map((_, i) => (
              <button key={i} className={i === index ? 'active' : ''} onClick={(e) => { e.stopPropagation(); setIndex(i); }} aria-label={`Foto ${i + 1}`} />
            ))}
          </div>
        )}
      </div>
      <div className="product-info"><div><h4>{product.name}</h4><p>{product.sizes}</p></div><strong>{product.price}</strong></div>
      <button className="product-button" onClick={() => onSelect(product)}>Ver detalhes <ArrowUpRight size={16} /></button>
    </article>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return <div className="feature"><span>+</span><div><strong>{title}</strong><p>{text}</p></div></div>;
}

function OpeningHours() {
  const days = [['SEXTA', '09:00 – 21:00'], ['SÁBADO', '09:00 – 20:00'], ['DOMINGO', '10:00 – 19:00'], ['SEGUNDA', '10:00 – 20:00'], ['TERÇA', '10:00 – 20:00'], ['QUARTA', '10:00 – 20:00'], ['QUINTA', '10:00 – 20:00']];
  const today = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(new Date()).toUpperCase();
  return <div className="hours-list">{days.map(([day, time]) => <div className={today.includes(day) ? 'today' : ''} key={day}><span>{day}</span><strong>{time}</strong>{today.includes(day) && <small>Hoje</small>}</div>)}</div>;
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { index, setIndex, setPaused } = useCarousel(product.images, 4000);
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose} aria-label="Fechar"><X /></button>
        <div className="modal-image" style={{ backgroundColor: product.tone }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {product.images.map((img, i) => (
            <img key={img} src={img} alt={`${product.name} — foto ${i + 1}`} className={i === index ? 'is-active' : ''} />
          ))}
          {product.images.length > 1 && (
            <>
              <button className="modal-arrow modal-arrow-left" onClick={() => setIndex((index - 1 + product.images.length) % product.images.length)} aria-label="Anterior"><ChevronLeft /></button>
              <button className="modal-arrow modal-arrow-right" onClick={() => setIndex((index + 1) % product.images.length)} aria-label="Próxima"><ChevronRight /></button>
              <div className="carousel-dots modal-dots">
                {product.images.map((_, i) => (
                  <button key={i} className={i === index ? 'active' : ''} onClick={() => setIndex(i)} aria-label={`Foto ${i + 1}`} />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="modal-copy">
          <p className="eyebrow">{product.category}</p>
          <h2>{product.name}</h2>
          <strong className="modal-price">{product.price}</strong>
          <p>{product.description}</p>
          <div className="size-label">Tamanhos disponíveis <span>{product.sizes}</span></div>
          <a className="button button-dark" href={whatsappUrl} target="_blank" rel="noreferrer">Tenho interesse <MessageCircle size={17} /></a>
          <small>Fale com a loja para confirmar disponibilidade.</small>
        </div>
      </div>
    </div>
  );
}

function Lightbox({ index, onClose, onChange }: { index: number; onClose: () => void; onChange: (index: number) => void }) {
  const item = gallery[index];
  return <div className="lightbox" role="dialog" aria-modal="true"><button className="lightbox-close" onClick={onClose} aria-label="Fechar"><X /></button><button className="lightbox-arrow left" onClick={() => onChange((index - 1 + gallery.length) % gallery.length)} aria-label="Anterior"><ChevronLeft /></button><img src={item.src} alt={item.label} /><button className="lightbox-arrow right" onClick={() => onChange((index + 1) % gallery.length)} aria-label="Próxima"><ChevronRight /></button><span>{index + 1} / {gallery.length} · {item.label}</span></div>;
}

export default App;
