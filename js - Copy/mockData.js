/**
 * Braco OmniPulse - Demo Mock Datasets
 * All datasets are clearly structured for illustrative demo purposes and calibrated
 * to represent realistic Indian & Global marketing intelligence metrics.
 */

export const MOCK_BRANDS = {
  nike: {
    id: 'nike',
    name: 'Nike',
    category: 'Athletic Footwear & Apparel',
    tagline: 'Just Do It',
    positioning: 'Performance, elite athleticism, iconic cultural dominance, and empowerment.',
    logoText: 'NIKE',
    color: '#111827',
    metrics: {
      engagementRate: 4.6, // percentage
      monthlyReach: 52.4, // in Millions
      conversionRate: 3.8, // percentage
      sentimentScore: 84, // out of 100
      shareOfVoice: 38.5, // percentage of market
      avgOrderValue: 7400, // INR
      customerAcquisitionCost: 1150 // INR
    },
    channels: {
      instagram: 42,
      youtube: 28,
      x: 12,
      shorts: 18
    },
    demographics: {
      age18_24: 38,
      age25_34: 42,
      age35_44: 14,
      age45_plus: 6
    },
    strategy: {
      messaging: 'High-emotion cinematic storytelling celebrating boundary-breaking athletes and perseverance.',
      contentFormats: '60s Anthem films, athlete training reels, SNKRS app drops, community running clubs.',
      creatorMix: 'Macro athletes (LeBron, Ronaldo, Neeraj Chopra) + grassroots street runners and urban dancers.',
      strengths: [
        'Unrivaled cultural cachet and sneakerhead loyalty',
        'Direct-to-consumer digital ecosystem (Nike App / SNKRS)',
        'Superior brand equity in high-performance footwear'
      ],
      weaknesses: [
        'Higher price sensitivity in emerging Tier-2 Indian markets',
        'Supply chain lead times on localized festive collections',
        'Occasional fatigue with repetitive inspirational tropes'
      ],
      opportunities: [
        'Aggressive push into Indian cricket & grassroots running communities',
        'Targeted sub-₹4,000 everyday running footwear for college youth',
        'Sustainable apparel line expansion with recycled circular fabrics'
      ]
    }
  },

  adidas: {
    id: 'adidas',
    name: 'Adidas',
    category: 'Sportswear & Originals Lifestyle',
    tagline: 'Impossible Is Nothing',
    positioning: 'Fusion of authentic sport performance and high-street music/fashion lifestyle.',
    logoText: 'ADIDAS',
    color: '#0284c7',
    metrics: {
      engagementRate: 3.5,
      monthlyReach: 41.2,
      conversionRate: 3.2,
      sentimentScore: 81,
      shareOfVoice: 31.0,
      avgOrderValue: 6200,
      customerAcquisitionCost: 1280
    },
    channels: {
      instagram: 36,
      youtube: 24,
      x: 15,
      shorts: 25
    },
    demographics: {
      age18_24: 44,
      age25_34: 36,
      age35_44: 15,
      age45_plus: 5
    },
    strategy: {
      messaging: 'Empowerment through self-expression, music partnerships, football culture, and iconic retro footwear (Samba/Gazelle).',
      contentFormats: 'Streetwear lookbooks, behind-the-scenes music festival activations, football creator collabs.',
      creatorMix: 'Music icons, Gen-Z fashion tastemakers, football stars, and lifestyle creators.',
      strengths: [
        'Dominant retro sneaker resurgence (Samba, Gazelle, Spezial)',
        'Strong association with global football and cultural festivals',
        'Wide retail footprint across Tier-1 and Tier-2 Indian cities'
      ],
      weaknesses: [
        'Lower engagement velocity on pure performance/running campaigns compared to Nike',
        'Higher promotional discounting diluting brand premium perception',
        'Inconsistent digital app retention compared to Nike SNKRS'
      ],
      opportunities: [
        'Scale localized cricket merchandise and grassroots tournaments',
        'Capitalize on Gen-Z streetwear thrift & terrace culture in urban hubs',
        'Tier-2 vernacular influencer collabs across regional Indian cities'
      ]
    }
  },

  puma: {
    id: 'puma',
    name: 'Puma',
    category: 'Sportstyle & Athleisure',
    tagline: 'Forever Faster',
    positioning: 'Fast, bold, energetic lifestyle sportswear with strong celebrity appeal in India.',
    logoText: 'PUMA',
    color: '#ef4444',
    metrics: {
      engagementRate: 4.8,
      monthlyReach: 34.6,
      conversionRate: 3.9,
      sentimentScore: 87,
      shareOfVoice: 26.5,
      avgOrderValue: 4800,
      customerAcquisitionCost: 890
    },
    channels: {
      instagram: 48,
      youtube: 22,
      x: 10,
      shorts: 20
    },
    demographics: {
      age18_24: 51,
      age25_34: 33,
      age35_44: 11,
      age45_plus: 5
    },
    strategy: {
      messaging: 'Playful, bold, high-octane agility with accessible pop-culture brand ambassadors (Virat Kohli, Kareena Kapoor).',
      contentFormats: 'Viral dance challenges, quick celebrity drops, interactive festive filters, gym humor reels.',
      creatorMix: 'A-list cricket icons + Tier-1 lifestyle influencers + fitness creators.',
      strengths: [
        'Market leader in Indian sportswear revenue through sharp pricing',
        'Exceptional celebrity synergy with high regional recognition',
        'High conversion rates driven by accessible price points'
      ],
      weaknesses: [
        'Lower perceived technical cachet among marathoners and elite athletes',
        'Relies heavily on celebrity faces rather than organic brand ethos',
        'Underrepresented in long-form storytelling on YouTube'
      ],
      opportunities: [
        'Build technical running communities (Nitro franchise focus)',
        'Expand sustainable performance athleisure for college students',
        'D2C exclusive drops to boost app lifetime customer value'
      ]
    }
  },

  apple: {
    id: 'apple',
    name: 'Apple',
    category: 'Consumer Electronics & Ecosystem',
    tagline: 'Think Different',
    positioning: 'Premium aspiration, privacy-first design, seamless hardware-software ecosystem.',
    logoText: 'APPLE',
    color: '#64748b',
    metrics: {
      engagementRate: 5.2,
      monthlyReach: 68.0,
      conversionRate: 4.1,
      sentimentScore: 89,
      shareOfVoice: 46.0,
      avgOrderValue: 79000,
      customerAcquisitionCost: 4500
    },
    channels: {
      instagram: 35,
      youtube: 40,
      x: 10,
      shorts: 15
    },
    demographics: {
      age18_24: 32,
      age25_34: 48,
      age35_44: 14,
      age45_plus: 6
    },
    strategy: {
      messaging: 'Shot on iPhone user creativity, effortless privacy, and unmatched luxury ecosystem lock-in.',
      contentFormats: 'World-class short films, macro photography showcases, developer keynotes, ambient product demos.',
      creatorMix: 'Indie filmmakers, National Geographic photographers, tech reviewers, and creative artists.',
      strengths: [
        'Extraordinary brand loyalty and customer lifetime value',
        'Highest aspirational status symbol across urban demographics',
        'Expanding Indian manufacturing and flagship retail stores (BKC, Saket)'
      ],
      weaknesses: [
        'High upfront price barrier in value-conscious markets',
        'Limited official participation in spontaneous social meme trends',
        'Minimal regional language social media content'
      ],
      opportunities: [
        'Localized student discount financing campaigns with Indian banks',
        'Shot on iPhone campaigns celebrating Indian street festivals & weddings',
        'Services bundle (Apple One) marketing targeting family tiers'
      ]
    }
  },

  samsung: {
    id: 'samsung',
    name: 'Samsung',
    category: 'Smartphones & Smart Devices',
    tagline: 'Do What You Can’t',
    positioning: 'Pioneering hardware innovation, versatile AI cameras, open customization for everyone.',
    logoText: 'SAMSUNG',
    color: '#2563eb',
    metrics: {
      engagementRate: 3.9,
      monthlyReach: 74.5,
      conversionRate: 3.6,
      sentimentScore: 79,
      shareOfVoice: 42.0,
      avgOrderValue: 28500,
      customerAcquisitionCost: 2100
    },
    channels: {
      instagram: 32,
      youtube: 35,
      x: 18,
      shorts: 15
    },
    demographics: {
      age18_24: 36,
      age25_34: 38,
      age35_44: 18,
      age45_plus: 8
    },
    strategy: {
      messaging: 'Galaxy AI in everyday life, zoom camera flex, foldable novelty (Flip/Fold), and multi-tier versatility.',
      contentFormats: 'Feature breakdown reviews, concert zoom comparisons, tech unboxings, regional festive gift guides.',
      creatorMix: 'High-volume tech YouTubers + lifestyle vloggers + K-pop stars (BTS).',
      strengths: [
        'Unmatched product breadth from budget Galaxy M to ultra-premium S-Ultra',
        'Deepest offline distribution network across Tier-1, 2, and 3 India',
        'Pioneering foldable screen and AI hardware leadership'
      ],
      weaknesses: [
        'Complex portfolio can confuse consumer tier perception',
        'Customer satisfaction variance across budget vs flagship lines',
        'Lower organic lifestyle social virality compared to Apple'
      ],
      opportunities: [
        'Target Gen-Z college students with Galaxy Flip creator workshops',
        'Emphasize local Galaxy AI translation in 12+ Indian regional languages',
        'Aggressive upgrade exchange campaigns in mid-tier cities'
      ]
    }
  },

  coca_cola: {
    id: 'coca_cola',
    name: 'Coca-Cola',
    category: 'Beverages & Soft Drinks',
    tagline: 'Real Magic',
    positioning: 'Universal optimism, shared moments of refreshment, festive togetherness.',
    logoText: 'COCA-COLA',
    color: '#dc2626',
    metrics: {
      engagementRate: 4.1,
      monthlyReach: 82.0,
      conversionRate: 2.7,
      sentimentScore: 86,
      shareOfVoice: 52.0,
      avgOrderValue: 120,
      customerAcquisitionCost: 45
    },
    channels: {
      instagram: 40,
      youtube: 35,
      x: 10,
      shorts: 15
    },
    demographics: {
      age18_24: 42,
      age25_34: 36,
      age35_44: 16,
      age45_plus: 6
    },
    strategy: {
      messaging: 'Coke Studio music fusion, festive family reunions (Diwali/Eid/Durga Puja), and cooling summer magic.',
      contentFormats: 'High-production music tracks, food pairing reels (Biryani + Coke), augmented reality festival filters.',
      creatorMix: 'Regional folk and indie music artists + food bloggers + youth lifestyle creators.',
      strengths: [
        'Legendary Coke Studio music IP with generational cultural love',
        'Ubiquitous physical availability in millions of local kirana stores',
        'Mastery of emotionally resonant festive advertising'
      ],
      weaknesses: [
        'Increasing health scrutiny on high-sugar carbonated beverages',
        'Lower repeat digital engagement compared to tech/fashion brands',
        'Rising competition from functional and low-sugar hydration drinks'
      ],
      opportunities: [
        'Accelerate Zero Sugar sampling and youth gamer integrations',
        'Hyperlocal regional food-pairing campaigns across state food cultures',
        'Music festival experiential pop-ups in Tier-2 colleges'
      ]
    }
  },

  pepsi: {
    id: 'pepsi',
    name: 'Pepsi',
    category: 'Beverages & Youth Culture',
    tagline: 'Rise Up, Baby!',
    positioning: 'Irreverent, witty, bold youth challenger brand rooted in pop music and cricket.',
    logoText: 'PEPSI',
    color: '#1d4ed8',
    metrics: {
      engagementRate: 4.4,
      monthlyReach: 76.5,
      conversionRate: 2.6,
      sentimentScore: 82,
      shareOfVoice: 44.0,
      avgOrderValue: 110,
      customerAcquisitionCost: 48
    },
    channels: {
      instagram: 45,
      youtube: 28,
      x: 12,
      shorts: 15
    },
    demographics: {
      age18_24: 55,
      age25_34: 30,
      age35_44: 11,
      age45_plus: 4
    },
    strategy: {
      messaging: 'Swag, youthful boldness, challenging boring norms, high-energy cinema & cricket tie-ins.',
      contentFormats: 'Catchy dance hooks, meme reaction reels, stadium matchday challenges, celebrity roast banter.',
      creatorMix: 'Bollywood youth stars (Ranveer Singh, Salman), gaming streamers, and dance choreographers.',
      strengths: [
        'Sharp, disruptive attitude that connects instantly with Gen Z',
        'Strong association with Indian cinema and high-voltage cricket moments',
        'Innovative visual rebrand with vibrant retro-electric packaging'
      ],
      weaknesses: [
        'Trailing Coke in rural penetration and emotional festive depth',
        'Brand sentiment sensitive to sugary beverage health concerns',
        'Shorter lifespan on viral social memes compared to sustained music IPs'
      ],
      opportunities: [
        'Expand Pepsi Black zero-calorie positioning among fitness-conscious youth',
        'Co-create gaming esports tournaments with beverage combos',
        'Regional vernacular meme marketing during IPL and cricket leagues'
      ]
    }
  },

  zara: {
    id: 'zara',
    name: 'Zara',
    category: 'Fast Fashion & Contemporary Apparel',
    tagline: 'Runway to Street',
    positioning: 'High-fashion editorial aesthetic, rapid trend cycle, curated aspirational minimalism.',
    logoText: 'ZARA',
    color: '#0f172a',
    metrics: {
      engagementRate: 3.8,
      monthlyReach: 28.5,
      conversionRate: 4.4,
      sentimentScore: 78,
      shareOfVoice: 28.0,
      avgOrderValue: 5600,
      customerAcquisitionCost: 920
    },
    channels: {
      instagram: 62,
      youtube: 10,
      x: 8,
      shorts: 20
    },
    demographics: {
      age18_24: 46,
      age25_34: 41,
      age35_44: 10,
      age45_plus: 3
    },
    strategy: {
      messaging: 'High-fashion runway lookbooks, editorial poise, zero-traditional-ad mystique, instant style gratification.',
      contentFormats: 'Silent moody aesthetic reels, fitting room try-ons, viral coat/dress unboxings, runway capsules.',
      creatorMix: 'High-aesthetic fashion micro-influencers and fashion stylists (mostly organic/PR-gifting).',
      strengths: [
        'Ultra-fast 2-week design-to-rack trend turnaround',
        'High desire and FOMO-driven purchase velocity',
        'Strong premium store presence in elite shopping malls'
      ],
      weaknesses: [
        'Growing public scrutiny around fast-fashion environmental sustainability',
        'Higher return rates on online e-commerce sizing',
        'Limited reach outside Tier-1 metropolitan areas'
      ],
      opportunities: [
        'Promote Zara Pre-Owned / circular repair & resale initiatives',
        'Localized festive eveningwear capsules tailored for modern Indian celebrations',
        'Improved omnichannel app delivery in 48-hour delivery windows'
      ]
    }
  },

  hm: {
    id: 'hm',
    name: 'H&M',
    category: 'Fashion & Sustainable Everyday Essentials',
    tagline: 'Fashion and Quality at the Best Price',
    positioning: 'Accessible style, modern everyday basics, circular sustainability initiatives, designer collabs.',
    logoText: 'H&M',
    color: '#e11d48',
    metrics: {
      engagementRate: 3.4,
      monthlyReach: 32.0,
      conversionRate: 4.0,
      sentimentScore: 80,
      shareOfVoice: 25.0,
      avgOrderValue: 3400,
      customerAcquisitionCost: 650
    },
    channels: {
      instagram: 54,
      youtube: 16,
      x: 10,
      shorts: 20
    },
    demographics: {
      age18_24: 52,
      age25_34: 35,
      age35_44: 10,
      age45_plus: 3
    },
    strategy: {
      messaging: 'Everyday casual confidence, inclusive sizing, Garment Collecting recycling, limited-edition designer capsules.',
      contentFormats: 'Capsule wardrobe styling reels, student budget lookbooks, seasonal holiday gift guides.',
      creatorMix: 'Everyday college creators + body-positive fashion advocates + family lifestyle creators.',
      strengths: [
        'Highly attractive price-to-design ratio for college students and young professionals',
        'Strong loyalty member rewards program with millions of active users',
        'Faster retail expansion into Tier-2 Indian cities (Jaipur, Indore, Lucknow)'
      ],
      weaknesses: [
        'Perception of fabric durability variance on lowest-tier budget tees',
        'Intense competition from domestic Indian D2C fast-fashion players',
        'Lower exclusivity compared to Zara'
      ],
      opportunities: [
        'Target back-to-college shopping season with student campus ambassador programs',
        'Promote conscious fabric lines with transparent supply chain QR codes',
        'Vernacular styling guides for regional festive wardrobes'
      ]
    }
  }
};

