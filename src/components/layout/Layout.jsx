import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="site-shell">
      <div className="aurora-layer" aria-hidden="true" />
      <div className="particle-field" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <span key={index} className={`particle particle-${index + 1}`} />
        ))}
      </div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
