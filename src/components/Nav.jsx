import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navItems = [
    { to: '/', label: 'Home', end: true },
    { to: '/research', label: 'Research' },
    { to: '/teaching', label: 'Teaching' },
    { to: '/projects', label: 'Projects' },
    { to: '/resources', label: 'Resources' },
    { to: '/blog', label: 'Blog' },
    { to: '/about', label: 'About' },
  ]

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-200 ${
        scrolled ? 'border-b border-gray-200 shadow-sm' : 'border-b border-transparent'
      }`}
    >
      <nav className="container-page flex items-center justify-between h-16">
        <Link to="/" className="font-serif text-base md:text-lg text-navy-600 font-semibold hover:text-navy-400 transition-colors whitespace-nowrap flex items-center gap-2">
          <span className="w-7 h-7 rounded-md bg-navy-600 text-white text-xs flex items-center justify-center font-bold">IA</span>
          <span className="hidden sm:inline">Dr. Irfan Ahmad</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `text-sm px-3 py-2 rounded-md transition-all ${
                  isActive
                    ? 'text-navy-600 font-semibold bg-navy-50'
                    : 'text-body hover:text-navy-600 hover:bg-navy-50/50'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <Link to="/about#contact" className="hidden lg:inline-flex btn-primary !py-2 !px-4">
          Contact
        </Link>

        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden text-navy-600 p-2 -mr-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="container-page py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm py-2.5 px-3 rounded-md ${
                    isActive ? 'text-navy-600 font-semibold bg-navy-50' : 'text-body'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/about#contact"
              onClick={() => setMenuOpen(false)}
              className="btn-primary !py-2 !px-4 w-fit mt-2"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