export const MOCK_REGIONS = {
  maharashtra: {
    id: 'maharashtra',
    name: 'Maharashtra (Mumbai MMR & Pune)',
    tier: 'Tier 1 & Urban Metros',
    primaryLanguages: ['Marathi', 'Hindi', 'English (Hinglish)'],
    engagementRate: 5.4,
    sentiment: 88,
    peakHours: '8:30 PM - 11:00 PM & 8:00 AM - 9:30 AM (Metro Commute)',
    basketSize: '₹3,400 - ₹5,800',
    topFormats: ['15s Fast-paced Reels with Mumbai local banter', 'Bilingual street food/fashion vlogs', 'Fintech hack explainers'],
    culturalTriggers: ['Ganesh Chaturthi celebrations', 'Dabbawala punctuality/work-hustle ethos', 'Bollywood/glam references'],
    recommendedApproach: 'Blend high-energy urban hustle with authentic Marathi/Hinglish colloquialisms. Video retention peaks when hook uses local transit or street landmarks.'
  },
  karnataka: {
    id: 'karnataka',
    name: 'Karnataka (Bengaluru Tech Corridor)',
    tier: 'Tier 1 Tech & Innovation Hub',
    primaryLanguages: ['Kannada', 'English', 'Hindi'],
    engagementRate: 5.8,
    sentiment: 86,
    peakHours: '7:30 PM - 10:30 PM & 1:00 PM - 2:00 PM (Lunch Break)',
    basketSize: '₹4,200 - ₹7,500',
    topFormats: ['Clean aesthetic minimalism', 'Tech gadget unboxings & AI breakdowns', 'Filter coffee & startup culture humor'],
    culturalTriggers: ['Pride in Kannada heritage & Rajyotsava', 'Startup founder journey narratives', 'Specialty coffee & eco-sustainability'],
    recommendedApproach: 'High receptivity to tech-enabled solutions, clean UI/UX demonstrations, and humor centered on Bengaluru traffic or tech life. Kannada vernacular creators drive 2.4x higher trust.'
  },
  delhi_ncr: {
    id: 'delhi_ncr',
    name: 'Delhi NCR (Delhi, Gurgaon, Noida)',
    tier: 'Tier 1 Capital & Corporate Hub',
    primaryLanguages: ['Hindi', 'English', 'Punjabi'],
    engagementRate: 5.1,
    sentiment: 82,
    peakHours: '9:00 PM - 11:30 PM',
    basketSize: '₹4,000 - ₹6,900',
    topFormats: ['High-glam wedding & festive lookbooks', 'Lively food tasting trails (Old Delhi to CP)', 'Witty observational street humor'],
    culturalTriggers: ['Grand weddings & festive couture', 'Street food culinary heritage', 'Bold, outspoken street confidence'],
    recommendedApproach: 'Aspirational luxury and bold visual hooks perform best. Emphasize scale, celebratory vibes, and striking aesthetics with punchy Hindi/Punjabi idioms.'
  },
  tamil_nadu: {
    id: 'tamil_nadu',
    name: 'Tamil Nadu (Chennai & Coimbatore)',
    tier: 'Tier 1 & Tier 2 Industrial/Knowledge Hub',
    primaryLanguages: ['Tamil', 'English'],
    engagementRate: 4.9,
    sentiment: 85,
    peakHours: '8:00 PM - 10:00 PM',
    basketSize: '₹2,800 - ₹4,900',
    topFormats: ['Tamil cinema dialogue homages', 'Informative educational carousels', 'Authentic family-centric narrative reels'],
    culturalTriggers: ['Deep linguistic pride and classical heritage', 'Pongal & Margazhi season', 'Cinema fandom (Kollywood legends)'],
    recommendedApproach: 'Pure Tamil copy or culturally respectful Tanglish outperforms generic Hindi dubbed ads by +65%. Highlight value-for-money, durability, and family wellness.'
  },
  west_bengal: {
    id: 'west_bengal',
    name: 'West Bengal (Kolkata & Howrah)',
    tier: 'Tier 1 Cultural & Creative Hub',
    primaryLanguages: ['Bengali', 'English', 'Hindi'],
    engagementRate: 4.7,
    sentiment: 84,
    peakHours: '8:30 PM - 10:45 PM & 4:00 PM - 6:00 PM (Adda Time)',
    basketSize: '₹2,400 - ₹4,200',
    topFormats: ['Storytelling audio reels & poetry hooks', 'Pujo fashion lookbooks', 'Artisanal culinary heritage documentaries'],
    culturalTriggers: ['Durga Puja shopping frenzy', 'Intellectual "Adda" conversation culture', 'Art, literature, and classic cinema'],
    recommendedApproach: 'Emotional, poetic, or intellectually stimulating narratives resonate far more than overt hard-sell tactics. Pujo campaigns should launch 45 days prior to peak festival.'
  },
  gujarat: {
    id: 'gujarat',
    name: 'Gujarat (Ahmedabad, Surat, Vadodara)',
    tier: 'Tier 1 & 2 Entrepreneurial Hub',
    primaryLanguages: ['Gujarati', 'Hindi'],
    engagementRate: 5.2,
    sentiment: 89,
    peakHours: '9:30 PM - 11:45 PM (Late-night active culture)',
    basketSize: '₹3,600 - ₹6,100',
    topFormats: ['Navratri Garba styling and energetic reels', 'Smart savings & ROI business hacks', 'Food street exploration'],
    culturalTriggers: ['Navratri festival enthusiasm', 'Vyapaar/Business acumen and value consciousness', 'Community-driven celebrations'],
    recommendedApproach: 'Emphasize value, return-on-spend, family sharing, and entrepreneurial smartness. Navratri campaigns require vibrant traditional-fusion aesthetics and high-energy folk beats.'
  },
  punjab: {
    id: 'punjab',
    name: 'Punjab (Chandigarh, Ludhiana, Amritsar)',
    tier: 'Tier 2 Emerging Lifestyle & Agriculture Hub',
    primaryLanguages: ['Punjabi', 'Hindi'],
    engagementRate: 5.5,
    sentiment: 87,
    peakHours: '8:00 PM - 10:30 PM',
    basketSize: '₹3,800 - ₹6,400',
    topFormats: ['Punjabi music video collaborations', 'Larger-than-life luxury & automobile reels', 'Hearty culinary & fitness challenges'],
    culturalTriggers: ['Punjabi music dominance on global charts', 'Generosity, hospitality, and pride', 'Baisakhi & festive harvest moments'],
    recommendedApproach: 'Feature Punjabi music tracks and charismatic creators. Visuals should be vibrant, generous, and confident.'
  },
  kerala: {
    id: 'kerala',
    name: 'Kerala (Kochi & Trivandrum)',
    tier: 'Tier 2 High-Literacy Consumer Market',
    primaryLanguages: ['Malayalam', 'English'],
    engagementRate: 5.0,
    sentiment: 85,
    peakHours: '7:30 PM - 9:30 PM',
    basketSize: '₹3,100 - ₹5,400',
    topFormats: ['High-subtlety cinema humor & memes', 'Eco-tourism and clean living vlogs', 'Detailed consumer reviews'],
    culturalTriggers: ['Onam festive shopping season', 'High awareness of health and ethical sourcing', 'Cinema realism and witty satire'],
    recommendedApproach: 'Consumers are exceptionally research-driven and critical of false claims. Transparency in ingredients and high aesthetic production value are mandatory.'
  },
  uttar_pradesh: {
    id: 'uttar_pradesh',
    name: 'Uttar Pradesh (Lucknow, Kanpur, Varanasi)',
    tier: 'Tier 2 & 3 High-Volume Emerging Market',
    primaryLanguages: ['Hindi (Bhojpuri/Awadhi dialects)', 'Hinglish'],
    engagementRate: 5.3,
    sentiment: 83,
    peakHours: '7:00 PM - 10:00 PM',
    basketSize: '₹1,800 - ₹3,600',
    topFormats: ['Short comedy sketches with relatable family characters', 'Festive gifting guides', 'Snackable WhatsApp shareable videos'],
    culturalTriggers: ['Tehzeeb (courtesy) and heritage pride', 'Diwali & Chhath Puja festivities', 'Aspirational upward mobility'],
    recommendedApproach: 'Keep messaging grounded, relatable, and accessible. Focus on tangible benefits, multi-use value, and easy regional payment options (UPI, COD).'
  }
};

