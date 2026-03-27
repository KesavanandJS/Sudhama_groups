// Menaka Textiles images
import menaka1 from '../assets/Menaka textiles/VKI04535.JPG'
import menaka2 from '../assets/Menaka textiles/VKI04537.JPG'
import menaka3 from '../assets/Menaka textiles/VKI04540.JPG'
import menaka4 from '../assets/Menaka textiles/VKI04544.JPG'
import menaka5 from '../assets/Menaka textiles/VKI04546.JPG'
import menaka6 from '../assets/Menaka textiles/VKI04549.JPG'
import menaka7 from '../assets/Menaka textiles/VKI04552.JPG'
import menaka8 from '../assets/Menaka textiles/VKI04556.JPG'

// Sudhama Hosieries images
import sudhama1 from '../assets/Sudhama hosieries/VKI04687.JPG'
import sudhama2 from '../assets/Sudhama hosieries/VKI04688.JPG'
import sudhama3 from '../assets/Sudhama hosieries/VKI04693.JPG'
import sudhama4 from '../assets/Sudhama hosieries/VKI04694.JPG'
import sudhama5 from '../assets/Sudhama hosieries/VKI04698.JPG'
import sudhama6 from '../assets/Sudhama hosieries/VKI04702.JPG'
import sudhama7 from '../assets/Sudhama hosieries/VKI04705.JPG'
import sudhama8 from '../assets/Sudhama hosieries/VKI04707.JPG'

// GP Textiles images
import gp1 from '../assets/GP Textiles/VKI04617.JPG'
import gp2 from '../assets/GP Textiles/VKI04619.JPG'
import gp3 from '../assets/GP Textiles/VKI04621.JPG'
import gp4 from '../assets/GP Textiles/VKI04622.JPG'
import gp5 from '../assets/GP Textiles/VKI04627.JPG'
import gp6 from '../assets/GP Textiles/VKI04628.JPG'
import gp7 from '../assets/GP Textiles/VKI04630.JPG'
import gp8 from '../assets/GP Textiles/VKI04632.JPG'

export const branches = [
    {
        id: 'menaka',
        route: '/menaka-textiles',
        name: 'Menaka Textiles',
        tagline: 'Crafting Excellence in the Heart of Tirupur',
        description: 'Located at our corporate office in the heart of Tirupur city, Menaka Textiles houses a highly sophisticated Garment Manufacturing and Embroidery Division. Our skilled craftsmen and latest machinery ensure exceptional quality in every piece we create.',
        accent: '#2E7D32',
        stats: { years: 25, products: 500, clients: 200 },
        bgGradient: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #4CAF50 100%)',
        images: [menaka1, menaka2, menaka3, menaka4, menaka5, menaka6, menaka7, menaka8],
        details: {
            story: 'Menaka Textiles is located at our corporate office in the heart of Tirupur city. We house a Garment Manufacturing and Embroidery Division which is highly sophisticated with latest machineries — and our highly skilled craftsmen add value to every thread. A legacy of excellence, woven into every fabric.',
            capabilities: [
                { title: 'Garment Manufacturing', desc: 'A highly sophisticated division equipped with the latest machineries and driven by our highly skilled craftsmen who add unparalleled value to every product.' },
                { title: 'Embroidery Division', desc: 'Equipped with Burdan and Tajima technology machines — the gold standard in the industry — capable of performing Embroidery, Sequence, and Cording on all kinds of fabrics.' },
                { title: 'Knitted & Woven Fabrics', desc: 'Our division works seamlessly on both knitted and woven fabric types, making us a versatile partner for a wide range of garment applications.' },
            ],
            products: ['Embroidery Work', 'Sequence Work', 'Cording Work', 'Knitted Fabric Garments', 'Woven Fabric Garments', 'Custom Apparel']
        }
    },
    {
        id: 'sudhama',
        route: '/sudhama-hosieries',
        name: 'Sudhama Hosieries',
        tagline: 'Sophisticated Machinery. Skilled Craftsmanship. Superior Garments.',
        description: 'Both the Knitting and Garment Manufacturing units at Sudhama Hosieries are well equipped with highly sophisticated machineries and skilled craftsmanship — delivering world-class garments from the heart of Tirupur.',
        accent: '#F9A825',
        stats: { years: 20, products: 300, clients: 150 },
        bgGradient: 'linear-gradient(135deg, #F57F17 0%, #F9A825 50%, #FDD835 100%)',
        images: [sudhama1, sudhama2, sudhama3, sudhama4, sudhama5, sudhama6, sudhama7, sudhama8],
        details: {
            story: 'Both the Knitting and Garment Manufacturing units at Sudhama Hosieries are well equipped with highly sophisticated machineries and skilled craftsmanship. Our Knitting unit is located in TEKIC, Tirupur, powered by high-technology imported fabric & collar knitting machines from Falmac, Mayer & Cie, and Stoll — ensuring precision and quality in every yard of fabric we produce.',
            capabilities: [
                { title: 'Knitting Unit — TEKIC, Tirupur', desc: 'High-technology imported fabric & collar knitting machines from globally renowned brands — Falmac, Mayer & Cie, and Stoll — producing superior knitted fabric with exceptional consistency.' },
                { title: 'Cutting & Garment Manufacturing', desc: 'Computerized pattern making and grading with Gerber CAD software. All sewing machines are imported with high technology — Brother, Juki, Pegasus, and Yamato — ensuring precision in every stitch.' },
                { title: 'Metal Free Zone Storage', desc: 'Our finished garments are stored in a Metal Free Zone, duly detected with the help of a needle detector — ensuring the highest standards of safety and quality before dispatch.' },
            ],
            products: ['Knitted Fabric', 'Collar Knitting', 'Cut & Sew Garments', 'T-Shirts & Tops', 'Activewear', 'Export Garments']
        }
    },
    {
        id: 'gptextiles',
        route: '/gp-textiles',
        name: 'G P Textiles',
        tagline: 'All Three Printing Technologies. One World-Class Unit.',
        description: 'Located near our corporate office, G P Textiles houses both a Printing Unit and a Garment Manufacturing Unit — capable of delivering all ranges of garment and fabric prints with eco-friendly processes at the highest quality.',
        accent: '#C62828',
        stats: { years: 15, products: 400, clients: 180 },
        bgGradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2d2d2d 100%)',
        images: [gp1, gp2, gp3, gp4, gp5, gp6, gp7, gp8],
        details: {
            story: 'G P Textiles is located near our corporate office and houses both a Printing Unit and a Garment Manufacturing Unit. Our Printing Unit is equipped with all three technologies — Automatic Machines, Manual Machines, and Table Top Printing — making us versatile and capable of handling every kind of print requirement at the highest quality, in an eco-friendly manner.',
            capabilities: [
                { title: 'Three Printing Technologies', desc: 'Equipped with Automatic Machines, Manual Machines, and Table Top Printing — giving us the flexibility to handle any print format, volume, and complexity with precision.' },
                { title: 'Full Range of Print Types', desc: 'Capable of printing Water Base, PVC & Non PVC, Flock, High-Density, Foil, Sugar Print and more — on all ranges of garment and fabric, at the highest quality.' },
                { title: 'Eco-Friendly Manufacturing', desc: 'All printing processes are carried out in an eco-friendly manner, ensuring sustainability without compromising on quality or output, paired with a fully equipped Garment Manufacturing unit.' },
            ],
            products: ['Water Base Print', 'PVC & Non PVC Print', 'Flock Print', 'High-Density Print', 'Foil Print', 'Sugar Print']
        }
    },
]
