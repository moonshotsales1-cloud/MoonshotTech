"use client";

import dynamic from 'next/dynamic';

const StaggeredMenu = dynamic(() => import('@/components/StaggeredMenu'), { ssr: false });

const Navbar = ({ onMenuStateChange }) => {
    const menuItems = [
        { label: 'Home', link: '/', ariaLabel: 'Go to Home' },
        { label: 'About Us', link: '/about-us', ariaLabel: 'Go to About' },
        { label: 'Portfolio', link: '/portfolio', ariaLabel: 'Go to Portfolio' },
        { label: 'Industries', link: '/industries', ariaLabel: 'Go to Industries' },
        { 
            label: 'Services', 
            link: '#services', 
            ariaLabel: 'Go to Services',
            hasDropdown: true,
            dropdownItems: [
                { label: 'Animations', link: '/services/animations' },
                { label: 'Branding', link: '/services/branding' },
                { label: 'E-Commerce', link: '/services/e-commerce' },
                { label: 'Web Development', link: '/services/web-development' },
                { label: 'Web Applications', link: '/services/web-applications' },
                { label: 'Mobile Applications', link: '/services/mobile-applications' },
                { label: 'UI/UX', link: '/services/ui-ux' },
                { label: 'Digital Marketing', link: '/services/digital-marketing' },
                { label: 'Email Marketing', link: '/services/email-marketing' },
                { label: 'Google Ads', link: '/services/google-ads' },
                { label: 'SEO', link: '/services/seo' },
                { label: 'SMM', link: '/services/smm' }
            ]
        },
        { label: 'Contact', link: '/contact-us', ariaLabel: 'Go to Contact' }
    ];

    const socialItems = [
        { label: 'Twitter', link: 'https://twitter.com' },
        { label: 'LinkedIn', link: 'https://linkedin.com' },
        { label: 'Instagram', link: 'https://instagram.com' },
        { label: 'GitHub', link: 'https://github.com' }
    ];

    return (
        <StaggeredMenu
            position="left"
            colors={['#38BDF8', '#FA2889', '#FFD700', '#3E5FF9']}
            items={menuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            logoUrl="/images/primary-logo.png"
            menuButtonColor="#ffffff"
            openMenuButtonColor="#000000"
            changeMenuColorOnOpen={true}
            isFixed={false}
            accentColor="#FA2889"
            onMenuOpen={() => onMenuStateChange?.(true)}
            onMenuClose={() => onMenuStateChange?.(false)}
        />
    );
};

export default Navbar;