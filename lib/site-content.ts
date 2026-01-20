export interface Promo {
  id: string
  name: string
  duration: string
  includes: string[]
  price: string
  popular?: boolean
}

export interface AvailabilityDay {
  date: string
  status: 'available' | 'limited' | 'full'
}

export interface GalleryImage {
  id: string
  url: string
  category: 'cumpleanos' | 'shows' | 'personajes' | 'juegos' | 'decoracion'
  caption: string
}

export interface Review {
  id: string
  name: string
  neighborhood?: string
  rating: number
  text: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
}

export interface SiteContent {
  hero: {
    headline: string
    subheadline: string
  }
  stats: {
    rating: string
    events: string
    response: string
  }
  promos: Promo[]
  availability: AvailabilityDay[]
  gallery: GalleryImage[]
  reviews: Review[]
  faq: FAQ[]
}

// Generate next 14 days for availability
function generateNext14Days(): AvailabilityDay[] {
  const days: AvailabilityDay[] = []
  const statuses: ('available' | 'limited' | 'full')[] = ['available', 'limited', 'full']
  const today = new Date()
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const dateStr = date.toISOString().split('T')[0]
    // Random status for demo, weighted towards available
    const rand = Math.random()
    const status = rand < 0.5 ? 'available' : rand < 0.8 ? 'limited' : 'full'
    days.push({ date: dateStr, status })
  }
  return days
}

