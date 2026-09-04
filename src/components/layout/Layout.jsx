import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="site-shell">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout