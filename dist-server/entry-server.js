import { renderToString } from "react-dom/server";
import { StaticRouterProvider, createStaticHandler, createStaticRouter } from "react-router";
import { Suspense, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { App, Avatar, Button, Card, Col, ConfigProvider, Drawer, FloatButton, Form, Image, Input, Row, Segmented, Space, Spin, Tag, Timeline, Tooltip, Typography, theme } from "antd";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ArrowRightOutlined, ArrowUpOutlined, CalendarOutlined, ClockCircleOutlined, CloseOutlined, ClusterOutlined, DribbbleOutlined, EnvironmentOutlined, GithubOutlined, HomeOutlined, LinkOutlined, LinkedinOutlined, MailOutlined, MediumOutlined, MenuOutlined, MoonOutlined, PhoneOutlined, ReadOutlined, RocketOutlined, SendOutlined, StarFilled, SunOutlined, TeamOutlined, TwitterOutlined } from "@ant-design/icons";
import { AnimatePresence, animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
//#region src/theme/theme-context.ts
var ThemeContext = createContext(null);
/** Access the active color scheme and its setters. */
function useTheme() {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error("useTheme must be used within a <ThemeProvider>");
	return ctx;
}
//#endregion
//#region src/theme/tokens.ts
/**
* Brand palette. These CSS variables are also mirrored in global.css so that
* non-antd surfaces (gradients, custom canvases) stay in sync with the theme.
*/
var brand = {
	/** Deep teal primary with a golden accent, on a warm cream base. */
	primaryLight: "#15695e",
	primaryDark: "#4fb39c",
	accent: "#f2a73b",
	success: "#16a34a",
	warning: "#d97706",
	error: "#dc2626"
};
var sharedToken = {
	colorSuccess: brand.success,
	colorWarning: brand.warning,
	colorError: brand.error,
	borderRadius: 12,
	fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
	fontSize: 15,
	lineHeight: 1.65,
	wireframe: false
};
var getThemeConfig = (scheme) => ({
	algorithm: scheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
	token: {
		...sharedToken,
		colorPrimary: scheme === "dark" ? brand.primaryDark : brand.primaryLight,
		colorInfo: scheme === "dark" ? brand.primaryDark : brand.primaryLight,
		colorLink: scheme === "dark" ? brand.primaryDark : brand.primaryLight,
		colorLinkHover: scheme === "dark" ? "#74c9b4" : "#0f4e45",
		...scheme === "dark" ? {
			colorBgBase: "#0e1f1c",
			colorBgLayout: "#0e1f1c",
			colorBgContainer: "#16302c",
			colorBgElevated: "#1b3a35",
			colorBorder: "rgba(231,236,228,0.12)",
			colorBorderSecondary: "rgba(231,236,228,0.07)",
			colorTextBase: "#eaf0e8"
		} : {
			colorBgBase: "#f6f2e9",
			colorBgLayout: "#f6f2e9",
			colorBgContainer: "#ffffff",
			colorBgElevated: "#ffffff",
			colorBorder: "rgba(27,58,54,0.12)",
			colorBorderSecondary: "rgba(27,58,54,0.07)",
			colorTextBase: "#1b3a36"
		}
	},
	components: {
		Layout: {
			headerBg: "transparent",
			bodyBg: "transparent",
			footerBg: "transparent"
		},
		Card: { borderRadiusLG: 18 },
		Button: {
			controlHeight: 40,
			fontWeight: 600,
			primaryShadow: "none"
		},
		Menu: {
			itemBg: "transparent",
			horizontalItemSelectedColor: scheme === "dark" ? brand.primaryDark : brand.primaryLight
		},
		Typography: {
			titleMarginBottom: "0.4em",
			titleMarginTop: "0"
		}
	}
});
//#endregion
//#region src/theme/ThemeProvider.tsx
var STORAGE_KEY = "portfolio-color-scheme";
function getInitialScheme() {
	if (typeof window === "undefined") return "light";
	const stored = window.localStorage.getItem(STORAGE_KEY);
	if (stored === "light" || stored === "dark") return stored;
	return "light";
}
/**
* Owns the active color scheme, persists the choice, reflects it on the
* document root (for CSS variables) and feeds the Ant Design ConfigProvider.
*/
function ThemeProvider({ children }) {
	const [scheme, setSchemeState] = useState(getInitialScheme);
	useEffect(() => {
		document.documentElement.dataset.theme = scheme;
		document.documentElement.style.colorScheme = scheme;
		window.localStorage.setItem(STORAGE_KEY, scheme);
	}, [scheme]);
	const setScheme = useCallback((next) => setSchemeState(next), []);
	const toggleScheme = useCallback(() => setSchemeState((prev) => prev === "dark" ? "light" : "dark"), []);
	const value = useMemo(() => ({
		scheme,
		setScheme,
		toggleScheme
	}), [
		scheme,
		setScheme,
		toggleScheme
	]);
	const themeConfig = useMemo(() => getThemeConfig(scheme), [scheme]);
	return /* @__PURE__ */ jsx(ThemeContext.Provider, {
		value,
		children: /* @__PURE__ */ jsx(ConfigProvider, {
			theme: themeConfig,
			children: /* @__PURE__ */ jsx(App, { children })
		})
	});
}
//#endregion
//#region src/config/site.ts
var siteConfig = {
	/** Used in <title>, meta tags and the footer. */
	name: "Pasindu Weerakoon",
	shortName: "PW",
	jobTitle: "Technical Lead · React & Frontend Architect",
	location: "Colombo, Sri Lanka",
	description: "Portfolio of Pasindu Weerakoon — Technical Lead, Software Engineer and React & Frontend Architect based in Colombo, Sri Lanka. 9+ years building scalable web and mobile products, micro-frontend platforms and design systems.",
	/** Keywords the site should be discoverable for. */
	keywords: [
		"Pasindu Weerakoon",
		"Pasindu",
		"Weerakoon",
		"Software Engineer",
		"Software Developer",
		"Technical Lead",
		"React Developer",
		"Frontend Architect",
		"Frontend Developer",
		"Sri Lanka",
		"Colombo",
		"React",
		"TypeScript",
		"React Native",
		"Web Developer Sri Lanka"
	],
	url: "https://pasinduweerakoon.com",
	/** Public social / professional profiles (used for Person schema sameAs). */
	socials: ["https://www.linkedin.com/in/pasindu-weerakoon", "https://github.com/WMPasindu"],
	/** Primary navigation, also drives the mobile drawer. */
	nav: [
		{
			label: "Home",
			to: "/"
		},
		{
			label: "About",
			to: "/about"
		},
		{
			label: "Projects",
			to: "/projects"
		},
		{
			label: "Articles",
			to: "/articles"
		},
		{
			label: "Gallery",
			to: "/gallery"
		},
		{
			label: "Contact",
			to: "/contact"
		}
	]
};
//#endregion
//#region src/components/common/Logo.tsx
/** Elegant serif wordmark — understated, editorial. */
function Logo() {
	return /* @__PURE__ */ jsx(Link, {
		to: "/",
		className: "brand",
		"aria-label": `${siteConfig.name} — home`,
		children: /* @__PURE__ */ jsx("span", {
			className: "brand__word",
			children: siteConfig.name
		})
	});
}
//#endregion
//#region src/components/common/ThemeToggle.tsx
/** Animated light/dark toggle that rotates the icon on switch. */
function ThemeToggle() {
	const { scheme, toggleScheme } = useTheme();
	const isDark = scheme === "dark";
	return /* @__PURE__ */ jsx(Tooltip, {
		title: isDark ? "Switch to light" : "Switch to dark",
		children: /* @__PURE__ */ jsx(Button, {
			shape: "circle",
			type: "text",
			onClick: toggleScheme,
			"aria-label": "Toggle color theme",
			children: /* @__PURE__ */ jsx(AnimatePresence, {
				mode: "wait",
				initial: false,
				children: /* @__PURE__ */ jsx(motion.span, {
					initial: {
						rotate: -90,
						opacity: 0
					},
					animate: {
						rotate: 0,
						opacity: 1
					},
					exit: {
						rotate: 90,
						opacity: 0
					},
					transition: { duration: .2 },
					style: { display: "inline-flex" },
					children: isDark ? /* @__PURE__ */ jsx(SunOutlined, {}) : /* @__PURE__ */ jsx(MoonOutlined, {})
				}, scheme)
			})
		})
	});
}
//#endregion
//#region src/components/common/Container.tsx
var maxWidths = {
	narrow: 760,
	default: 1160,
	wide: 1320
};
/** Centers content with a consistent max-width and responsive gutters. */
function Container({ children, size = "default", className, style }) {
	return /* @__PURE__ */ jsx("div", {
		className,
		style: {
			width: "100%",
			maxWidth: maxWidths[size],
			marginInline: "auto",
			paddingInline: "clamp(20px, 5vw, 40px)",
			...style
		},
		children
	});
}
//#endregion
//#region src/hooks/useMediaQuery.ts
/** Subscribe to a CSS media query and re-render when it changes. */
function useMediaQuery(query) {
	const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
	useEffect(() => {
		const mql = window.matchMedia(query);
		const onChange = () => setMatches(mql.matches);
		onChange();
		mql.addEventListener("change", onChange);
		return () => mql.removeEventListener("change", onChange);
	}, [query]);
	return matches;
}
/** Convenience hook: true on viewports below the antd `lg` breakpoint. */
function useIsMobile() {
	return useMediaQuery("(max-width: 991px)");
}
//#endregion
//#region src/layout/Navbar.tsx
function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const isMobile = useIsMobile();
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const links = siteConfig.nav.map((item) => /* @__PURE__ */ jsx(NavLink, {
		to: item.to,
		end: item.to === "/",
		className: ({ isActive }) => `nav-link${isActive ? " nav-link--active" : ""}`,
		onClick: () => setOpen(false),
		children: item.label
	}, item.to));
	return /* @__PURE__ */ jsxs(motion.header, {
		className: `navbar${scrolled ? " navbar--scrolled" : ""}`,
		initial: {
			y: -80,
			opacity: 0
		},
		animate: {
			y: 0,
			opacity: 1
		},
		transition: {
			duration: .5,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		children: [/* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", {
			className: "navbar__inner",
			children: [
				/* @__PURE__ */ jsx(Logo, {}),
				!isMobile && /* @__PURE__ */ jsx("nav", {
					className: "navbar__links",
					children: links
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "navbar__actions",
					children: [
						/* @__PURE__ */ jsx(ThemeToggle, {}),
						!isMobile && /* @__PURE__ */ jsx(Button, {
							type: "primary",
							shape: "round",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/contact",
								children: "Let’s talk"
							})
						}),
						isMobile && /* @__PURE__ */ jsx(Button, {
							type: "text",
							shape: "circle",
							"aria-label": "Open menu",
							icon: /* @__PURE__ */ jsx(MenuOutlined, {}),
							onClick: () => setOpen(true)
						})
					]
				})
			]
		}) }), /* @__PURE__ */ jsxs(Drawer, {
			placement: "right",
			open: open && isMobile,
			onClose: () => setOpen(false),
			closeIcon: /* @__PURE__ */ jsx(CloseOutlined, {}),
			title: siteConfig.shortName,
			width: 280,
			children: [/* @__PURE__ */ jsx("nav", {
				className: "navbar__drawer-links",
				children: links
			}), /* @__PURE__ */ jsx(Button, {
				type: "primary",
				block: true,
				shape: "round",
				style: { marginTop: 24 },
				onClick: () => setOpen(false),
				children: /* @__PURE__ */ jsx(Link, {
					to: "/contact",
					children: "Let’s talk"
				})
			})]
		})]
	});
}
//#endregion
//#region src/data/profile.ts
/**
* Personal profile. Sourced from Pasindu Weerakoon's CV — edit here to update
* the hero, about page, footer and contact surfaces in one place.
*/
var profile = {
	name: "Pasindu Weerakoon",
	firstName: "Pasindu",
	title: "Technical Lead · React & Frontend Architect",
	roleLines: [
		"Technical",
		"Lead &",
		"Architect"
	],
	specialization: "Specialized in React, Frontend Architecture, Micro-frontends, Design Systems, and Cross-Platform Mobile.",
	portrait: "/portrait.png",
	taglines: [
		"I lead teams that ship.",
		"I architect frontends that scale.",
		"I turn complexity into clean systems.",
		"I grow engineers into leaders."
	],
	location: "Colombo, Western Province, Sri Lanka",
	email: "wmpasindu@gmail.com",
	phone: "+94 71 583 6036",
	summary: "Strategic Senior Technical Lead with 9+ years in frontend engineering and architectural design — building scalable web ecosystems in React, leading multi-team units of 15+ engineers, and aligning technical roadmaps with business goals.",
	bio: [
		"I am a Technical Lead and frontend architect with over nine years of experience building scalable web and cross-platform mobile products. I currently lead frontend engineering at 1 BillionTech, where I define the architectural roadmap for enterprise-grade products and shape the engineering culture across multiple teams.",
		"My focus is the intersection of architecture and delivery — micro-frontends, mono-repos, design systems, and the testing and CI practices that let teams move fast without breaking things. I have led the migration of a large healthcare platform from React 16 to React 18 with Next.js (improving performance ~25%), cut deployment cycles by 30% with CI/CD optimisation, and reduced user-perceived latency by 40% on critical search experiences.",
		"Beyond the code, I care deeply about people. I mentor mid-level and senior engineers, run TDD/clean-architecture programmes, and represent the technical voice with senior business stakeholders. I hold an MSc in IT (Enterprise Application Development) and a BSc Hons in IT, both from SLIIT."
	],
	avatar: "/avatar.svg",
	socials: [
		{
			label: "LinkedIn",
			href: "https://www.linkedin.com/in/pasindu-weerakoon",
			icon: "linkedin"
		},
		{
			label: "GitHub",
			href: "https://github.com/",
			icon: "github"
		},
		{
			label: "Email",
			href: "mailto:wmpasindu@gmail.com",
			icon: "mail"
		}
	],
	stats: [
		{
			label: "Years of experience",
			value: "9+"
		},
		{
			label: "Engineers led",
			value: "15+"
		},
		{
			label: "Deployment time cut",
			value: "30%"
		},
		{
			label: "Latency reduced",
			value: "40%"
		}
	]
};
//#endregion
//#region src/components/common/SocialLinks.tsx
var iconMap = {
	github: GithubOutlined,
	linkedin: LinkedinOutlined,
	twitter: TwitterOutlined,
	mail: MailOutlined,
	medium: MediumOutlined,
	dribbble: DribbbleOutlined
};
/** Renders the profile's social links as accessible icon buttons. */
function SocialLinks({ size = "middle" }) {
	return /* @__PURE__ */ jsx("div", {
		style: {
			display: "inline-flex",
			gap: 8
		},
		children: profile.socials.map((social) => {
			const Icon = iconMap[social.icon];
			const isMail = social.icon === "mail";
			return /* @__PURE__ */ jsx(Tooltip, {
				title: social.label,
				children: /* @__PURE__ */ jsx(Button, {
					shape: "circle",
					size,
					type: "text",
					href: social.href,
					target: isMail ? void 0 : "_blank",
					rel: isMail ? void 0 : "noopener noreferrer",
					"aria-label": social.label,
					icon: /* @__PURE__ */ jsx(Icon, {})
				})
			}, social.label);
		})
	});
}
//#endregion
//#region src/layout/Footer.tsx
var { Text: Text$6 } = Typography;
function Footer() {
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	return /* @__PURE__ */ jsx("footer", {
		className: "footer",
		children: /* @__PURE__ */ jsxs(Container, { children: [/* @__PURE__ */ jsxs("div", {
			className: "footer__grid",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("p", {
					className: "footer__cta-eyebrow eyebrow",
					children: "Have an idea?"
				}),
				/* @__PURE__ */ jsx(Link, {
					to: "/contact",
					className: "footer__cta",
					children: "Let’s build something →"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "footer__email",
					children: /* @__PURE__ */ jsx("a", {
						href: `mailto:${profile.email}`,
						children: profile.email
					})
				})
			] }), /* @__PURE__ */ jsx("nav", {
				className: "footer__nav",
				"aria-label": "Footer",
				children: siteConfig.nav.map((item) => /* @__PURE__ */ jsx(Link, {
					to: item.to,
					className: "footer__link",
					children: item.label
				}, item.to))
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "footer__bottom",
			children: [/* @__PURE__ */ jsxs(Text$6, {
				type: "secondary",
				children: [
					"© ",
					year,
					" ",
					siteConfig.name,
					". Built with React, TypeScript & Ant Design."
				]
			}), /* @__PURE__ */ jsx(SocialLinks, { size: "small" })]
		})] })
	});
}
//#endregion
//#region src/layout/ScrollToTop.tsx
/**
* Resets scroll position to the top on every route change so new pages don't
* inherit the previous page's scroll offset.
*/
function ScrollToTop() {
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "instant"
		});
	}, [pathname]);
	return null;
}
//#endregion
//#region src/hooks/useScrollProgress.ts
/**
* Tracks how far the page has been scrolled (0 → 1).
* Drives the slim progress bar at the top of the layout.
*/
function useScrollProgress() {
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		let frame = 0;
		const update = () => {
			const scrollTop = window.scrollY;
			const height = document.documentElement.scrollHeight - window.innerHeight;
			setProgress(height > 0 ? Math.min(scrollTop / height, 1) : 0);
		};
		const onScroll = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(update);
		};
		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);
	return progress;
}
//#endregion
//#region src/layout/ScrollProgressBar.tsx
/** Slim gradient bar pinned to the top edge that tracks reading progress. */
function ScrollProgressBar() {
	return /* @__PURE__ */ jsx("div", {
		className: "scroll-progress",
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsx("div", {
			className: "scroll-progress__bar",
			style: { transform: `scaleX(${useScrollProgress()})` }
		})
	});
}
//#endregion
//#region src/components/feature/CardSpotlight.tsx
var SELECTOR = ".project-card.ant-card, .article-card.ant-card, .feature-card.ant-card";
/**
* Mounts a single global pointer listener that gives every card a
* cursor-following radial glow by writing --mx / --my CSS variables on the
* card under the pointer. One delegated listener keeps it cheap regardless of
* how many cards are on the page. Renders nothing.
*/
function CardSpotlight() {
	useEffect(() => {
		const onMove = (event) => {
			const card = event.target?.closest(SELECTOR);
			if (!card) return;
			const rect = card.getBoundingClientRect();
			const x = (event.clientX - rect.left) / rect.width * 100;
			const y = (event.clientY - rect.top) / rect.height * 100;
			card.style.setProperty("--mx", `${x}%`);
			card.style.setProperty("--my", `${y}%`);
		};
		window.addEventListener("pointermove", onMove, { passive: true });
		return () => window.removeEventListener("pointermove", onMove);
	}, []);
	return null;
}
//#endregion
//#region src/layout/AppLayout.tsx
/**
* Application shell: fixed navbar, animated page outlet, footer, plus the
* cross-cutting reading-progress bar and scroll helpers.
*/
function AppLayout() {
	return /* @__PURE__ */ jsxs("div", {
		className: "app-shell",
		children: [
			/* @__PURE__ */ jsx(ScrollToTop, {}),
			/* @__PURE__ */ jsx(CardSpotlight, {}),
			/* @__PURE__ */ jsx(ScrollProgressBar, {}),
			/* @__PURE__ */ jsx(Navbar, {}),
			/* @__PURE__ */ jsx("main", {
				id: "main",
				className: "app-main",
				children: /* @__PURE__ */ jsx(Suspense, {
					fallback: /* @__PURE__ */ jsx("div", {
						className: "route-fallback",
						children: /* @__PURE__ */ jsx(Spin, { size: "large" })
					}),
					children: /* @__PURE__ */ jsx(Outlet, {})
				})
			}),
			/* @__PURE__ */ jsx(Footer, {}),
			/* @__PURE__ */ jsx(FloatButton.BackTop, {
				visibilityHeight: 600,
				icon: /* @__PURE__ */ jsx(ArrowUpOutlined, {}),
				"aria-label": "Back to top"
			})
		]
	});
}
var fadeUp = {
	hidden: {
		opacity: 0,
		y: 24
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring",
			stiffness: 120,
			damping: 18,
			mass: .8
		}
	}
};
/** Parent container that staggers its children's entrances. */
var staggerContainer = {
	hidden: {},
	visible: { transition: {
		staggerChildren: .08,
		delayChildren: .05
	} }
};
/** Page-level transition for route changes. */
var pageTransition = {
	initial: {
		opacity: 0,
		y: 16
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .4,
			ease: [
				.22,
				1,
				.36,
				1
			]
		}
	},
	exit: {
		opacity: 0,
		y: -12,
		transition: {
			duration: .25,
			ease: "easeIn"
		}
	}
};
//#endregion
//#region src/components/animations/PageTransition.tsx
/**
* Wraps each routed page so navigation feels like a smooth crossfade-and-lift
* rather than a hard cut. Rendered inside <AnimatePresence> in the router.
*/
function PageTransition({ children }) {
	if (useReducedMotion()) return /* @__PURE__ */ jsx(Fragment, { children });
	return /* @__PURE__ */ jsx(motion.div, {
		variants: pageTransition,
		initial: "initial",
		animate: "animate",
		exit: "exit",
		children
	});
}
//#endregion
//#region src/components/common/Section.tsx
/** A vertically-padded page section with an optional muted background. */
function Section({ children, id, muted = false, containerSize = "default", className }) {
	return /* @__PURE__ */ jsx("section", {
		id,
		className,
		style: {
			paddingBlock: "clamp(56px, 9vw, 112px)",
			background: muted ? "var(--surface-muted)" : "transparent"
		},
		children: /* @__PURE__ */ jsx(Container, {
			size: containerSize,
			children
		})
	});
}
//#endregion
//#region src/components/animations/Reveal.tsx
/**
* Reveals its children with a spring entrance the first time they scroll into
* view. Falls back to a static render when the user prefers reduced motion.
*/
function Reveal({ children, variants = fadeUp, delay = 0, once = true, className, as = "div" }) {
	const prefersReduced = useReducedMotion();
	const MotionTag = motion[as];
	if (prefersReduced) return /* @__PURE__ */ jsx(as, {
		className,
		children
	});
	return /* @__PURE__ */ jsx(MotionTag, {
		className,
		variants,
		initial: "hidden",
		whileInView: "visible",
		viewport: {
			once,
			amount: .2
		},
		transition: { delay },
		children
	});
}
//#endregion
//#region src/components/common/SectionHeading.tsx
var { Title: Title$7, Paragraph: Paragraph$7 } = Typography;
/** Consistent, animated heading used to introduce every major section. */
function SectionHeading({ eyebrow, title, subtitle, align = "left" }) {
	return /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", {
		style: {
			textAlign: align,
			maxWidth: align === "center" ? 720 : void 0,
			marginInline: align === "center" ? "auto" : void 0,
			marginBottom: "clamp(28px, 4vw, 48px)"
		},
		children: [
			eyebrow && /* @__PURE__ */ jsx("span", {
				className: "eyebrow",
				children: eyebrow
			}),
			/* @__PURE__ */ jsx(Title$7, {
				level: 2,
				style: { marginTop: eyebrow ? 12 : 0 },
				children: title
			}),
			subtitle && /* @__PURE__ */ jsx(Paragraph$7, {
				type: "secondary",
				style: {
					fontSize: 17,
					marginBottom: 0
				},
				children: subtitle
			})
		]
	}) });
}
//#endregion
//#region src/components/animations/Stagger.tsx
/**
* Container that choreographs its <StaggerItem> children into view one after
* another. Pair with <StaggerItem> for grids and lists.
*/
function Stagger({ children, className, amount = .15 }) {
	if (useReducedMotion()) return /* @__PURE__ */ jsx("div", {
		className,
		children
	});
	return /* @__PURE__ */ jsx(motion.div, {
		className,
		variants: staggerContainer,
		initial: "hidden",
		whileInView: "visible",
		viewport: {
			once: true,
			amount
		},
		children
	});
}
function StaggerItem({ children, className }) {
	if (useReducedMotion()) return /* @__PURE__ */ jsx("div", {
		className,
		children
	});
	return /* @__PURE__ */ jsx(motion.div, {
		className,
		variants: fadeUp,
		children
	});
}
//#endregion
//#region src/components/feature/Hero.tsx
var ease = [
	.22,
	1,
	.36,
	1
];
/**
* Showcase hero modelled on the reference: an intro on the left ("Hy! I Am" +
* name in gold, years + socials below, with a dashed arrow), a circular framed
* portrait in the centre, and a tagline + glass credential card + script
* sign-off on the right.
*/
function Hero() {
	const prefersReduced = useReducedMotion();
	const rise = (delay, x = 0) => prefersReduced ? {} : {
		initial: {
			opacity: 0,
			y: 24,
			x
		},
		animate: {
			opacity: 1,
			y: 0,
			x: 0
		},
		transition: {
			duration: .7,
			ease,
			delay
		}
	};
	return /* @__PURE__ */ jsx("section", {
		className: "hero",
		children: /* @__PURE__ */ jsx(Container, {
			size: "wide",
			children: /* @__PURE__ */ jsxs("div", {
				className: "hero__stage",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "hero__left",
						children: [
							/* @__PURE__ */ jsxs(motion.div, {
								...rise(.05, -20),
								children: [/* @__PURE__ */ jsx("p", {
									className: "hero__hi",
									children: "Hy! I Am"
								}), /* @__PURE__ */ jsxs("h1", {
									className: "hero__name",
									children: [profile.firstName, /* @__PURE__ */ jsx("span", {
										className: "hero__name-dot",
										children: "."
									})]
								})]
							}),
							/* @__PURE__ */ jsx(motion.span, {
								className: "hero__arrow",
								"aria-hidden": "true",
								...rise(.5),
								children: /* @__PURE__ */ jsx("svg", {
									viewBox: "0 0 220 135",
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ jsx("path", {
										className: "hero__arrow-path",
										d: "M210 14 C150 -6 70 24 96 78 C108 104 150 104 150 78 C150 58 120 60 110 84 C100 108 60 120 22 108 L46 96 M22 108 L46 124",
										fill: "none",
										stroke: "var(--primary)",
										strokeWidth: "3",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										strokeDasharray: "2 12"
									})
								})
							}),
							/* @__PURE__ */ jsxs(motion.div, {
								className: "hero__exp",
								...rise(.35),
								children: [/* @__PURE__ */ jsx("span", {
									className: "hero__exp-num",
									children: "9+"
								}), /* @__PURE__ */ jsxs("span", {
									className: "hero__exp-text",
									children: [
										"Years",
										/* @__PURE__ */ jsx("br", {}),
										"Experience"
									]
								})]
							}),
							/* @__PURE__ */ jsx(motion.div, {
								className: "hero__socials",
								...rise(.45),
								children: /* @__PURE__ */ jsx(SocialLinks, { size: "middle" })
							})
						]
					}),
					/* @__PURE__ */ jsx(motion.div, {
						className: "hero__portrait",
						...prefersReduced ? {} : {
							initial: {
								opacity: 0,
								scale: .94
							},
							animate: {
								opacity: 1,
								scale: 1
							},
							transition: {
								duration: .9,
								ease,
								delay: .15
							}
						},
						children: /* @__PURE__ */ jsx("div", {
							className: "hero__portrait-ring",
							children: /* @__PURE__ */ jsx("img", {
								src: profile.portrait,
								alt: profile.name
							})
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "hero__right",
						children: [
							/* @__PURE__ */ jsxs(motion.p, {
								className: "hero__tagline",
								...rise(.2, 20),
								children: [
									"I build scalable systems and lead great teams,",
									/* @__PURE__ */ jsx("br", {}),
									"and I love what I do."
								]
							}),
							/* @__PURE__ */ jsxs(motion.div, {
								className: "hero__cred glass",
								...rise(.4),
								children: [/* @__PURE__ */ jsxs("div", {
									className: "hero__cred-top",
									children: [/* @__PURE__ */ jsx("span", {
										className: "hero__cred-label",
										children: "Trusted experience"
									}), /* @__PURE__ */ jsxs("span", {
										className: "hero__stars",
										"aria-hidden": "true",
										children: [
											/* @__PURE__ */ jsx(StarFilled, {}),
											/* @__PURE__ */ jsx(StarFilled, {}),
											/* @__PURE__ */ jsx(StarFilled, {}),
											/* @__PURE__ */ jsx(StarFilled, {}),
											/* @__PURE__ */ jsx(StarFilled, {})
										]
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "hero__cred-bottom",
									children: [/* @__PURE__ */ jsx("span", {
										className: "hero__cred-meta",
										children: "15+ engineers led · 9+ years"
									}), /* @__PURE__ */ jsx("strong", {
										className: "hero__cred-score",
										children: "5.0"
									})]
								})]
							}),
							/* @__PURE__ */ jsxs(motion.div, {
								className: "hero__signoff",
								...rise(.55),
								children: [/* @__PURE__ */ jsx("span", {
									className: "hero__signoff-script",
									children: "Technical"
								}), /* @__PURE__ */ jsx("span", {
									className: "hero__signoff-bold",
									children: "Lead."
								})]
							}),
							/* @__PURE__ */ jsx(motion.div, {
								className: "hero__cv",
								...rise(.6),
								children: /* @__PURE__ */ jsx(Button, {
									type: "primary",
									size: "large",
									shape: "round",
									children: /* @__PURE__ */ jsx(Link, {
										to: "/contact",
										children: "Let’s talk"
									})
								})
							})
						]
					})
				]
			})
		})
	});
}
//#endregion
//#region src/components/common/Cover.tsx
var isGradient = (value) => value.startsWith("linear-gradient") || value.startsWith("radial-gradient");
/**
* Unified cover renderer. Accepts a real image or a gradient string so content
* always looks intentional, even before real screenshots exist.
*/
function Cover({ source, alt = "", children, aspectRatio = "16 / 10", className, style }) {
	const gradient = isGradient(source);
	return /* @__PURE__ */ jsxs("div", {
		className,
		role: gradient ? "img" : void 0,
		"aria-label": gradient ? alt : void 0,
		style: {
			position: "relative",
			aspectRatio,
			overflow: "hidden",
			background: gradient ? source : "var(--surface-muted)",
			...style
		},
		children: [
			!gradient && /* @__PURE__ */ jsx("img", {
				src: source,
				alt,
				loading: "lazy",
				style: {
					width: "100%",
					height: "100%",
					objectFit: "cover",
					display: "block"
				}
			}),
			gradient && /* @__PURE__ */ jsx("span", {
				className: "cover__grain",
				"aria-hidden": "true"
			}),
			children
		]
	});
}
//#endregion
//#region src/components/feature/ProjectCard.tsx
var { Title: Title$6, Paragraph: Paragraph$6, Text: Text$5 } = Typography;
/** Rich project card with a generated cover, metrics, tags and links. */
function ProjectCard({ project }) {
	return /* @__PURE__ */ jsx(motion.div, {
		whileHover: { y: -6 },
		transition: {
			type: "spring",
			stiffness: 260,
			damping: 20
		},
		style: { height: "100%" },
		children: /* @__PURE__ */ jsxs(Card, {
			className: "project-card",
			variant: "borderless",
			styles: { body: { padding: 0 } },
			children: [/* @__PURE__ */ jsx(Cover, {
				source: project.cover,
				alt: project.title,
				children: /* @__PURE__ */ jsx("span", {
					className: "project-card__category",
					children: project.category
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "project-card__body",
				children: [
					/* @__PURE__ */ jsx(Title$6, {
						level: 4,
						style: { marginBottom: 6 },
						children: project.title
					}),
					/* @__PURE__ */ jsx(Paragraph$6, {
						type: "secondary",
						style: { marginBottom: 16 },
						children: project.summary
					}),
					project.metrics && /* @__PURE__ */ jsx("div", {
						className: "project-card__metrics",
						children: project.metrics.map((metric) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Text$5, {
							strong: true,
							className: "project-card__metric-value",
							children: metric.value
						}), /* @__PURE__ */ jsx(Text$5, {
							type: "secondary",
							className: "project-card__metric-label",
							children: metric.label
						})] }, metric.label))
					}),
					/* @__PURE__ */ jsx(Space, {
						size: [6, 6],
						wrap: true,
						style: { marginBlock: 16 },
						children: project.tags.map((tag) => /* @__PURE__ */ jsx(Tag, {
							bordered: false,
							children: tag
						}, tag))
					}),
					/* @__PURE__ */ jsxs(Space, { children: [
						project.links.live && /* @__PURE__ */ jsx(Button, {
							type: "primary",
							size: "small",
							href: project.links.live,
							target: "_blank",
							rel: "noopener noreferrer",
							icon: /* @__PURE__ */ jsx(LinkOutlined, {}),
							children: "Live"
						}),
						project.links.repo && /* @__PURE__ */ jsx(Button, {
							size: "small",
							href: project.links.repo,
							target: "_blank",
							rel: "noopener noreferrer",
							icon: /* @__PURE__ */ jsx(GithubOutlined, {}),
							children: "Code"
						}),
						project.links.caseStudy && /* @__PURE__ */ jsx(Button, {
							size: "small",
							type: "text",
							href: project.links.caseStudy,
							icon: /* @__PURE__ */ jsx(ReadOutlined, {}),
							children: "Case study"
						})
					] })
				]
			})]
		})
	});
}
//#endregion
//#region src/utils/format.ts
/** Formatting helpers shared across the content surfaces. */
function formatDate(iso) {
	return new Date(iso).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
}
function formatReadingTime(minutes) {
	return `${minutes} min read`;
}
/** Estimate reading time from raw markdown at ~200 wpm. */
function estimateReadingMinutes(markdown) {
	const words = markdown.trim().split(/\s+/).length;
	return Math.max(1, Math.round(words / 200));
}
//#endregion
//#region src/components/feature/ArticleCard.tsx
var { Title: Title$5, Paragraph: Paragraph$5, Text: Text$4 } = Typography;
/** Card linking to a single article, used on the home and articles pages. */
function ArticleCard({ article }) {
	return /* @__PURE__ */ jsx(motion.div, {
		whileHover: { y: -6 },
		transition: {
			type: "spring",
			stiffness: 260,
			damping: 20
		},
		style: { height: "100%" },
		children: /* @__PURE__ */ jsx(Link, {
			to: `/articles/${article.slug}`,
			className: "article-card-link",
			children: /* @__PURE__ */ jsxs(Card, {
				className: "article-card",
				variant: "borderless",
				styles: { body: { padding: 0 } },
				children: [/* @__PURE__ */ jsx(Cover, {
					source: article.cover,
					alt: article.title,
					aspectRatio: "16 / 9"
				}), /* @__PURE__ */ jsxs("div", {
					className: "article-card__body",
					children: [
						/* @__PURE__ */ jsx(Space, {
							size: [6, 6],
							wrap: true,
							style: { marginBottom: 12 },
							children: article.tags.slice(0, 2).map((tag) => /* @__PURE__ */ jsx(Tag, {
								bordered: false,
								children: tag
							}, tag))
						}),
						/* @__PURE__ */ jsx(Title$5, {
							level: 4,
							style: { marginBottom: 8 },
							children: article.title
						}),
						/* @__PURE__ */ jsx(Paragraph$5, {
							type: "secondary",
							ellipsis: { rows: 2 },
							children: article.description
						}),
						/* @__PURE__ */ jsxs(Space, {
							split: "·",
							size: "small",
							className: "article-card__meta",
							children: [/* @__PURE__ */ jsxs(Text$4, {
								type: "secondary",
								children: [
									/* @__PURE__ */ jsx(CalendarOutlined, {}),
									" ",
									formatDate(article.date)
								]
							}), /* @__PURE__ */ jsxs(Text$4, {
								type: "secondary",
								children: [
									/* @__PURE__ */ jsx(ClockCircleOutlined, {}),
									" ",
									formatReadingTime(article.readingMinutes)
								]
							})]
						})
					]
				})]
			})
		})
	});
}
//#endregion
//#region src/hooks/usePrefersReducedMotion.ts
var QUERY = "(prefers-reduced-motion: reduce)";
/**
* Returns true when the user has requested reduced motion at the OS level.
* Animation components use this to fall back to instant transitions, keeping
* the experience accessible without sacrificing polish for everyone else.
*/
function usePrefersReducedMotion() {
	const [reduced, setReduced] = useState(() => typeof window !== "undefined" && window.matchMedia(QUERY).matches);
	useEffect(() => {
		const mql = window.matchMedia(QUERY);
		const onChange = () => setReduced(mql.matches);
		mql.addEventListener("change", onChange);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return reduced;
}
//#endregion
//#region src/components/feature/StatCounter.tsx
var { Text: Text$3 } = Typography;
/** Splits a stat into its leading number and suffix so the number can count up. */
function parse(value) {
	const match = value.match(/^(\D*)([\d.]+)(.*)$/);
	if (!match) return {
		target: 0,
		prefix: "",
		suffix: value,
		decimals: 0
	};
	const [, prefix, num, suffix] = match;
	const decimals = num.includes(".") ? num.split(".")[1].length : 0;
	return {
		target: parseFloat(num),
		prefix,
		suffix,
		decimals
	};
}
/** Animated, count-up statistic used on the hero and about page. */
function StatCounter({ value, label }) {
	const prefersReduced = usePrefersReducedMotion();
	const ref = useRef(null);
	const inView = useInView(ref, {
		once: true,
		amount: .6
	});
	const { target, prefix, suffix, decimals } = parse(value);
	const [display, setDisplay] = useState(prefersReduced ? value : `${prefix}0${suffix}`);
	useEffect(() => {
		if (prefersReduced || !inView) return;
		const controls = animate(0, target, {
			duration: 1.4,
			ease: [
				.22,
				1,
				.36,
				1
			],
			onUpdate: (latest) => {
				setDisplay(`${prefix}${latest.toFixed(decimals)}${suffix}`);
			}
		});
		return () => controls.stop();
	}, [
		inView,
		prefersReduced,
		target,
		prefix,
		suffix,
		decimals
	]);
	return /* @__PURE__ */ jsxs("div", {
		className: "stat",
		ref,
		children: [/* @__PURE__ */ jsx("span", {
			className: "stat__value gradient-text",
			children: display
		}), /* @__PURE__ */ jsx(Text$3, {
			type: "secondary",
			className: "stat__label",
			children: label
		})]
	});
}
//#endregion
//#region src/components/animations/Magnetic.tsx
/**
* Wraps interactive elements so they subtly lean toward the cursor on hover —
* a tactile micro-interaction that makes CTAs feel responsive and premium.
*/
function Magnetic({ children, strength = .4, className }) {
	const prefersReduced = usePrefersReducedMotion();
	const ref = useRef(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const springX = useSpring(x, {
		stiffness: 200,
		damping: 15,
		mass: .5
	});
	const springY = useSpring(y, {
		stiffness: 200,
		damping: 15,
		mass: .5
	});
	if (prefersReduced) return /* @__PURE__ */ jsx("div", {
		className,
		children
	});
	const handleMove = (event) => {
		const el = ref.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const relX = event.clientX - (rect.left + rect.width / 2);
		const relY = event.clientY - (rect.top + rect.height / 2);
		x.set(relX * strength);
		y.set(relY * strength);
	};
	const handleLeave = () => {
		x.set(0);
		y.set(0);
	};
	return /* @__PURE__ */ jsx(motion.div, {
		ref,
		className,
		style: {
			x: springX,
			y: springY,
			display: "inline-flex"
		},
		onMouseMove: handleMove,
		onMouseLeave: handleLeave,
		children
	});
}
//#endregion
//#region src/data/projects.ts
/**
* Representative projects derived from Pasindu Weerakoon's CV experience.
* Covers double as case studies for the work — replace `cover` with real
* screenshots and `links` with live URLs whenever a project goes public.
*/
var projects = [
	{
		slug: "healthcare-react-18-migration",
		title: "Healthcare Platform — React 18 + Next.js Migration",
		summary: "Modernised a large-scale healthcare platform from React 16 to React 18 with Next.js, improving performance by 25%.",
		description: "Led the modernisation of a clinical-grade healthcare web platform. Owned the migration plan, incremental rollout, and SSR strategy, leveraging React 18 concurrent features and Next.js to lift Core Web Vitals across the board while keeping the team shipping features in parallel.",
		category: "Web",
		tags: [
			"React 18",
			"Next.js",
			"SSR",
			"Performance",
			"Healthcare"
		],
		cover: "linear-gradient(135deg, #3a2418 0%, #d65a31 100%)",
		featured: true,
		links: { caseStudy: "#" },
		metrics: [
			{
				label: "Performance lift",
				value: "+25%"
			},
			{
				label: "Engineers led",
				value: "8"
			},
			{
				label: "Downtime",
				value: "0"
			}
		]
	},
	{
		slug: "micro-frontend-platform",
		title: "Micro-Frontend Platform & Mono-repo",
		summary: "Architected a modular frontend platform with mono-repo tooling, giving multiple teams deployment autonomy.",
		description: "Designed and rolled out a micro-frontend architecture with a Turborepo-based mono-repo, shared design tokens, and an independent build pipeline per team. Reduced cross-team coordination overhead, enabled parallel releases, and shrank deployment cycles by 30% through CI/CD optimisation.",
		category: "Platform",
		tags: [
			"Micro-frontends",
			"Mono-repo",
			"Turborepo",
			"CI/CD"
		],
		cover: "linear-gradient(135deg, #5c3a23 0%, #e8924a 100%)",
		featured: true,
		links: { caseStudy: "#" },
		metrics: [
			{
				label: "Deploy cycle",
				value: "−30%"
			},
			{
				label: "Teams unblocked",
				value: "5"
			},
			{
				label: "Shared packages",
				value: "20+"
			}
		]
	},
	{
		slug: "design-system-component-library",
		title: "Atlas Design System",
		summary: "A centralised, accessible UI component library powering multiple web and mobile products across the org.",
		description: "Led the creation of an internal design system — tokens, themed components, accessibility-first patterns, and shared documentation. Aligned brand and UX across products, eliminated component reinvention, and gave product teams a faster, more consistent path from design to production.",
		category: "Platform",
		tags: [
			"Design System",
			"React",
			"A11y (WCAG)",
			"Tailwind"
		],
		cover: "linear-gradient(160deg, #d65a31 0%, #3a2418 100%)",
		featured: true,
		links: { caseStudy: "#" },
		metrics: [
			{
				label: "Products served",
				value: "6+"
			},
			{
				label: "Components",
				value: "60+"
			},
			{
				label: "A11y baseline",
				value: "WCAG AA"
			}
		]
	},
	{
		slug: "fast-search-experience",
		title: "Search & Filtering Experience",
		summary: "Designed a high-throughput search and filtering architecture that cut user-perceived latency by 40%.",
		description: "Rebuilt the search and filtering experience on a high-traffic healthcare product. Introduced debounced query orchestration, server-driven pagination, optimistic UI states, and result caching — making the experience feel instant on large datasets.",
		category: "Web",
		tags: [
			"React",
			"UX",
			"Performance",
			"Caching"
		],
		cover: "linear-gradient(135deg, #2a1a10 0%, #b8431f 100%)",
		links: { caseStudy: "#" },
		metrics: [{
			label: "Latency",
			value: "−40%"
		}, {
			label: "P95 query",
			value: "<250ms"
		}]
	},
	{
		slug: "cross-platform-mobile",
		title: "Cross-Platform Mobile Apps",
		summary: "Shipped production cross-platform apps in React Native, Flutter, and Ionic for global clients.",
		description: "Designed and built a portfolio of cross-platform mobile applications spanning React Native, Flutter, Ionic, and native Android. Led UI decisions, established automated testing workflows, and partnered with clients across timezones to ensure each release met functional and quality goals.",
		category: "Mobile",
		tags: [
			"React Native",
			"Flutter",
			"Ionic",
			"Android"
		],
		cover: "linear-gradient(135deg, #8a4a25 0%, #e8924a 100%)",
		links: { caseStudy: "#" },
		metrics: [{
			label: "Apps shipped",
			value: "10+"
		}, {
			label: "Platforms",
			value: "4"
		}]
	},
	{
		slug: "tdd-engineering-culture",
		title: "TDD & Engineering Quality Programme",
		summary: "An org-wide programme to embed TDD, automated testing, and clean architecture across engineering teams.",
		description: "Designed and rolled out an engineering quality programme — pairing standards, code-review playbooks, automated test scaffolding with Jest, React Testing Library and Cypress, and reusable architectural patterns rooted in SOLID and clean architecture. Reduced regression incidents and made onboarding measurably faster.",
		category: "Platform",
		tags: [
			"TDD",
			"Jest",
			"React Testing Library",
			"Cypress",
			"SOLID"
		],
		cover: "linear-gradient(160deg, #3a2418 0%, #d65a31 100%)",
		links: { caseStudy: "#" },
		metrics: [{
			label: "Engineers coached",
			value: "15+"
		}, {
			label: "Coverage uplift",
			value: "+30 pts"
		}]
	}
];
var projectCategories = [
	"Web",
	"Platform",
	"Mobile",
	"AI",
	"Open Source"
];
var featuredProjects = projects.filter((p) => p.featured);
/** Articles enriched with derived fields and sorted newest-first. */
var articles = [
	{
		slug: "scaling-frontend-teams",
		title: "Scaling Frontend Teams Without Slowing Down",
		description: "How design systems, explicit boundaries, and fast feedback keep a growing frontend team shipping.",
		date: "2026-04-18",
		tags: [
			"Leadership",
			"Architecture",
			"Frontend"
		],
		cover: "linear-gradient(135deg, #3a2418 0%, #d65a31 100%)",
		body: "# Scaling Frontend Teams Without Slowing Down\n\nWhen a frontend team grows from three engineers to a dozen, the bottleneck\nshifts from *writing code* to *coordinating change*. The patterns that served\nyou at three people quietly become the things that slow you down at twelve.\n\n> The job of a technical lead is to make the right thing the easy thing.\n\n## The three forces that fight you\n\n1. **Inconsistency** — every engineer reinvents buttons, modals, and spacing.\n2. **Coupling** — a change in one feature mysteriously breaks another.\n3. **Cognitive load** — nobody can hold the whole system in their head.\n\n## A design system is leverage, not decoration\n\nThe single highest-leverage investment we made was a **design system** with\ntokens at its core. It collapsed dozens of one-off components into a shared,\naccessible vocabulary.\n\n```tsx\n// Tokens make theming a data problem, not a CSS problem.\nconst button = {\n  paddingInline: tokens.space.md,\n  borderRadius: tokens.radius.lg,\n  background: tokens.color.primary,\n}\n```\n\n## Make architecture boundaries explicit\n\nWe split the app into **features** that own their state and only talk to each\nother through well-defined contracts. The rule was simple:\n\n- A feature may import from `shared/`.\n- A feature may **not** import from another feature.\n\nThat single constraint eliminated an entire class of \"spooky action at a\ndistance\" bugs.\n\n## Measure what matters\n\n| Metric | Before | After |\n| --- | --- | --- |\n| Lead time for a feature | 9 days | 5 days |\n| Build time | 4 min | 70 s |\n| Lighthouse performance | 62 | 94 |\n\nScaling a team is mostly about **removing reasons to coordinate**. Give people\nclear boundaries, shared primitives, and fast feedback — then get out of the\nway.\n",
		featured: true
	},
	{
		slug: "animations-that-respect-users",
		title: "Animations That Respect Your Users",
		description: "A practical guide to building motion that is smooth, purposeful, and accessible.",
		date: "2026-03-02",
		tags: [
			"Frontend",
			"Animation",
			"Accessibility"
		],
		cover: "linear-gradient(160deg, #5c3a23 0%, #e8924a 100%)",
		body: "# Animations That Respect Your Users\n\nMotion is a feature. Done well, it guides attention, communicates state, and\nmakes an interface feel *alive*. Done poorly, it distracts — or worse, it makes\npeople feel sick.\n\n## Animate the right properties\n\nThe browser can animate `transform` and `opacity` on the compositor thread\nwithout triggering layout or paint. Everything else risks jank.\n\n```css\n/* Cheap — runs on the GPU */\n.card { transition: transform 200ms ease, opacity 200ms ease; }\n\n/* Expensive — forces layout on every frame */\n.card { transition: top 200ms ease, height 200ms ease; }\n```\n\n## Spring, don't ease\n\nLinear easing feels robotic. Spring physics feels natural because it mirrors\nhow objects move in the real world.\n\n- Use **springs** for anything a user directly manipulates.\n- Use **duration-based easing** for purely decorative entrances.\n\n## Always honor `prefers-reduced-motion`\n\nSome users experience real discomfort from large motion. Respecting their\npreference is not optional — it is accessibility.\n\n```tsx\nconst reduced = usePrefersReducedMotion()\nconst variants = reduced ? instant : springy\n```\n\n## Choreograph, don't overwhelm\n\nA page where everything animates at once is chaos. **Stagger** entrances so the\neye is led through the content in sequence — typically 40–80ms between siblings.\n\nGreat motion is invisible. If users notice the animation instead of the\ncontent, you have gone too far.\n",
		featured: true
	},
	{
		slug: "from-engineer-to-tech-lead",
		title: "From Engineer to Tech Lead: What Actually Changes",
		description: "The real shift when you move into technical leadership — and the skills nobody tells you to build.",
		date: "2026-01-21",
		tags: ["Leadership", "Career"],
		cover: "linear-gradient(135deg, #8a4a25 0%, #e8924a 100%)",
		body: "# From Engineer to Tech Lead: What Actually Changes\n\nThe promotion to technical lead is deceptive. Your title changes, but the real\nshift is in *where your impact comes from*. It is no longer the code you write —\nit is the decisions you enable and the people you grow.\n\n## Your output is now the team's output\n\nAs an engineer, a productive day meant merged pull requests. As a lead, a\nproductive day might mean **zero** commits and three unblocked teammates. That\nreframing is uncomfortable at first.\n\n> You are no longer paid to be the smartest person in the room. You are paid to\n> make the room smarter.\n\n## The skills nobody tells you to build\n\n- **Writing.** Decisions that aren't written down don't scale. Design docs are\n  how you think at the speed of a team.\n- **Delegation.** If only you can do a task, that's a risk, not a flex.\n- **Saying no.** Protecting focus is a core part of the role.\n\n## Stay technical, but change altitude\n\nYou should still read code and review architecture — but you zoom out. Spend\nyour technical energy on the **decisions that are expensive to reverse**:\n\n1. Data models\n2. Service boundaries\n3. The team's tooling and feedback loops\n\n## Grow people deliberately\n\nThe most lasting thing you will build is not a system. It is the engineers who\nbecome leads themselves. Give them real ownership, let them make safe mistakes,\nand tell them what you see in them before they see it.\n\nThe transition is hard because the scorecard changes. Embrace it, and you trade\nthe satisfaction of solving one problem for the leverage of solving many.\n"
	}
].map((article) => ({
	...article,
	readingMinutes: article.readingMinutes ?? estimateReadingMinutes(article.body)
})).sort((a, b) => b.date.localeCompare(a.date));
var featuredArticles = articles.filter((a) => a.featured);
//#endregion
//#region src/hooks/useDocumentTitle.ts
/** Creates or updates a <meta name="..."> / <meta property="..."> tag. */
function setMeta(attr, key, content) {
	let el = document.head.querySelector(`meta[${attr}="${key}"]`);
	if (!el) {
		el = document.createElement("meta");
		el.setAttribute(attr, key);
		document.head.appendChild(el);
	}
	el.setAttribute("content", content);
}
function setCanonical(href) {
	let el = document.head.querySelector("link[rel=\"canonical\"]");
	if (!el) {
		el = document.createElement("link");
		el.setAttribute("rel", "canonical");
		document.head.appendChild(el);
	}
	el.setAttribute("href", href);
}
/**
* Sets the document title and per-page SEO meta (description, canonical, and
* Open Graph / Twitter mirrors) on route changes. Helps each route rank for
* its own intent while keeping the homepage's static meta intact for crawlers.
*/
function useDocumentTitle(title, description) {
	const { pathname } = useLocation();
	useEffect(() => {
		const fullTitle = title ? `${title} — ${siteConfig.name}` : `${siteConfig.name} — ${siteConfig.jobTitle}`;
		document.title = fullTitle;
		const desc = description ?? siteConfig.description;
		setMeta("name", "description", desc);
		const url = `${siteConfig.url}${pathname === "/" ? "/" : pathname}`;
		setCanonical(url);
		setMeta("property", "og:title", fullTitle);
		setMeta("property", "og:description", desc);
		setMeta("property", "og:url", url);
		setMeta("name", "twitter:title", fullTitle);
		setMeta("name", "twitter:description", desc);
	}, [
		title,
		description,
		pathname
	]);
}
//#endregion
//#region src/pages/HomePage.tsx
var { Title: Title$4, Paragraph: Paragraph$4 } = Typography;
var whatIDo = [
	{
		icon: /* @__PURE__ */ jsx(ClusterOutlined, {}),
		title: "Architect systems",
		body: "Design resilient, scalable architectures and make the expensive-to-reverse decisions with care."
	},
	{
		icon: /* @__PURE__ */ jsx(RocketOutlined, {}),
		title: "Ship products",
		body: "Turn ambiguous ideas into polished, performant products that people genuinely enjoy using."
	},
	{
		icon: /* @__PURE__ */ jsx(TeamOutlined, {}),
		title: "Grow teams",
		body: "Mentor engineers, set the quality bar, and build the feedback loops that let teams move fast."
	}
];
function HomePage() {
	useDocumentTitle();
	return /* @__PURE__ */ jsxs(PageTransition, { children: [
		/* @__PURE__ */ jsx(Hero, {}),
		/* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", {
			className: "lead-block",
			children: [/* @__PURE__ */ jsxs("span", {
				className: "lead-eyebrow",
				children: [/* @__PURE__ */ jsx("span", {
					className: "lead-rule",
					"aria-hidden": "true"
				}), "About"]
			}), /* @__PURE__ */ jsxs("p", {
				className: "lead",
				children: [
					"Strategic Senior Technical Lead with",
					" ",
					/* @__PURE__ */ jsx("em", {
						className: "lead-stat",
						children: "9+\xA0years"
					}),
					" in",
					" ",
					/* @__PURE__ */ jsx("em", { children: "frontend\xA0engineering" }),
					" and",
					" ",
					/* @__PURE__ */ jsx("em", { children: "architectural\xA0design" }),
					" — building scalable",
					" ",
					/* @__PURE__ */ jsx("em", { children: "React" }),
					" ecosystems, leading multi-team units of",
					" ",
					/* @__PURE__ */ jsx("em", {
						className: "lead-stat",
						children: "15+\xA0engineers"
					}),
					", and aligning",
					" ",
					"technical roadmaps with business goals."
				]
			})]
		}) }) }),
		/* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("div", {
			className: "stats-strip",
			children: profile.stats.map((stat) => /* @__PURE__ */ jsx(StatCounter, {
				value: stat.value,
				label: stat.label
			}, stat.label))
		}) }) }),
		/* @__PURE__ */ jsxs(Section, { children: [/* @__PURE__ */ jsx(SectionHeading, {
			eyebrow: "What I do",
			title: "Engineering leadership, end to end",
			subtitle: "From the first architecture diagram to the engineers I help grow along the way.",
			align: "center"
		}), /* @__PURE__ */ jsx(Stagger, { children: /* @__PURE__ */ jsx(Row, {
			gutter: [24, 24],
			children: whatIDo.map((item) => /* @__PURE__ */ jsx(Col, {
				xs: 24,
				md: 8,
				children: /* @__PURE__ */ jsx(StaggerItem, { children: /* @__PURE__ */ jsxs(Card, {
					className: "feature-card",
					variant: "borderless",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "feature-card__icon",
							children: item.icon
						}),
						/* @__PURE__ */ jsx(Title$4, {
							level: 4,
							children: item.title
						}),
						/* @__PURE__ */ jsx(Paragraph$4, {
							type: "secondary",
							style: { marginBottom: 0 },
							children: item.body
						})
					]
				}) })
			}, item.title))
		}) })] }),
		/* @__PURE__ */ jsxs(Section, {
			muted: true,
			children: [/* @__PURE__ */ jsxs("div", {
				className: "section-head-row",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: "Selected work",
					title: "Featured projects",
					subtitle: "A few things I’m proud to have led and built."
				}), /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(Button, {
					type: "link",
					className: "see-all",
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/projects",
						children: ["All projects ", /* @__PURE__ */ jsx(ArrowRightOutlined, {})]
					})
				}) })]
			}), /* @__PURE__ */ jsx(Stagger, { children: /* @__PURE__ */ jsx(Row, {
				gutter: [24, 24],
				children: featuredProjects.map((project) => /* @__PURE__ */ jsx(Col, {
					xs: 24,
					md: 12,
					lg: 8,
					children: /* @__PURE__ */ jsx(StaggerItem, {
						className: "grid-cell",
						children: /* @__PURE__ */ jsx(ProjectCard, { project })
					})
				}, project.slug))
			}) })]
		}),
		/* @__PURE__ */ jsxs(Section, { children: [/* @__PURE__ */ jsxs("div", {
			className: "section-head-row",
			children: [/* @__PURE__ */ jsx(SectionHeading, {
				eyebrow: "Writing",
				title: "Latest articles",
				subtitle: "Notes on engineering, leadership, and craft."
			}), /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(Button, {
				type: "link",
				className: "see-all",
				children: /* @__PURE__ */ jsxs(Link, {
					to: "/articles",
					children: ["All articles ", /* @__PURE__ */ jsx(ArrowRightOutlined, {})]
				})
			}) })]
		}), /* @__PURE__ */ jsx(Stagger, { children: /* @__PURE__ */ jsx(Row, {
			gutter: [24, 24],
			children: featuredArticles.map((article) => /* @__PURE__ */ jsx(Col, {
				xs: 24,
				md: 12,
				children: /* @__PURE__ */ jsx(StaggerItem, {
					className: "grid-cell",
					children: /* @__PURE__ */ jsx(ArticleCard, { article })
				})
			}, article.slug))
		}) })] }),
		/* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", {
			className: "cta-panel",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "cta-panel__glow",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ jsx(Title$4, {
					level: 2,
					style: { marginBottom: 12 },
					children: "Let’s build something great together."
				}),
				/* @__PURE__ */ jsx(Paragraph$4, {
					type: "secondary",
					style: {
						fontSize: 17,
						maxWidth: 560
					},
					children: "Whether you’re scaling a team or shipping a new product, I’d love to hear what you’re working on."
				}),
				/* @__PURE__ */ jsx(Magnetic, { children: /* @__PURE__ */ jsx(Button, {
					type: "primary",
					size: "large",
					shape: "round",
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/contact",
						children: ["Get in touch ", /* @__PURE__ */ jsx(ArrowRightOutlined, {})]
					})
				}) })
			]
		}) }) })
	] });
}
//#endregion
//#region src/components/feature/SkillBar.tsx
var { Text: Text$2 } = Typography;
/** Proficiency bar that fills with a spring the first time it scrolls in. */
function SkillBar({ skill }) {
	const prefersReduced = useReducedMotion();
	return /* @__PURE__ */ jsxs("div", {
		className: "skill-bar",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "skill-bar__head",
			children: [/* @__PURE__ */ jsx(Text$2, {
				strong: true,
				children: skill.name
			}), /* @__PURE__ */ jsxs(Text$2, {
				type: "secondary",
				children: [skill.level, "%"]
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "skill-bar__track",
			children: /* @__PURE__ */ jsx(motion.div, {
				className: "skill-bar__fill",
				initial: prefersReduced ? false : { width: 0 },
				whileInView: { width: `${skill.level}%` },
				viewport: {
					once: true,
					amount: .6
				},
				transition: {
					type: "spring",
					stiffness: 60,
					damping: 18
				}
			})
		})]
	});
}
//#endregion
//#region src/data/experience.ts
/**
* Career history sourced from Pasindu Weerakoon's CV.
* Ordered newest-first.
*/
var experience = [
	{
		role: "Technical Lead",
		company: "1 BillionTech (Pvt) Limited",
		period: "Aug 2025 — Present",
		location: "Colombo, Sri Lanka",
		description: "Define the frontend architectural roadmap for enterprise-grade products, balancing rapid feature delivery with long-term maintainability.",
		highlights: [
			"Architected modular frontend systems using micro-frontends and mono-repo structures, improving code sharing and deployment autonomy across multiple engineering teams.",
			"Established engineering standards centred on Test-Driven Development with Jest and React Testing Library, significantly reducing technical debt.",
			"Achieved a 30% reduction in deployment cycles through automated CI/CD and build-tool optimisation."
		],
		tags: [
			"React",
			"TypeScript",
			"Micro-frontends",
			"Mono-repo",
			"CI/CD",
			"Leadership"
		]
	},
	{
		role: "Associate Technical Lead",
		company: "1 BillionTech (Pvt) Limited",
		period: "Apr 2023 — Aug 2025",
		location: "Colombo, Sri Lanka",
		description: "Drove the adoption of modern React patterns and TypeScript across the organisation to ensure type safety and architectural consistency.",
		highlights: [
			"Led the development of a centralised UI component library with accessibility and brand alignment across multiple web and mobile products.",
			"Represented the technical perspective in planning sessions, communicating complex architectural trade-offs to senior business stakeholders.",
			"Coached and mentored engineers through code review, design reviews, and pairing sessions."
		],
		tags: [
			"React",
			"TypeScript",
			"Design Systems",
			"Mentorship"
		]
	},
	{
		role: "Senior Software Engineer",
		company: "1 Billion Tech",
		period: "Jun 2022 — Apr 2023",
		location: "Colombo, Sri Lanka",
		description: "Led the modernisation of a large-scale healthcare platform and senior-level feature engineering.",
		highlights: [
			"Orchestrated the migration of a healthcare platform from React 16 to React 18 with Next.js, improving performance metrics by 25%.",
			"Designed and implemented complex search and filtering architectures, reducing user-perceived latency by 40%.",
			"Acted as a technical coach for mid-level developers, focusing on SOLID principles and automated testing strategies."
		],
		tags: [
			"React 18",
			"Next.js",
			"Performance",
			"SOLID"
		]
	},
	{
		role: "Software Engineer",
		company: "Allion Technologies (Pvt) Limited",
		period: "Jan 2021 — Jun 2022",
		location: "Colombo, Sri Lanka",
		description: "Built and maintained high-performance cross-platform applications with React Native and React.js.",
		highlights: ["Led UI design decisions and established automated testing workflows for high-quality production releases.", "Collaborated directly with clients to gather requirements and communicate project status across cross-functional teams."],
		tags: [
			"React Native",
			"React",
			"UI",
			"Testing"
		]
	},
	{
		role: "Software Engineer",
		company: "Virtusa (Pvt) Limited",
		period: "Jan 2019 — Jan 2021",
		location: "Colombo, Sri Lanka",
		description: "Developed Java microservices and Angular frontends for global enterprise clients.",
		highlights: [
			"Engaged in full-lifecycle Agile delivery, with strong focus on unit testing and comprehensive documentation.",
			"Worked with overseas clients in Agile teams, providing daily status updates, estimations, and requirements analysis.",
			"Wrote comprehensive test cases and resolved bugs to maintain a high quality bar."
		],
		tags: [
			"Java",
			"Microservices",
			"Angular",
			"Agile"
		]
	},
	{
		role: "Associate Software Engineer",
		company: "Allion Technologies (Pvt) Limited",
		period: "Apr 2018 — Jan 2019",
		location: "Colombo, Sri Lanka",
		description: "Developed mobile applications across Android, React Native, Flutter, iOS, and Ionic platforms.",
		highlights: ["Managed the full software lifecycle — planning through deployment, testing, bug fixing, and client-driven enhancements."],
		tags: [
			"Android",
			"React Native",
			"Flutter",
			"iOS",
			"Ionic"
		]
	},
	{
		role: "Associate Software Engineer",
		company: "XGEN Group (Pvt) Ltd",
		period: "Sep 2017 — Mar 2018",
		location: "Colombo, Sri Lanka",
		description: "Built a financial Android tablet application for a major Sri Lankan finance organisation.",
		highlights: ["Integrated third-party libraries (Retrofit, OkHttpClient, AwesomeValidation) and Android APIs for location tracking and advanced features.", "Mentored an intern developer and collaborated with UI/UX engineers to ensure high usability and design standards."],
		tags: [
			"Android",
			"Java",
			"Kotlin",
			"Retrofit"
		]
	},
	{
		role: "Software Engineering Intern",
		company: "SoftVessel (Pvt) Limited",
		period: "Apr 2017 — Sep 2017",
		location: "Kiribathgoda, Sri Lanka",
		description: "Developed and maintained a POS Android application for mobile phones and tablets.",
		highlights: ["Introduced tablet-specific features and integrated Android APIs for location tracking and camera.", "Improved memory management and local storage for a smoother in-store experience."],
		tags: ["Android", "Java"]
	}
];
//#endregion
//#region src/data/skills.ts
/**
* Skills inventory from Pasindu Weerakoon's CV.
* Levels are self-assessed (0–100) and drive the animated proficiency bars.
*/
var skills = [
	{
		name: "TypeScript",
		category: "Languages",
		level: 95
	},
	{
		name: "JavaScript",
		category: "Languages",
		level: 95
	},
	{
		name: "Java",
		category: "Languages",
		level: 75
	},
	{
		name: "Kotlin",
		category: "Languages",
		level: 65
	},
	{
		name: "React",
		category: "Frontend",
		level: 96
	},
	{
		name: "Next.js",
		category: "Frontend",
		level: 88
	},
	{
		name: "Redux & Context API",
		category: "Frontend",
		level: 90
	},
	{
		name: "Tailwind CSS",
		category: "Frontend",
		level: 88
	},
	{
		name: "Material UI",
		category: "Frontend",
		level: 85
	},
	{
		name: "Micro-frontends",
		category: "Frontend",
		level: 90
	},
	{
		name: "Mono-repos (Nx / Turborepo)",
		category: "Frontend",
		level: 85
	},
	{
		name: "Server-Side Rendering",
		category: "Frontend",
		level: 85
	},
	{
		name: "React Native",
		category: "Backend",
		level: 90
	},
	{
		name: "Flutter",
		category: "Backend",
		level: 70
	},
	{
		name: "Ionic",
		category: "Backend",
		level: 70
	},
	{
		name: "Android (Java / Kotlin)",
		category: "Backend",
		level: 78
	},
	{
		name: "Java Microservices",
		category: "Backend",
		level: 72
	},
	{
		name: "AWS",
		category: "Cloud & DevOps",
		level: 80
	},
	{
		name: "Azure",
		category: "Cloud & DevOps",
		level: 75
	},
	{
		name: "CI/CD Pipelines",
		category: "Cloud & DevOps",
		level: 90
	},
	{
		name: "Docker",
		category: "Cloud & DevOps",
		level: 82
	},
	{
		name: "Build Optimisation",
		category: "Cloud & DevOps",
		level: 88
	},
	{
		name: "Technical Roadmapping",
		category: "Leadership",
		level: 92
	},
	{
		name: "Design Systems",
		category: "Leadership",
		level: 92
	},
	{
		name: "Clean Architecture & SOLID",
		category: "Leadership",
		level: 92
	},
	{
		name: "Mentorship",
		category: "Leadership",
		level: 90
	},
	{
		name: "Stakeholder Communication",
		category: "Leadership",
		level: 88
	},
	{
		name: "TDD / BDD",
		category: "Leadership",
		level: 88
	}
];
var skillCategories = [
	"Languages",
	"Frontend",
	"Backend",
	"Cloud & DevOps",
	"Leadership"
];
function skillsByCategory(category) {
	return skills.filter((skill) => skill.category === category);
}
//#endregion
//#region src/data/credentials.ts
var education = [{
	degree: "MSc Information Technology",
	field: "Enterprise Application Development",
	institution: "SLIIT (Sri Lanka Institute of Information Technology)",
	period: "Jan 2021 — Dec 2022"
}, {
	degree: "BSc (Hons) Information Technology",
	field: "Specializing in Information Technology",
	institution: "SLIIT (Sri Lanka Institute of Information Technology)",
	period: "Jan 2014 — Dec 2018"
}];
var certifications = ["Android Development Masterclass", "Blockchain & Cryptocurrency"];
var awards = ["TMT East Hackathon Winner — Cloud Technologies"];
//#endregion
//#region src/pages/AboutPage.tsx
var { Title: Title$3, Paragraph: Paragraph$3, Text: Text$1 } = Typography;
function AboutPage() {
	useDocumentTitle("About", "About Pasindu Weerakoon — a Software Engineer and Technical Lead in Colombo, Sri Lanka with 9+ years across React, TypeScript, micro-frontends, design systems and cross-platform mobile.");
	return /* @__PURE__ */ jsxs(PageTransition, { children: [
		/* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsxs(Row, {
			gutter: [48, 48],
			align: "middle",
			children: [/* @__PURE__ */ jsx(Col, {
				xs: 24,
				md: 9,
				lg: 8,
				children: /* @__PURE__ */ jsx(Reveal, {
					variants: void 0,
					children: /* @__PURE__ */ jsx("div", {
						className: "about-portrait",
						children: /* @__PURE__ */ jsx(Avatar, {
							src: profile.avatar,
							size: 240,
							shape: "square",
							className: "about-portrait__img"
						})
					})
				})
			}), /* @__PURE__ */ jsx(Col, {
				xs: 24,
				md: 15,
				lg: 16,
				children: /* @__PURE__ */ jsxs(Reveal, { children: [
					/* @__PURE__ */ jsx("span", {
						className: "eyebrow",
						children: "About me"
					}),
					/* @__PURE__ */ jsx(Title$3, {
						level: 1,
						style: { marginTop: 12 },
						children: profile.name
					}),
					/* @__PURE__ */ jsx(Text$1, {
						type: "secondary",
						style: { fontSize: 18 },
						children: profile.title
					}),
					/* @__PURE__ */ jsxs(Paragraph$3, {
						type: "secondary",
						style: { marginTop: 8 },
						children: [
							/* @__PURE__ */ jsx(EnvironmentOutlined, {}),
							" ",
							profile.location
						]
					}),
					profile.bio.map((para, i) => /* @__PURE__ */ jsx(Paragraph$3, {
						style: { fontSize: 16 },
						children: para
					}, i)),
					/* @__PURE__ */ jsx(Space, {
						style: { marginTop: 8 },
						children: /* @__PURE__ */ jsx(SocialLinks, {})
					})
				] })
			})]
		}) }),
		/* @__PURE__ */ jsxs(Section, {
			muted: true,
			children: [/* @__PURE__ */ jsx(SectionHeading, {
				eyebrow: "Career",
				title: "Experience",
				subtitle: "A track record of leading teams and shipping products that scale."
			}), /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(Timeline, {
				mode: "left",
				className: "experience-timeline",
				items: experience.map((job) => ({ children: /* @__PURE__ */ jsxs("div", {
					className: "experience-item",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "experience-item__head",
							children: [/* @__PURE__ */ jsx(Title$3, {
								level: 4,
								style: { marginBottom: 2 },
								children: job.role
							}), /* @__PURE__ */ jsxs(Text$1, {
								strong: true,
								type: "secondary",
								children: [
									job.company,
									" · ",
									job.location
								]
							})]
						}),
						/* @__PURE__ */ jsx(Text$1, {
							type: "secondary",
							className: "experience-item__period",
							children: job.period
						}),
						/* @__PURE__ */ jsx(Paragraph$3, {
							style: { marginTop: 12 },
							children: job.description
						}),
						/* @__PURE__ */ jsx("ul", {
							className: "experience-item__highlights",
							children: job.highlights.map((h) => /* @__PURE__ */ jsx("li", { children: h }, h))
						}),
						/* @__PURE__ */ jsx(Space, {
							size: [6, 6],
							wrap: true,
							children: job.tags.map((tag) => /* @__PURE__ */ jsx(Tag, {
								bordered: false,
								children: tag
							}, tag))
						})
					]
				}) }))
			}) })]
		}),
		/* @__PURE__ */ jsxs(Section, { children: [/* @__PURE__ */ jsx(SectionHeading, {
			eyebrow: "Toolbox",
			title: "Skills & expertise",
			subtitle: "The technologies and disciplines I work in every day."
		}), /* @__PURE__ */ jsx(Row, {
			gutter: [40, 40],
			children: skillCategories.map((category) => /* @__PURE__ */ jsx(Col, {
				xs: 24,
				md: 12,
				children: /* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx(Title$3, {
					level: 5,
					className: "skill-group__title",
					children: category
				}), skillsByCategory(category).map((skill) => /* @__PURE__ */ jsx(SkillBar, { skill }, skill.name))] })
			}, category))
		})] }),
		/* @__PURE__ */ jsxs(Section, {
			muted: true,
			children: [/* @__PURE__ */ jsx(SectionHeading, {
				eyebrow: "Credentials",
				title: "Education & recognition",
				subtitle: "Formal qualifications, industry certifications, and a few moments worth celebrating."
			}), /* @__PURE__ */ jsxs(Row, {
				gutter: [40, 40],
				children: [/* @__PURE__ */ jsx(Col, {
					xs: 24,
					md: 14,
					children: /* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx(Title$3, {
						level: 5,
						className: "skill-group__title",
						children: "Education"
					}), education.map((item) => /* @__PURE__ */ jsxs("div", {
						className: "credential",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "credential__head",
							children: [/* @__PURE__ */ jsx(Text$1, {
								strong: true,
								children: item.degree
							}), /* @__PURE__ */ jsx(Text$1, {
								type: "secondary",
								children: item.period
							})]
						}), /* @__PURE__ */ jsxs(Paragraph$3, {
							type: "secondary",
							style: { marginBottom: 0 },
							children: [
								item.field,
								" · ",
								item.institution
							]
						})]
					}, item.degree))] })
				}), /* @__PURE__ */ jsx(Col, {
					xs: 24,
					md: 10,
					children: /* @__PURE__ */ jsxs(Reveal, { children: [
						/* @__PURE__ */ jsx(Title$3, {
							level: 5,
							className: "skill-group__title",
							children: "Certifications"
						}),
						/* @__PURE__ */ jsx(Space, {
							size: [8, 8],
							wrap: true,
							style: { marginBottom: 28 },
							children: certifications.map((cert) => /* @__PURE__ */ jsx(Tag, {
								bordered: false,
								children: cert
							}, cert))
						}),
						/* @__PURE__ */ jsx(Title$3, {
							level: 5,
							className: "skill-group__title",
							children: "Awards"
						}),
						awards.map((a) => /* @__PURE__ */ jsxs(Paragraph$3, {
							style: {
								marginBottom: 8,
								fontWeight: 500
							},
							children: ["🏆 ", a]
						}, a))
					] })
				})]
			})]
		})
	] });
}
//#endregion
//#region src/pages/ProjectsPage.tsx
function ProjectsPage() {
	useDocumentTitle("Projects", "Selected work by Pasindu Weerakoon — React platforms, micro-frontend architectures, design systems and cross-platform mobile apps built over 9+ years.");
	const [filter, setFilter] = useState("All");
	const visible = useMemo(() => filter === "All" ? projects : projects.filter((p) => p.category === filter), [filter]);
	return /* @__PURE__ */ jsx(PageTransition, { children: /* @__PURE__ */ jsxs(Section, { children: [
		/* @__PURE__ */ jsx(SectionHeading, {
			eyebrow: "Portfolio",
			title: "Projects",
			subtitle: "Products, platforms, and open-source work I’ve led and built."
		}),
		/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("div", {
			className: "filter-bar",
			children: /* @__PURE__ */ jsx(Segmented, {
				size: "large",
				value: filter,
				onChange: setFilter,
				options: ["All", ...projectCategories]
			})
		}) }),
		/* @__PURE__ */ jsx(motion.div, {
			className: "auto-grid",
			layout: true,
			children: /* @__PURE__ */ jsx(AnimatePresence, {
				mode: "popLayout",
				children: visible.map((project) => /* @__PURE__ */ jsx(motion.div, {
					layout: true,
					initial: {
						opacity: 0,
						scale: .96
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					exit: {
						opacity: 0,
						scale: .96
					},
					transition: { duration: .3 },
					className: "grid-cell",
					children: /* @__PURE__ */ jsx(ProjectCard, { project })
				}, project.slug))
			})
		})
	] }) });
}
//#endregion
//#region src/pages/ArticlesPage.tsx
var allTags = Array.from(new Set(articles.flatMap((a) => a.tags))).sort();
function ArticlesPage() {
	useDocumentTitle("Articles", "Articles by Pasindu Weerakoon on frontend engineering, React architecture, design systems, and engineering leadership.");
	const [tag, setTag] = useState("All");
	const visible = useMemo(() => tag === "All" ? articles : articles.filter((a) => a.tags.includes(tag)), [tag]);
	return /* @__PURE__ */ jsx(PageTransition, { children: /* @__PURE__ */ jsxs(Section, { children: [
		/* @__PURE__ */ jsx(SectionHeading, {
			eyebrow: "Writing",
			title: "Articles",
			subtitle: "Long-form notes on engineering, leadership, and building great software."
		}),
		/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("div", {
			className: "filter-bar",
			children: /* @__PURE__ */ jsx(Segmented, {
				size: "large",
				value: tag,
				onChange: (value) => setTag(value),
				options: ["All", ...allTags]
			})
		}) }),
		/* @__PURE__ */ jsx(motion.div, {
			className: "auto-grid auto-grid--wide",
			layout: true,
			children: /* @__PURE__ */ jsx(AnimatePresence, {
				mode: "popLayout",
				children: visible.map((article) => /* @__PURE__ */ jsx(motion.div, {
					layout: true,
					initial: {
						opacity: 0,
						scale: .96
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					exit: {
						opacity: 0,
						scale: .96
					},
					transition: { duration: .3 },
					className: "grid-cell",
					children: /* @__PURE__ */ jsx(ArticleCard, { article })
				}, article.slug))
			})
		})
	] }) });
}
//#endregion
//#region src/data/gallery.ts
/**
* The gallery is content you publish — images with a title and a short,
* meaningful description. The placeholder art in /public/gallery is generated
* by `scripts/generate-placeholders.mjs`; swap `src` for your own photos.
*/
var gallery = [
	{
		id: "g1",
		title: "Whiteboard, 7am",
		description: "The architecture sketch that became Atlas. Sometimes the best diagrams never make it into a doc.",
		src: "/gallery/shot-1.svg",
		tags: ["Process", "Architecture"],
		span: "tall"
	},
	{
		id: "g2",
		title: "Ship day",
		description: "The quiet minute after a big release goes green. Hard-won and worth savoring.",
		src: "/gallery/shot-2.svg",
		tags: ["Team", "Moments"],
		span: "wide"
	},
	{
		id: "g3",
		title: "Conference talk",
		description: "Speaking on building motion that respects users — the talk that became an article.",
		src: "/gallery/shot-3.svg",
		tags: ["Speaking"],
		span: "normal"
	},
	{
		id: "g4",
		title: "Late-night debugging",
		description: "A race condition that hid for three weeks. The fix was four lines; finding it was the work.",
		src: "/gallery/shot-4.svg",
		tags: ["Engineering"],
		span: "normal"
	},
	{
		id: "g5",
		title: "Mentoring session",
		description: "Pairing with a junior engineer on their first system design. Watching it click never gets old.",
		src: "/gallery/shot-5.svg",
		tags: ["Mentorship", "Team"],
		span: "wide"
	},
	{
		id: "g6",
		title: "Golden hour",
		description: "Stepping away from the screen. Perspective is a feature, not a distraction.",
		src: "/gallery/shot-6.svg",
		tags: ["Life"],
		span: "tall"
	}
];
var galleryTags = Array.from(new Set(gallery.flatMap((image) => image.tags))).sort();
//#endregion
//#region src/pages/GalleryPage.tsx
var { Title: Title$2, Paragraph: Paragraph$2 } = Typography;
function GalleryPage() {
	useDocumentTitle("Gallery");
	const [tag, setTag] = useState("All");
	const visible = useMemo(() => tag === "All" ? gallery : gallery.filter((g) => g.tags.includes(tag)), [tag]);
	return /* @__PURE__ */ jsx(PageTransition, { children: /* @__PURE__ */ jsxs(Section, { children: [
		/* @__PURE__ */ jsx(SectionHeading, {
			eyebrow: "Gallery",
			title: "Moments & visuals",
			subtitle: "A curated collection of images from the work and the life around it — each with a short story."
		}),
		/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("div", {
			className: "filter-bar",
			children: /* @__PURE__ */ jsx(Segmented, {
				size: "large",
				value: tag,
				onChange: (value) => setTag(value),
				options: ["All", ...galleryTags]
			})
		}) }),
		/* @__PURE__ */ jsx(Image.PreviewGroup, { children: /* @__PURE__ */ jsx("div", {
			className: "masonry",
			children: visible.map((image, index) => /* @__PURE__ */ jsxs(motion.figure, {
				className: `masonry__item masonry__item--${image.span ?? "normal"}`,
				initial: {
					opacity: 0,
					y: 24
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					amount: .2
				},
				transition: {
					duration: .5,
					delay: index % 3 * .06
				},
				children: [/* @__PURE__ */ jsx("div", {
					className: "masonry__media",
					children: /* @__PURE__ */ jsx(Image, {
						src: image.src,
						alt: image.title,
						rootClassName: "masonry__image"
					})
				}), /* @__PURE__ */ jsxs("figcaption", {
					className: "masonry__caption",
					children: [
						/* @__PURE__ */ jsx(Title$2, {
							level: 5,
							style: { marginBottom: 4 },
							children: image.title
						}),
						/* @__PURE__ */ jsx(Paragraph$2, {
							type: "secondary",
							style: { marginBottom: 8 },
							children: image.description
						}),
						/* @__PURE__ */ jsx("div", { children: image.tags.map((t) => /* @__PURE__ */ jsx(Tag, {
							bordered: false,
							children: t
						}, t)) })
					]
				})]
			}, image.id))
		}) })
	] }) });
}
//#endregion
//#region src/pages/ContactPage.tsx
var { Title: Title$1, Paragraph: Paragraph$1, Text } = Typography;
var { TextArea } = Input;
function ContactPage() {
	useDocumentTitle("Contact", "Get in touch with Pasindu Weerakoon — Software Engineer and Technical Lead in Colombo, Sri Lanka. Available for engineering leadership and React projects.");
	const { message } = App.useApp();
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);
	const onFinish = (values) => {
		setSubmitting(true);
		const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
		const subject = encodeURIComponent(values.subject);
		window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
		setTimeout(() => {
			setSubmitting(false);
			message.success("Thanks! Your email client should open shortly.");
			form.resetFields();
		}, 600);
	};
	return /* @__PURE__ */ jsx(PageTransition, { children: /* @__PURE__ */ jsxs(Section, { children: [/* @__PURE__ */ jsx(SectionHeading, {
		eyebrow: "Contact",
		title: "Let’s talk",
		subtitle: "Have a role, a project, or just want to say hello? Drop me a line.",
		align: "center"
	}), /* @__PURE__ */ jsxs(Row, {
		gutter: [48, 48],
		children: [/* @__PURE__ */ jsx(Col, {
			xs: 24,
			md: 10,
			children: /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", {
				className: "contact-info",
				children: [
					/* @__PURE__ */ jsx(Title$1, {
						level: 4,
						children: "Reach me directly"
					}),
					/* @__PURE__ */ jsx(Paragraph$1, {
						type: "secondary",
						children: "I read every message and reply within a couple of days."
					}),
					/* @__PURE__ */ jsxs("a", {
						href: `mailto:${profile.email}`,
						className: "contact-info__row",
						children: [/* @__PURE__ */ jsx(MailOutlined, {}), /* @__PURE__ */ jsx("span", { children: profile.email })]
					}),
					profile.phone && /* @__PURE__ */ jsxs("a", {
						href: `tel:${profile.phone.replace(/\s+/g, "")}`,
						className: "contact-info__row",
						children: [/* @__PURE__ */ jsx(PhoneOutlined, {}), /* @__PURE__ */ jsx("span", { children: profile.phone })]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "contact-info__row",
						children: [/* @__PURE__ */ jsx(EnvironmentOutlined, {}), /* @__PURE__ */ jsx("span", { children: profile.location })]
					}),
					/* @__PURE__ */ jsx(Text, {
						type: "secondary",
						style: {
							display: "block",
							marginTop: 24
						},
						children: "Or find me on"
					}),
					/* @__PURE__ */ jsx("div", {
						style: { marginTop: 8 },
						children: /* @__PURE__ */ jsx(SocialLinks, { size: "large" })
					})
				]
			}) })
		}), /* @__PURE__ */ jsx(Col, {
			xs: 24,
			md: 14,
			children: /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs(Form, {
				form,
				layout: "vertical",
				requiredMark: "optional",
				onFinish,
				className: "contact-form",
				children: [
					/* @__PURE__ */ jsxs(Row, {
						gutter: 16,
						children: [/* @__PURE__ */ jsx(Col, {
							xs: 24,
							sm: 12,
							children: /* @__PURE__ */ jsx(Form.Item, {
								label: "Name",
								name: "name",
								rules: [{
									required: true,
									message: "Please enter your name"
								}],
								children: /* @__PURE__ */ jsx(Input, {
									size: "large",
									placeholder: "Ada Lovelace"
								})
							})
						}), /* @__PURE__ */ jsx(Col, {
							xs: 24,
							sm: 12,
							children: /* @__PURE__ */ jsx(Form.Item, {
								label: "Email",
								name: "email",
								rules: [{
									required: true,
									message: "Please enter your email"
								}, {
									type: "email",
									message: "Please enter a valid email"
								}],
								children: /* @__PURE__ */ jsx(Input, {
									size: "large",
									placeholder: "you@company.com"
								})
							})
						})]
					}),
					/* @__PURE__ */ jsx(Form.Item, {
						label: "Subject",
						name: "subject",
						rules: [{
							required: true,
							message: "Please add a subject"
						}],
						children: /* @__PURE__ */ jsx(Input, {
							size: "large",
							placeholder: "A new opportunity"
						})
					}),
					/* @__PURE__ */ jsx(Form.Item, {
						label: "Message",
						name: "message",
						rules: [{
							required: true,
							message: "Please write a message"
						}, {
							min: 10,
							message: "A little more detail, please"
						}],
						children: /* @__PURE__ */ jsx(TextArea, {
							rows: 6,
							placeholder: "Tell me about your project or role…"
						})
					}),
					/* @__PURE__ */ jsx(Form.Item, {
						style: { marginBottom: 0 },
						children: /* @__PURE__ */ jsx(Button, {
							type: "primary",
							size: "large",
							shape: "round",
							htmlType: "submit",
							loading: submitting,
							icon: /* @__PURE__ */ jsx(SendOutlined, {}),
							children: "Send message"
						})
					})
				]
			}) })
		})]
	})] }) });
}
//#endregion
//#region src/pages/NotFoundPage.tsx
var { Title, Paragraph } = Typography;
function NotFoundPage() {
	useDocumentTitle("Not found");
	return /* @__PURE__ */ jsx(PageTransition, { children: /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsxs("div", {
		className: "notfound",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "notfound__code gradient-text",
				children: "404"
			}),
			/* @__PURE__ */ jsx(Title, {
				level: 2,
				children: "This page wandered off."
			}),
			/* @__PURE__ */ jsx(Paragraph, {
				type: "secondary",
				style: { fontSize: 17 },
				children: "The page you’re looking for doesn’t exist or has been moved."
			}),
			/* @__PURE__ */ jsx(Button, {
				type: "primary",
				size: "large",
				shape: "round",
				icon: /* @__PURE__ */ jsx(HomeOutlined, {}),
				children: /* @__PURE__ */ jsx(Link, {
					to: "/",
					children: "Back home"
				})
			})
		]
	}) }) });
}
//#endregion
//#region src/config/routeMeta.ts
/**
* Per-route SEO metadata used by the build-time prerender to bake a correct
* <title>, description, canonical and Open Graph tags into each route's static
* HTML. Keep in sync with the per-page useDocumentTitle() calls.
*/
var routeMeta = [
	{
		path: "/",
		title: `${siteConfig.name} — Software Engineer & Technical Lead | Sri Lanka`,
		description: siteConfig.description
	},
	{
		path: "/about",
		title: `About — ${siteConfig.name}`,
		description: "About Pasindu Weerakoon — a Software Engineer and Technical Lead in Colombo, Sri Lanka with 9+ years across React, TypeScript, micro-frontends, design systems and cross-platform mobile."
	},
	{
		path: "/projects",
		title: `Projects — ${siteConfig.name}`,
		description: "Selected work by Pasindu Weerakoon — React platforms, micro-frontend architectures, design systems and cross-platform mobile apps built over 9+ years."
	},
	{
		path: "/articles",
		title: `Articles — ${siteConfig.name}`,
		description: "Articles by Pasindu Weerakoon on frontend engineering, React architecture, design systems, and engineering leadership."
	},
	{
		path: "/gallery",
		title: `Gallery — ${siteConfig.name}`,
		description: "A visual gallery from Pasindu Weerakoon — Software Engineer and Technical Lead in Sri Lanka."
	},
	{
		path: "/contact",
		title: `Contact — ${siteConfig.name}`,
		description: "Get in touch with Pasindu Weerakoon — Software Engineer and Technical Lead in Colombo, Sri Lanka. Available for engineering leadership and React projects."
	}
];
//#endregion
//#region src/entry-server.tsx
/**
* Synchronous route tree (no lazy()) used only for build-time prerendering, so
* renderToString captures real page content rather than the Suspense fallback.
* The client app keeps its own code-split router untouched.
*/
var routes = [{
	path: "/",
	element: /* @__PURE__ */ jsx(AppLayout, {}),
	children: [
		{
			index: true,
			element: /* @__PURE__ */ jsx(HomePage, {})
		},
		{
			path: "about",
			element: /* @__PURE__ */ jsx(AboutPage, {})
		},
		{
			path: "projects",
			element: /* @__PURE__ */ jsx(ProjectsPage, {})
		},
		{
			path: "articles",
			element: /* @__PURE__ */ jsx(ArticlesPage, {})
		},
		{
			path: "gallery",
			element: /* @__PURE__ */ jsx(GalleryPage, {})
		},
		{
			path: "contact",
			element: /* @__PURE__ */ jsx(ContactPage, {})
		},
		{
			path: "*",
			element: /* @__PURE__ */ jsx(NotFoundPage, {})
		}
	]
}];
/** Renders the app for a given path to a static HTML string. */
async function render(url) {
	const handler = createStaticHandler(routes);
	const context = await handler.query(new Request(`http://localhost${url}`));
	if (context instanceof Response) return "";
	return renderToString(/* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(StaticRouterProvider, {
		router: createStaticRouter(handler.dataRoutes, context),
		context
	}) }));
}
//#endregion
export { render, routeMeta };
