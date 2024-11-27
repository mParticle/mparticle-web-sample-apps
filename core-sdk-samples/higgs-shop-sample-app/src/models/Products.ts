const products: Product[] = [
    {
        id: '128113',
        label: 'Brazil Blend',
        imageUrl: '/products/128113.png',
        altText: 'Brazil Blend',
        price: 1.0,
        category: 'Coffee',
        brand: 'Rocket Surgery Coffee',
        description: `
        Dance to the beats of the Samba with this Brazilian blend. 
        With a nutty sweetness and hints of Amazonian chocolate, it embodies the spirit of Rios Carnival.`,
    },
    {
        id: '128115',
        label: 'Colombia Blend',
        imageUrl: '/products/128115.png',
        altText: 'Colombia Blend',
        price: 1.0,
        category: 'Coffee',
        brand: 'Rocket Surgery Coffee',
        description: `
        Journey through the Andes with this Colombian treasure. A well-balanced cup, it brims with the sweetness of caramel and the warmth of Andean nuts.`,
    },
    {
        id: '128114',
        label: 'Burundi Blend',
        imageUrl: '/products/128114.png',
        altText: 'Burundi Blend',
        price: 1.0,
        category: 'Coffee',
        brand: 'Rocket Surgery Coffee',
        description: `Like the rhythmic drumbeats of Burundi, this coffee sings with flavors of red fruit, sweet spice, and a tea-like lightness.`,
    },
    {
        id: '128747',
        label: 'Vietnam Blend',
        imageUrl: '/products/128747.png',
        altText: 'Vietnam Blend',
        category: 'Coffee',
        brand: 'Rocket Surgery Coffee',
        price: 8.0,
        variants: {
            color: [
                `
                'Laos',
                'Saigon'
                `,
            ],
            size: ['250g', '500g', '1kg', '2kg', '5kg', '10kg'],
        },
        description: `
        As captivating as the terraced fields of Sapa, this robusta-rich blend stands strong with flavors of dark chocolate and caramel, mirroring Vietnam's resilience and beauty.
`,
    },
    {
        id: '128742',
        label: 'Kenya Blend',
        imageUrl: '/products/128742.png',
        altText: 'Kenya Blend',
        price: 2.0,
        category: 'Coffee',
        brand: 'Rocket Surgery Coffee',
        description: `
        Evoke the grandeur of the African savannah. 
        
        This Kenyan blend shines with bright acidity, full-bodied flavor, and notes that hint at the vast landscapes of the Maasai Mara.
        `,
    },
    {
        id: '128741',
        label: 'Japan Blend',
        imageUrl: '/products/128741.png',
        altText: 'Japan Blend',
        price: 3.0,
        category: 'Coffee',
        brand: 'Rocket Surgery Coffee',
        description: `
        Reflecting the serenity of Japanese tea gardens, this blend, though not native to Japan, offers a clean, light, and delicate flavor, reminiscent of a Kyoto morning.
        `,
    },
    {
        id: '128740',
        label: 'Jamaica Blend',
        imageUrl: '/products/128740.png',
        altText: 'Jamaica Blend',
        price: 110.0,
        category: 'Coffee',
        brand: 'Rocket Surgery Coffee',
        variants: {
            color: ['Kingston'],
            size: ['250g', '500g', '1kg', '2kg', '5kg', '10kg'],
        },
        description: `
        Transport yourself to the rhythmic beats of reggae with this Jamaican blend. Mild, slightly sweet, with undertones of island nuts and cocoa.
        `,
    },
    {
        id: '128744',
        label: 'Guatemala Blend',
        imageUrl: '/products/128744.png',
        altText: 'Guatemala Blend',
        price: 50.0,
        category: 'Coffee',
        brand: 'Rocket Surgery Coffee',
        description: `
        A tribute to the ancient Mayan civilization, this blend offers a harmonious mix of chocolate with a touch of citrus zest, reminiscent of Guatemala's rich history and culture.
        `,
        variants: {
            color: ['Quetzaltenango'],
            size: ['250g', '500g', '1kg', '2kg', '5kg', '10kg'],
        },
    },
    {
        id: '128745',
        label: 'Ivory Coast Blend',
        imageUrl: '/products/128745.png',
        altText: 'Ivory Coast Blend',
        price: 9.0,
        category: 'Coffee',
        brand: 'Rocket Surgery Coffee',
        variants: {
            color: [
                `
                'Abidjan',
                'Yamoussoukro',
                `,
            ],
            size: ['250g', '500g', '1kg', '2kg', '5kg', '10kg'],
        },
        description: `
        Sip the exotic beauty of the Ivory Coast's lush rainforests in this blend. 
        Earthy richness is interlaced with hints of cocoa, reminiscent of the nation's famed cacao produce.
`,
    },
    {
        id: '128272',
        label: 'Ethiopia Blend',
        imageUrl: '/products/128272.png',
        altText: 'Ethiopia Blend',
        category: 'Coffee',
        brand: 'Rocket Surgery Coffee',
        price: 9.0,
        variants: {
            color: [
                'Addis Ababa',
                'Dire Dawa',
                'Mekelle',
                'Adama',
                'Awassa',
                'Bahir Dar',
                'Gonder',
                'Dessie',
                'Jimma',
                'Jijiga',
            ],
            size: ['250g', '500g', '1kg', '2kg', '5kg', '10kg'],
        },
        description: `
        Traversing the highlands of Ethiopia, the birthplace of coffee, this blend boasts a floral aroma with hints of the wild berries found in its vast landscapes.
`,
    },
    {
        id: '128746',
        label: 'Tanzania Blend',
        imageUrl: '/products/128746.png',
        altText: 'Tanzania Blend',
        price: 14.0,
        category: 'Coffee',
        brand: 'Rocket Surgery Coffee',
        variants: {
            color: ['Dar Es Salaam'],
            size: ['250g', '500g', '1kg', '2kg', '5kg', '10kg'],
        },
        description: `
        Inspired by the majestic Serengeti, this vibrant blend captures Tanzania's essence with notes of dark chocolate and wild black currants.
`,
    },
    {
        id: '128737',
        label: 'Greek Blend',
        imageUrl: '/products/128737.png',
        altText: 'Greek Blend',
        price: 28.0,
        category: 'Coffee',
        brand: 'Rocket Surgery Coffee',
        description: `
        Echoing the tales from ancient Greek mythology, this blend is strong and bold, with a touch of Mediterranean spice.
        `,
    },
    {
        id: '128738',
        label: 'Indonesia Blend',
        imageUrl: '/products/128738.png',
        altText: 'Indonesia Blend',
        price: 41.0,
        category: 'Coffee',
        brand: 'Rocket Surgery Coffee',
        description: `Dive deep into Indonesia's mystical islands. This blend offers an earthy touch with deep, complex flavors, like a journey through Bali's dense jungles and ancient temples.
`,
    },

    {
        id: '128743',
        label: 'Turkey Blend',
        imageUrl: '/products/128743.png',
        altText: 'Turkey Blend',
        price: 2.0,
        category: 'Coffee',
        brand: 'Rocket Surgery Coffee',
        description: `
        A homage to the bustling bazaars of Istanbul, this blend is strong and full-bodied, resembling the rich tapestry of Turkish tradition.
`,
    },
];

export interface Product {
    id: string;
    label: string;
    altText: string;
    imageUrl: string;
    price: number;
    description: string;
    category?: string;
    brand?: string;
    couponCode?: string;
    position?: number;
    variants?: {
        color?: string[];
        size?: string[];
    };
}

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const formatCurrency = (num: number) =>
    `$${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;

export default products;