export const MOCK_CREATORS = [
  {
    id: 'c1',
    name: 'Aarav TechBytes',
    handle: '@aarav.techbytes',
    tier: 'Mid-Tier',
    tierCategory: 'mid',
    platform: 'youtube',
    niche: 'Tech & Gadgets',
    followers: '340K',
    followerCount: 340000,
    engagementRate: 6.2,
    avgViews: '120K',
    authenticityScore: 94,
    costPerDeliverable: 65000,
    costDisplay: '₹65,000 / Video',
    fitScore: 96,
    avatar: 'AT',
    avatarColor: '#4f46e5',
    verified: true,
    recommendationReason: 'Exceptional Tier-1 Tech audience alignment; 78% male demographic 18-30 with high disposable gadget budget.',
    recentPartnerships: ['OnePlus', 'Boat', 'Logitech']
  },
  {
    id: 'c2',
    name: 'Priya FashionVogue',
    handle: '@priyastylefile',
    tier: 'Macro',
    tierCategory: 'macro',
    platform: 'instagram',
    niche: 'Fashion & Streetwear',
    followers: '820K',
    followerCount: 820000,
    engagementRate: 4.8,
    avgViews: '280K',
    authenticityScore: 91,
    costPerDeliverable: 120000,
    costDisplay: '₹1,20,000 / Reel',
    fitScore: 94,
    avatar: 'PF',
    avatarColor: '#ec4899',
    verified: true,
    recommendationReason: 'Dominant high-street lookbook engagement in Mumbai & Delhi; 68% female 18-28 audience with high save rate.',
    recentPartnerships: ['Zara', 'H&M', 'Myntra']
  },
  {
    id: 'c3',
    name: 'Dr. Rohan Wellness',
    handle: '@dr.rohanhealth',
    tier: 'Micro',
    tierCategory: 'micro',
    platform: 'instagram',
    niche: 'Beauty & Wellness',
    followers: '78K',
    followerCount: 78000,
    engagementRate: 7.4,
    avgViews: '45K',
    authenticityScore: 98,
    costPerDeliverable: 28000,
    costDisplay: '₹28,000 / Reel',
    fitScore: 98,
    avatar: 'DR',
    avatarColor: '#10b981',
    verified: true,
    recommendationReason: 'Certified medical practitioner with unmatched trust score; ideal for ingredient breakdown and TrustPulse compliant campaigns.',
    recentPartnerships: ['The Derma Co', 'Kapiva', 'Oziva']
  },
  {
    id: 'c4',
    name: 'Chef Tanvi Rasoi',
    handle: '@tanvikirasoi',
    tier: 'Mid-Tier',
    tierCategory: 'mid',
    platform: 'youtube',
    niche: 'Food & Culinary',
    followers: '450K',
    followerCount: 450000,
    engagementRate: 5.6,
    avgViews: '160K',
    authenticityScore: 93,
    costPerDeliverable: 55000,
    costDisplay: '₹55,000 / Video',
    fitScore: 91,
    avatar: 'TR',
    avatarColor: '#f59e0b',
    verified: true,
    recommendationReason: 'Bilingual Hindi/English recipe developer with massive Tier-2 family recall and FSSAI safe culinary storytelling.',
    recentPartnerships: ['Tata Sampann', 'Amul', 'Saffola']
  },
  {
    id: 'c5',
    name: 'Vikram WealthWise',
    handle: '@wealthwithvikram',
    tier: 'Mid-Tier',
    tierCategory: 'mid',
    platform: 'linkedin',
    niche: 'Finance & Business',
    followers: '190K',
    followerCount: 190000,
    engagementRate: 6.8,
    avgViews: '85K',
    authenticityScore: 96,
    costPerDeliverable: 45000,
    costDisplay: '₹45,000 / Post',
    fitScore: 93,
    avatar: 'VW',
    avatarColor: '#0ea5e9',
    verified: true,
    recommendationReason: 'Top LinkedIn voice in wealth planning, high credibility with corporate salaried professionals in Bangalore and Gurgaon.',
    recentPartnerships: ['Zerodha', 'Groww', 'HDFC Bank']
  },
  {
    id: 'c6',
    name: 'Ananya GlowDiary',
    handle: '@glowwithananya',
    tier: 'Nano',
    tierCategory: 'nano',
    platform: 'instagram',
    niche: 'Beauty & Wellness',
    followers: '18K',
    followerCount: 18000,
    engagementRate: 9.2,
    avgViews: '24K',
    authenticityScore: 99,
    costPerDeliverable: 12000,
    costDisplay: '₹12,000 / Reel',
    fitScore: 89,
    avatar: 'AG',
    avatarColor: '#8b5cf6',
    verified: false,
    recommendationReason: 'Hyper-engaged nano creator with 9.2% engagement rate; superb organic comments-to-views ratio for D2C skincare trials.',
    recentPartnerships: ['Plum Goodness', 'Dot & Key']
  },
  {
    id: 'c7',
    name: 'Kabir StreetStyle',
    handle: '@kabir.streetwear',
    tier: 'Micro',
    tierCategory: 'micro',
    platform: 'instagram',
    niche: 'Fashion & Streetwear',
    followers: '62K',
    followerCount: 62000,
    engagementRate: 7.9,
    avgViews: '52K',
    authenticityScore: 95,
    costPerDeliverable: 25000,
    costDisplay: '₹25,000 / Reel',
    fitScore: 95,
    avatar: 'KS',
    avatarColor: '#6366f1',
    verified: false,
    recommendationReason: 'Authentic Indian sneakerhead curator; high resonance with Gen-Z streetwear thrift culture and drop notifications.',
    recentPartnerships: ['Puma India', 'Urban Monkey', 'Vans']
  },
  {
    id: 'c8',
    name: 'Rhea FitFuel',
    handle: '@rhea_fitjourney',
    tier: 'Mid-Tier',
    tierCategory: 'mid',
    platform: 'instagram',
    niche: 'Fitness & Nutrition',
    followers: '220K',
    followerCount: 220000,
    engagementRate: 5.9,
    avgViews: '95K',
    authenticityScore: 92,
    costPerDeliverable: 42000,
    costDisplay: '₹42,000 / Reel',
    fitScore: 92,
    avatar: 'RF',
    avatarColor: '#14b8a6',
    verified: true,
    recommendationReason: 'Strength coach and nutrition consultant; specializes in sustainable home workouts and macro-friendly Indian meals.',
    recentPartnerships: ['Fast&Up', 'Cult.fit', 'MuscleBlaze']
  },
  {
    id: 'c9',
    name: 'Dev PixelCraft',
    handle: '@dev.pixelgamer',
    tier: 'Macro',
    tierCategory: 'macro',
    platform: 'youtube',
    niche: 'Gaming',
    followers: '940K',
    followerCount: 940000,
    engagementRate: 5.1,
    avgViews: '320K',
    authenticityScore: 90,
    costPerDeliverable: 140000,
    costDisplay: '₹1,40,000 / Stream',
    fitScore: 88,
    avatar: 'DP',
    avatarColor: '#f43f5e',
    verified: true,
    recommendationReason: 'Leading BGMI and PC gaming streamer with loyal youth community across Hindi heartland; great for energy beverage integrations.',
    recentPartnerships: ['Monster Energy', 'ASUS ROG', 'Red Bull']
  },
  {
    id: 'c10',
    name: 'Meera GreenLiving',
    handle: '@meeragreenlife',
    tier: 'Micro',
    tierCategory: 'micro',
    platform: 'instagram',
    niche: 'Beauty & Wellness',
    followers: '54K',
    followerCount: 54000,
    engagementRate: 8.1,
    avgViews: '38K',
    authenticityScore: 97,
    costPerDeliverable: 22000,
    costDisplay: '₹22,000 / Reel',
    fitScore: 94,
    avatar: 'MG',
    avatarColor: '#84cc16',
    verified: false,
    recommendationReason: 'Eco-conscious zero-waste advocate; highly persuasive audience trust for organic, vegan, and clean ingredient verification.',
    recentPartnerships: ['Bare Necessities', 'Forest Essentials', 'Juicy Chemistry']
  },
  {
    id: 'c11',
    name: 'Nikhil AutoDrive',
    handle: '@nikhil_autodrive',
    tier: 'Mid-Tier',
    tierCategory: 'mid',
    platform: 'youtube',
    niche: 'Tech & Gadgets',
    followers: '380K',
    followerCount: 380000,
    engagementRate: 5.4,
    avgViews: '140K',
    authenticityScore: 92,
    costPerDeliverable: 60000,
    costDisplay: '₹60,000 / Video',
    fitScore: 90,
    avatar: 'NA',
    avatarColor: '#d97706',
    verified: true,
    recommendationReason: 'In-depth automotive tech, EV reviews, and smart dashboard comparisons; high purchase-intent mature audience.',
    recentPartnerships: ['Tata EV', 'Ather Energy', 'Samsung']
  },
  {
    id: 'c12',
    name: 'Siddharth StartupLens',
    handle: '@sid_startuplens',
    tier: 'Micro',
    tierCategory: 'micro',
    platform: 'linkedin',
    niche: 'Finance & Business',
    followers: '88K',
    followerCount: 88000,
    engagementRate: 7.2,
    avgViews: '42K',
    authenticityScore: 95,
    costPerDeliverable: 30000,
    costDisplay: '₹30,000 / Post',
    fitScore: 91,
    avatar: 'SS',
    avatarColor: '#2563eb',
    verified: true,
    recommendationReason: 'Venture analyst and founder case studies; drives high B2B executive conversion and SaaS signups.',
    recentPartnerships: ['Razorpay', 'Zoho', 'AWS India']
  }
];

