export const AFFILIATE_BANNERS = {
  square250: {
    href: "https://www.pluginboutique.com/articles/1772?a_aid=g0y2oqcwuq11t&a_bid=07887b84",
    src: "https://pluginboutique.postaffiliatepro.com/accounts/default1/hfwq3b89wu2/07887b84.jpg",
    width: 250,
    height: 250,
    label: "Offre Plugin Boutique",
  },
  leaderboard600: {
    href: "https://www.pluginboutique.com/articles/1772?a_aid=g0y2oqcwuq11t&a_bid=4d680d0c",
    src: "https://pluginboutique.postaffiliatepro.com/accounts/default1/hfwq3b89wu2/4d680d0c.jpg",
    width: 600,
    height: 100,
    label: "Promotions Plugin Boutique",
  },
  square200: {
    href: "https://www.pluginboutique.com/articles/1772?a_aid=g0y2oqcwuq11t&a_bid=02f1a52d",
    src: "https://pluginboutique.postaffiliatepro.com/accounts/default1/hfwq3b89wu2/02f1a52d.jpg",
    width: 200,
    height: 200,
    label: "Plugin Boutique",
  },
  banner300: {
    href: "https://www.pluginboutique.com/articles/1772?a_aid=g0y2oqcwuq11t&a_bid=1d8bcebd",
    src: "https://pluginboutique.postaffiliatepro.com/accounts/default1/hfwq3b89wu2/1d8bcebd.jpg",
    width: 300,
    height: 100,
    label: "Découvrir Plugin Boutique",
  },
} as const;

export type AffiliateBannerKey = keyof typeof AFFILIATE_BANNERS;