export const defaultSiteContent: SiteContent = {
  hero: {
    headline: "Animaciones infantiles que hacen explotar la fiesta 🎉",
    subheadline: "Cumpleaños inolvidables con juegos, shows, personajes y mucha diversión para los más chicos. ¡Dejanos hacer magia en tu evento!"
  },
  stats: {
    rating: "5.0 reseñas",
    events: "+200 eventos",
    response: "Respuesta rápida"
  },
  promos: [
    {
      id: "1",
      name: "Pack Mini Fiesta",
      duration: "1 hora",
      includes: ["Animador/a", "Juegos grupales", "Música y micrófono", "Globoflexia básica"],
      price: "Consultar",
      popular: false
    },
    {
      id: "2", 
      name: "Pack Fiesta Clásica",
      duration: "2 horas",
      includes: ["Animador/a", "Juegos y competencias", "Mini disco", "Globoflexia", "Show de magia", "Pintacaritas"],
      price: "Consultar",
      popular: true
    },
    {
      id: "3",
      name: "Pack Mega Fiesta",
      duration: "3 horas",
      includes: ["2 Animadores", "Juegos temáticos", "Show de magia", "Karaoke infantil", "Globoflexia premium", "Pintacaritas", "Personaje a elección"],
      price: "Consultar",
      popular: false
    },
    {
      id: "4",
      name: "Pack Personaje",
      duration: "1.5 horas",
      includes: ["Personaje animado", "Show interactivo", "Fotos con personaje", "Globoflexia", "Juegos temáticos"],
      price: "Consultar",
      popular: false
    },
    {
      id: "5",
      name: "Pack Spa Party",
      duration: "2 horas",
      includes: ["2 Animadoras", "Manicura infantil", "Mascarillas", "Desfile de modas", "Música y baile", "Coronas y accesorios"],
      price: "Consultar",
      popular: false
    },
    {
      id: "6",
      name: "Pack Científico Loco",
      duration: "2 horas",
      includes: ["Científico animador", "Experimentos seguros", "Slime personalizado", "Volcán de colores", "Kit para llevar"],
      price: "Consultar",
      popular: false
    }
  ],
  availability: generateNext14Days(),
  gallery: [
    { id: "1", url: "/placeholder-party-1.jpg", category: "cumpleanos", caption: "Cumpleaños de Martina - 5 años" },
    { id: "2", url: "/placeholder-party-2.jpg", category: "shows", caption: "Show de magia interactivo" },
    { id: "3", url: "/placeholder-party-3.jpg", category: "personajes", caption: "Personaje sorpresa" },
    { id: "4", url: "/placeholder-party-4.jpg", category: "juegos", caption: "Juegos grupales divertidos" },
    { id: "5", url: "/placeholder-party-5.jpg", category: "decoracion", caption: "Decoración temática" },
    { id: "6", url: "/placeholder-party-6.jpg", category: "cumpleanos", caption: "Fiesta de superhéroes" },
    { id: "7", url: "/placeholder-party-7.jpg", category: "shows", caption: "Show de burbujas gigantes" },
    { id: "8", url: "/placeholder-party-8.jpg", category: "personajes", caption: "Princesas en acción" },
    { id: "9", url: "/placeholder-party-9.jpg", category: "juegos", caption: "Competencias súper divertidas" },
    { id: "10", url: "/placeholder-party-10.jpg", category: "decoracion", caption: "Globos y colores" },
    { id: "11", url: "/placeholder-party-11.jpg", category: "cumpleanos", caption: "Cumple de Tomás - 7 años" },
    { id: "12", url: "/placeholder-party-12.jpg", category: "shows", caption: "Karaoke infantil" }
  ],
  reviews: [
    {
      id: "1",
      name: "María González",
      neighborhood: "Palermo",
      rating: 5,
      text: "¡Increíble! Los chicos no pararon de divertirse. La animadora fue súper atenta y creativa. Ya reservamos para el próximo cumple."
    },
    {
      id: "2", 
      name: "Carlos Rodríguez",
      neighborhood: "Belgrano",
      rating: 5,
      text: "Contratamos el pack mega fiesta para los 6 años de mi hija. Todo impecable, desde la puntualidad hasta la energía de los animadores."
    },
    {
      id: "3",
      name: "Laura Martínez",
      neighborhood: "Recoleta",
      rating: 5,
      text: "Los personajes son espectaculares, mi hijo quedó fascinado con el show. Super recomendable."
    },
    {
      id: "4",
      name: "Diego Fernández",
      neighborhood: "Núñez",
      rating: 5,
      text: "Ya es la tercera vez que los contratamos. Siempre superan las expectativas. Los chicos los aman."
    },
    {
      id: "5",
      name: "Ana Pérez",
      neighborhood: "Caballito",
      rating: 5,
      text: "Excelente atención desde la primera consulta. Muy profesionales y flexibles con los horarios."
    },
    {
      id: "6",
      name: "Martín López",
      neighborhood: "Villa Urquiza",
      rating: 5,
      text: "El show de magia dejó a todos con la boca abierta. Adultos incluidos. 100% recomendados."
    },
    {
      id: "7",
      name: "Sofía Gómez",
      neighborhood: "San Isidro",
      rating: 5,
      text: "Hicieron la fiesta de mi nena y fue perfecta. La pintacaritas y la globoflexia, lo más!"
    },
    {
      id: "8",
      name: "Pablo Sánchez",
      neighborhood: "Vicente López",
      rating: 5,
      text: "Profesionales de primera. Se adaptaron perfecto al espacio y a la cantidad de chicos."
    },
    {
      id: "9",
      name: "Valentina Torres",
      neighborhood: "Tigre",
      rating: 5,
      text: "El spa party fue un éxito total. Las nenas estaban felices. Muy creativo todo."
    },
    {
      id: "10",
      name: "Luciano Díaz",
      neighborhood: "Olivos",
      rating: 5,
      text: "Contraté para el cumple de mi sobrino y quedé tan contento que ya reservé para mi hijo. ¡Son geniales!"
    }
  ],
  faq: [
    {
      id: "1",
      question: "¿Para qué edades trabajan?",
      answer: "Trabajamos con chicos de 1 a 12 años principalmente. Adaptamos las actividades según la edad del grupo para que todos se diviertan."
    },
    {
      id: "2",
      question: "¿Cuánto duran los shows?",
      answer: "Dependiendo del pack elegido, la duración va de 1 a 3 horas. Podemos personalizar según tus necesidades."
    },
    {
      id: "3",
      question: "¿Trabajan en espacios cerrados y al aire libre?",
      answer: "¡Sí! Nos adaptamos a cualquier espacio: salones, casas, quintas, parques. Llevamos todo lo necesario."
    },
    {
      id: "4",
      question: "¿Traen equipo de sonido?",
      answer: "Sí, llevamos equipo de sonido profesional con micrófono, parlantes y toda la música para la fiesta."
    },
    {
      id: "5",
      question: "¿Con cuánta anticipación debo reservar?",
      answer: "Recomendamos reservar con al menos 2 semanas de anticipación, especialmente para fines de semana. ¡Pero consultá porque a veces hay disponibilidad de último momento!"
    },
    {
      id: "6",
      question: "¿Qué formas de pago aceptan?",
      answer: "Aceptamos efectivo, transferencia bancaria y Mercado Pago. Se requiere una seña para confirmar la reserva."
    },
    {
      id: "7",
      question: "¿Qué pasa si llueve?",
      answer: "Si el evento es al aire libre y llueve, podemos reprogramar sin costo adicional o adaptar las actividades a un espacio cubierto."
    },
    {
      id: "8",
      question: "¿Qué zonas cubren?",
      answer: "Cubrimos CABA y Gran Buenos Aires. Para zonas más alejadas, consultanos y coordinamos."
    }
  ]
}

/**
 * Admin editing is intentionally hidden from the public site.
 * To open the editor, visit the site with:
 *   ?admin=<ADMIN_QUERY_TOKEN>
 *
 * Example:
 *   https://tusitio.vercel.app/?admin=batuka2026
 */
export const ADMIN_QUERY_TOKEN = 'batuka2026'
