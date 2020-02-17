module.exports = {
  title: "Sylo",
  tagline: "Resources State Manager",
  url: "https://www.marmelab.com/sylo",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "marmelab",
  projectName: "marmelab/sylo",
  themeConfig: {
    navbar: {
      logo: {
        alt: "Sylo",
        src: "img/sylo.png"
      },
      links: [
        { to: "docs/what-is-it", label: "Docs", position: "left" },
        { to: "blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/marmelab/sylo",
          label: "GitHub",
          position: "right"
        }
      ]
    },
    footer: {
      style: "dark",
      links: [],
      logo: {
        alt: "Facebook Open Source Logo",
        src: "https://docusaurus.io/img/oss_logo.png"
      },
      copyright: `Copyright © ${new Date().getFullYear()} Marmelab`
    }
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js")
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css")
        }
      }
    ]
  ]
};