export const MOCK_CAMPAIGNS = [
  {
    id: 'camp-1',
    name: 'Festive Sparkle 2024',
    brand: 'Braco Lifestyle',
    status: 'Live',
    statusClass: 'status-live',
    platform: 'Omnichannel',
    budget: '₹25,00,000',
    spent: '₹18,40,000',
    reach: '8.4M',
    reachNum: 8400000,
    engagement: '5.2%',
    engagementNum: 5.2,
    conversions: '42,800',
    conversionsNum: 42800,
    cpa: '₹192',
    roas: '4.2x',
    roasNum: 4.2,
    dateRange: 'Oct 1 - Oct 31, 2024',
    weeklyData: {
      labels: ['W1', 'W2', 'W3', 'W4'],
      reach: [1.2, 2.4, 2.8, 2.0], // millions
      engagement: [4.8, 5.1, 5.6, 5.2], // %
      conversions: [6200, 12400, 14800, 9400]
    }
  },
  {
    id: 'camp-2',
    name: 'Summer Hydration Wave',
    brand: 'PulseEnergy',
    status: 'Live',
    statusClass: 'status-live',
    platform: 'Instagram & YouTube',
    budget: '₹15,00,000',
    spent: '₹11,20,000',
    reach: '5.2M',
    reachNum: 5200000,
    engagement: '4.6%',
    engagementNum: 4.6,
    conversions: '28,400',
    conversionsNum: 28400,
    cpa: '₹165',
    roas: '3.9x',
    roasNum: 3.9,
    dateRange: 'Sep 15 - Oct 15, 2024',
    weeklyData: {
      labels: ['W1', 'W2', 'W3', 'W4'],
      reach: [0.9, 1.4, 1.6, 1.3],
      engagement: [4.2, 4.5, 4.9, 4.6],
      conversions: [4100, 7800, 9200, 7300]
    }
  },
  {
    id: 'camp-3',
    name: 'Gen-Z Streetwear Blitz',
    brand: 'UrbanStitch',
    status: 'Optimizing',
    statusClass: 'status-optimizing',
    platform: 'Instagram Reels',
    budget: '₹10,00,000',
    spent: '₹6,80,000',
    reach: '3.6M',
    reachNum: 3600000,
    engagement: '6.4%',
    engagementNum: 6.4,
    conversions: '19,200',
    conversionsNum: 19200,
    cpa: '₹142',
    roas: '4.6x',
    roasNum: 4.6,
    dateRange: 'Oct 5 - Nov 5, 2024',
    weeklyData: {
      labels: ['W1', 'W2', 'W3', 'W4'],
      reach: [0.6, 1.1, 1.2, 0.7],
      engagement: [6.1, 6.6, 6.8, 6.4],
      conversions: [3200, 6100, 6400, 3500]
    }
  },
  {
    id: 'camp-4',
    name: 'Tech Founder Productivity',
    brand: 'SwiftPay QR',
    status: 'Completed',
    statusClass: 'status-completed',
    platform: 'LinkedIn & YouTube',
    budget: '₹8,00,000',
    spent: '₹8,00,000',
    reach: '1.2M',
    reachNum: 1200000,
    engagement: '3.8%',
    engagementNum: 3.8,
    conversions: '6,400',
    conversionsNum: 6400,
    cpa: '₹340',
    roas: '3.1x',
    roasNum: 3.1,
    dateRange: 'Aug 1 - Aug 31, 2024',
    weeklyData: {
      labels: ['W1', 'W2', 'W3', 'W4'],
      reach: [0.3, 0.35, 0.3, 0.25],
      engagement: [3.5, 3.9, 4.1, 3.8],
      conversions: [1400, 1900, 1800, 1300]
    }
  }
];

