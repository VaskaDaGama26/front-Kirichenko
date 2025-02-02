import React, { useState, useEffect } from 'react'
import classes from './css-modules/Nav.module.css'
import logo from './static/logo.svg'

const Nav = ({ setSearchValue }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [headerTop, setHeaderTop] = useState(0);

    // navigation items 
    const NavItems = [
        {
            id: 1,
            label: 'Demos',
            link: '#',
            dropdown: [
                { id: 1, label: 'Post Header', link: '#' },
                { id: 2, label: 'Post Layout', link: '#' },
                { id: 3, label: 'Share Buttons', link: '#' },
                { id: 4, label: 'Gallery Post', link: '#' },
                { id: 5, label: 'Video Post', link: '#' }
            ],
        },
        {
            id: 2,
            label: 'Post',
            link: '#',
            dropdown: [
                { id: 1, label: 'Post Header', link: '#' },
                { id: 2, label: 'Post Layout', link: '#' },
                { id: 3, label: 'Share Buttons', link: '#' },
                { id: 4, label: 'Gallery Post', link: '#' },
                { id: 5, label: 'Video Post', link: '#' }
            ],
        },
        {
            id: 3,
            label: 'Features',
            link: '#',
            dropdown: [
                { id: 1, label: 'Post Header', link: '#' },
                { id: 2, label: 'Post Layout', link: '#' },
                { id: 3, label: 'Share Buttons', link: '#' },
                { id: 4, label: 'Gallery Post', link: '#' },
                { id: 5, label: 'Video Post', link: '#' }
            ],
        },
        {
            id: 4,
            label: 'Categories',
            link: '#',
            dropdown: [
                { id: 1, label: 'Post Header', link: '#' },
                { id: 2, label: 'Post Layout', link: '#' },
                { id: 3, label: 'Share Buttons', link: '#' },
                { id: 4, label: 'Gallery Post', link: '#' },
                { id: 5, label: 'Video Post', link: '#' }
            ],
        },
        {
            id: 5,
            label: 'Shop',
            link: '#',
            dropdown: [
                { id: 1, label: 'Post Header', link: '#' },
                { id: 2, label: 'Post Layout', link: '#' },
                { id: 3, label: 'Share Buttons', link: '#' },
                { id: 4, label: 'Gallery Post', link: '#' },
                { id: 5, label: 'Video Post', link: '#' }
            ],
        },
        {
            id: 6,
            label: 'Buy Now',
            link: '#',
        },
    ]
    // block scrolling when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    // handle scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY || document.documentElement.scrollTop;
            if (currentScroll > 200) {
                if (currentScroll > lastScrollTop) {
                    setHeaderTop(-400);
                } else {
                    setHeaderTop(0);
                }
            }

            setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);

    const renderNavItems = (items) => {
        return (
            items.map((item) => (
                <li key={item.id} className={classes.nav__item}>
                    <a href={item.link} className={classes.link}>{item.label}</a>
                    {item.dropdown && (
                        <ion-icon class={classes.chevron} name="chevron-down-outline"></ion-icon>
                    )}
                    {item.dropdown && (
                        <ul className={classes.dropdown}>
                            {item.dropdown.map((option, index) => (
                                <div key={option.id}>
                                    <li className={classes.option}>
                                        <a href={option.link} className={classes.link}>{option.label}</a>
                                        <ion-icon class={classes.chevron} name="chevron-forward-outline"></ion-icon>
                                    </li>
                                    {index < item.dropdown.length - 1 && <hr />}
                                </div>
                            ))}
                        </ul>
                    )}
                </li>
            ))
        )
    }

    return (
        <>
            <div className={classes.container} style={{ top: headerTop }}>
                <div className={classes.row__search}>
                    <button className={classes.burger} onClick={() => setIsMenuOpen(!isMenuOpen)}><ion-icon name="menu-outline"></ion-icon></button>
                    <div className={classes.logo}><img src={logo} /></div>
                    
                    <div className={`${classes.search} ${isSearchOpen ? classes.open : ''}`}>
                        <form className={classes.search__form}>
                            <input
                                type="text"
                                placeholder='Search...'
                                className={classes.search__input}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </form>
                    </div>
                    <button className={classes.search__icon} onClick={() => setIsSearchOpen(!isSearchOpen)}><ion-icon name="search-outline"></ion-icon></button>

                </div>
                <div className={classes.row}>

                    {/* Desktop Menu */}
                    <nav className={classes.desktopNav}>
                        <div className={classes.desktopMenu}>
                            <ul className={classes.items}>
                                {renderNavItems(NavItems)}
                            </ul>
                        </div>
                    </nav>

                    {/* Mobile Menu */}
                    <div className={`${classes.mobileMenu} ${isMenuOpen ? classes.open : ''}`}>
                        <nav className={classes.mobileNav}>
                            <div className={classes.mobileRow}>
                                <div className={classes.logo}><img src={logo} /></div>
                                <div className={classes.close} onClick={() => setIsMenuOpen(prevState => !prevState)}><ion-icon name="close-outline"></ion-icon></div>
                            </div>
                            <ul className={classes.items}>
                                {renderNavItems(NavItems)}
                            </ul>
                        </nav>
                    </div>

                    <div className={`${classes.bg} ${isMenuOpen ? classes.open : ''}`} onClick={() => setIsMenuOpen(false)}></div>


                </div>
            </div>
        </>
    )
}

export default Nav