export const MOCK_RECOMMENDATIONS = [
  {
    id: 'rec-1',
    priority: 'high',
    priorityLabel: 'High Priority',
    category: 'Regional Localization',
    title: 'Scale Vernacular Content in Maharashtra & Karnataka',
    description: 'Regional language variants delivered a 42% higher retention rate and ₹48 lower CPA compared to English-only copies in the festive cycle.',
    metric: '+42% Hook Retention',
    actionLabel: 'Explore Regional Insights',
    targetSection: 'regional'
  },
  {
    id: 'rec-2',
    priority: 'high',
    priorityLabel: 'High Priority',
    category: 'Channel Allocation',
    title: 'Reallocate 15% Budget from Meta Feed to YouTube Shorts Creators',
    description: 'YouTube Shorts CPA (₹142) is outperforming static feed ads by 28% while generating 3.2x higher organic comment sentiment.',
    metric: '₹68 Lower CPA',
    actionLabel: 'Analyze in Analytics',
    targetSection: 'analytics'
  },
  {
    id: 'rec-3',
    priority: 'medium',
    priorityLabel: 'Brand Safety Alert',
    category: 'TrustPulse Compliance',
    title: 'Mandate ASCI #ad Disclosures on 3 Creator Collabs',
    description: 'Draft contracts for creator campaign "Festive Sparkle" require explicit #collab disclosures in first 3 lines to satisfy ASCI 2023 endorsement rules.',
    metric: '100% Risk Mitigation',
    actionLabel: 'Audit in TrustPulse',
    targetSection: 'trustpulse'
  },
  {
    id: 'rec-4',
    priority: 'medium',
    priorityLabel: 'Competitive Gap',
    category: 'Competitive Strategy',
    title: 'Capitalize on Competitor Pricing Vulnerability in Tier-2',
    description: 'Adidas and Nike under-index on sub-₹3,500 lifestyle sneakers in Tier-2 cities. An aggressive bundle campaign can capture up to 14% market share.',
    metric: '+14% Market Capture',
    actionLabel: 'Review Brand Comparison',
    targetSection: 'competitive'
  },
  {
    id: 'rec-5',
    priority: 'quick-win',
    priorityLabel: 'Quick Win',
    category: 'Creator Roster',
    title: 'Engage 4 Nano-Creators for Authentic Social Proof',
    description: 'Nano-creators in the beauty & wellness category show 9.2% engagement rates at 1/5th the commercial cost of celebrity macros.',
    metric: '3.8x ROAS Multiplier',
    actionLabel: 'Build Creator Roster',
    targetSection: 'creators'
  }
];
