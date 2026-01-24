import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Coffee, ArrowRight, Utensils, ShoppingBag, Gift } from "lucide-react"

// Menu Data Types
type MenuItem = {
  name: string
  price: string
  description: string
  note?: string
  highlight?: boolean
}

type MenuCategory = {
  id: string
  title: string
  icon?: React.ReactNode
  items: MenuItem[]
}

// Full Menu Data from Mock Site
const menuCategories: MenuCategory[] = [
  {
    id: "combos",
    title: "Combos",
    icon: <Utensils className="h-6 w-6 text-brand-purple" />,
    items: [
      {
        name: "Morning Boost",
        price: "7.50",
        description: "Coffee paired with a Bagel Sandwich for a perfect start to your day (save 1.15).",
        highlight: true
      },
      {
        name: "Sweet Treat",
        price: "7.50",
        description: "Indulgent Mocha with a fresh Brownie for a rich, comforting escape (save 0.85).",
        highlight: true
      }
    ]
  },
  {
    id: "coffee",
    title: "Coffee",
    icon: <Coffee className="h-6 w-6 text-brand-purple" />,
    items: [
      {
        name: "Frappe",
        price: "5.55",
        description: "A velvety iced latte blended to creamy perfection with our in-house roast, topped with luscious Sweet Beans whipped cream or cold foam. Pair with a Muffin for +3.00.",
        highlight: true
      },
      {
        name: "Mocha",
        price: "5.25",
        description: "Indulgent mocha crafted with our legendary in-house chocolate sauce for a rich, comforting escape.",
        highlight: true
      },
      {
        name: "Latte",
        price: "5.00",
        description: "A luxurious assortment of flavors in our specialty lattes, made with our own velvety in-house syrups and sauces (Small 4.50 / Medium 5.00 / Large 5.50).",
        highlight: true
      },
      {
        name: "Cappuccino",
        price: "4.90",
        description: "Traditional Italian-style cappuccino with our in-house roast and expertly steamed milk and foam for a bold, frothy delight."
      },
      {
        name: "Cold Brew",
        price: "4.85",
        description: "Our in-house roast steeped for 24 hours to deliver a smooth, bold flavor that's refreshingly invigorating."
      },
      {
        name: "Americano",
        price: "4.50",
        description: "Robust traditional Americano with 3 shots of espresso and equal parts water for an intense coffee experience."
      },
      {
        name: "Coffee Traveler",
        price: "19.50",
        description: "Convenient 96 oz. box of freshly brewed coffee from our amazing in-house roast blend."
      },
      {
        name: "Coffee",
        price: "3.15",
        description: "Freshly brewed coffee from our amazing in-house roast blend, smooth and aromatic."
      },
      {
        name: "Espresso Cup",
        price: "2.25",
        description: "Pure perfection: our espresso roast straight to the cup, intense and satisfying."
      }
    ]
  },
  {
    id: "not-coffee",
    title: "Not Coffee",
    items: [
      {
        name: "Chai Tea Latte",
        price: "6.50",
        description: "Lovely chilled spiced vanilla chai whipped with steamed milk, then poured over ice for a creamy, exotic treat.",
        highlight: true
      },
      {
        name: "Red Bull Italian Ice",
        price: "6.50",
        description: "Energizing blend of our in-house raspberry syrup with 8oz of Red Bull and heavy cream for a bold, creamy boost.",
        highlight: true
      },
      {
        name: "Fruit Smoothie",
        price: "6.50",
        description: "Vibrant smoothie made with real fresh-cut in-house fruit for a refreshing, natural burst of flavor.",
        highlight: true
      },
      {
        name: "Frozen Hot Chocolate",
        price: "5.00",
        description: "Our famous hot chocolate blended into a cool, creamy iced classic that's irresistibly indulgent."
      },
      {
        name: "Fruit Bomb",
        price: "5.00",
        description: "Fantastic blend of fruit and soda mixed into a refreshing flavor explosion."
      },
      {
        name: "London Fog",
        price: "4.20",
        description: "Your choice of tea steeped in perfectly steamed milk for a full, creamy taste that's soothing and elegant."
      },
      {
        name: "Hot Chocolate",
        price: "4.00",
        description: "Great hot chocolate made with our legendary in-house chocolate sauce, perfect for the whole family."
      },
      {
        name: "Steamer",
        price: "3.30",
        description: "Any of our specialty flavors in steamed milk without espresso, warm and comforting."
      },
      {
        name: "Tea",
        price: "2.80",
        description: "Choose from our great tea options, from regular black to vibrant watermelon hibiscus."
      },
      {
        name: "Soda & Water",
        price: "1.25",
        description: "Choose from any of our soda or water options for a simple refreshment."
      },
      {
        name: "Cup Of Ice",
        price: "0.75",
        description: "Refreshing ice cubes, perfect for cooling your favorite beverages. Add to any iced drink for just 0.75."
      }
    ]
  },
  {
    id: "food",
    title: "The Food",
    icon: <Utensils className="h-6 w-6 text-brand-purple" />,
    items: [
      {
        name: "Melt",
        price: "9.25",
        description: "Classic chicken melts or meat-free options loaded with fresh veggies and zesty avocado lime sauce. Includes chips!",
        note: "Customize: Add bacon or extra cheese for +1.00.",
        highlight: true
      },
      {
        name: "3 Cheese Melt",
        price: "7.25",
        description: "Ultimate grilled cheese with provolone, mozzarella, and cheddar for a gooey, cheesy delight.",
        note: "Customize: Add tomato or ham for +1.00.",
        highlight: true
      },
      {
        name: "Bagel Sandwich",
        price: "5.50",
        description: "Our famous breakfast sandwich options on your choice of bagel, hearty and satisfying.",
        note: "Customize: Add cream cheese or sausage for +1.00."
      },
      {
        name: "Chips & Salsa",
        price: "5.25",
        description: "Our in-house made salsas with premium restaurant-style tortilla chips in a full bag."
      },
      {
        name: "Fruit Cup",
        price: "5.00",
        description: "Fresh-cut fruit, great for on-the-go refreshment."
      },
      {
        name: "Yogurt Parfait",
        price: "4.25",
        description: "Fresh-cut strawberries layered with our in-house baked granola and premium yogurt."
      },
      {
        name: "Burrito",
        price: "3.95",
        description: "1.5 ounces of fluffy in-house made eggs with cheese, wrapped and toasted in a tortilla.",
        note: "Customize: Add sausage or veggies for +1.00."
      },
      {
        name: "Bagel",
        price: "3.50",
        description: "Your choice of 3 different bagel types, best with a side of cream cheese.",
        note: "Customize: Add cream cheese for +1.00."
      },
      {
        name: "Pretzel Roll",
        price: "2.00",
        description: "Our famous in-house baked fresh pretzel rolls! Goes great with honey mustard or sour cream."
      }
    ]
  },
  {
    id: "goods",
    title: "The Goods",
    icon: <Gift className="h-6 w-6 text-brand-purple" />,
    items: [
      {
        name: "Hot Cocoa Bomb",
        price: "13.00",
        description: "Chocolate sphere filled with cocoa powder—drop in hot milk and watch it explode into decadent delight! Perfect with any hot beverage.",
        highlight: true
      },
      {
        name: "Dipped Oreos",
        price: "7.50",
        description: "Oreo cookies dipped in various flavors of our in-house chocolate sauce for a crunchy, indulgent treat.",
        highlight: true
      },
      {
        name: "Peach Bar",
        price: "5.50",
        description: "Baked in-house peach bar with premium chopped freestone peaches and spiced crumble, juicy and crumbly."
      },
      {
        name: "Edible Cookie Dough",
        price: "5.00",
        description: "Carefully prepared, no-bake safe edible cookie dough that's soft and irresistible."
      },
      {
        name: "Scotcharoo",
        price: "4.00",
        description: "Crisp rice bar mixed with caramel and topped with our in-house dark and milk chocolate blend."
      },
      {
        name: "Muffin",
        price: "4.00",
        description: "Fan-favorite Cherry Walnut and other famous in-house muffins, moist and flavorful."
      },
      {
        name: "Brownie",
        price: "3.10",
        description: "Dense chocolate treat that will make you crave a glass of milk, fudgy and rich."
      },
      {
        name: "Cookies",
        price: "2.70",
        description: "Fresh-baked in-house cookies with options for everyone, including gluten-free—soft and chewy."
      }
    ]
  },
  {
    id: "merch",
    title: "Merch",
    icon: <ShoppingBag className="h-6 w-6 text-brand-purple" />,
    items: [
      {
        name: "Sweet Beans Tumbler",
        price: "25.00",
        description: "Reusable tumbler with secure lid and straw, ideal for on-the-go hydration. Limited stock!"
      },
      {
        name: "Sweet Beans Shirt",
        price: "20.00",
        description: "Comfortable shirt with our signature sweet beans design, made from soft, durable fabric."
      }
    ]
  },
  {
    id: "catering",
    title: "Catering",
    icon: <Utensils className="h-6 w-6 text-brand-purple" />,
    items: [
      {
        name: "Breakfast Platter",
        price: "60.00",
        description: "Scrambled eggs, bacon, sausage links, sourdough toast, and tater tots. Order 24 hours in advance.",
        highlight: true
      },
      {
        name: "Pastry Platter",
        price: "55.00",
        description: "Assortment of croissants, pain au chocolat, and apple turnovers."
      },
      {
        name: "Panini Platter",
        price: "55.00",
        description: "Assorted panini with options: Chicken Pesto, Chicken Parmesan, Veggie Loaded."
      },
      {
        name: "Dessert Platter",
        price: "45.00",
        description: "Variety of chocolate chip cookies, double chocolate cookies, brownies, and muffins."
      },
      {
        name: "Turkey Sliders",
        price: "40.00",
        description: "Mini sandwiches with turkey, cheese, lettuce, tomato, pickles, and mayo."
      },
      {
        name: "Fruit/Veggie Platter",
        price: "35.00",
        description: "Vibrant assortment of fresh strawberries, pineapple, honeydew, cantaloupe, and red grapes."
      },
      {
        name: "Boxed Soup & Sandwich",
        price: "35.00",
        description: "Grilled cheese sandwich with cheddar on Texas toast paired with tomato bisque soup."
      },
      {
        name: "Pitcher Cold Brew",
        price: "20.00",
        description: ""
      }
    ]
  },
  {
    id: "bouquets",
    title: "Bouquets & Strawberries",
    icon: <Gift className="h-6 w-6 text-brand-purple" />,
    items: [
      {
        name: "Sweet & Delicious",
        price: "50.99",
        description: "Fresh strawberries paired with chocolate-dipped strawberries, pineapple flowers, cantaloupe, etc. Upgrade your Dessert Platter with this for +40.00.",
        highlight: true
      },
      {
        name: "Sweet Pineapple Treat",
        price: "38.25",
        description: "Heart-shaped pineapple slice surrounded by fresh strawberries, orange slices, and grapes."
      }
    ]
  }
]

export default function CafePage() {
  return (
    <div className="flex flex-col min-h-screen bg-cream">
      
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop"
            alt="Sweet Beans Cafe Interior"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 container mx-auto px-4 max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Welcome to the Cafe
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Experience our third-place vibe. Grab a signature latte, meet with friends, 
            or get some work done in our comfortable Hampton roastery cafe.
          </p>
          <div className="pt-4">
             <Button size="lg" className="bg-brand-purple hover:bg-brand-purple-light text-white border-0" asChild>
               <Link href="#menu">
                 View Menu
               </Link>
             </Button>
          </div>
        </div>
      </section>

      {/* Location & Hours Bar */}
      <section className="bg-white border-b border-coffee-light/20 shadow-sm relative z-30 -mt-8 mx-4 md:mx-auto max-w-5xl rounded-xl overflow-hidden">
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-coffee-light/20">
          <div className="p-6 md:p-8 flex items-start gap-4">
            <MapPin className="h-6 w-6 text-brand-purple shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-coffee-dark text-lg mb-2">Visit Us</h3>
              <p className="text-coffee-medium">
                3355 Commander Shepard Blvd, Suite C<br />
                Hampton, VA 23666
              </p>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-brand-purple text-sm font-semibold mt-2 hover:underline"
              >
                Get Directions <ArrowRight className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
          <div className="p-6 md:p-8 flex items-start gap-4">
            <Clock className="h-6 w-6 text-brand-purple shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-coffee-dark text-lg mb-2">Cafe Hours</h3>
              <ul className="space-y-1 text-coffee-medium">
                <li className="flex justify-between w-48"><span>Mon - Fri:</span> <span>7am - 4pm</span></li>
                <li className="flex justify-between w-48"><span>Sat - Sun:</span> <span>8am - 4pm</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Main Menu Section */}
      <section id="menu" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-coffee-dark flex items-center justify-center gap-3">
              <Coffee className="h-8 w-8 text-brand-purple" />
              Cafe Menu
            </h2>
            <p className="text-coffee-medium max-w-2xl mx-auto text-lg">
              Freshly prepared in-house. From morning boosts to sweet treats.
            </p>
          </div>

          <div className="space-y-20">
            {menuCategories.map((category) => (
              <div key={category.id} id={category.id} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-8 border-b-2 border-brand-purple/20 pb-4">
                  {category.icon}
                  <h3 className="text-2xl font-bold text-coffee-dark uppercase tracking-wide">
                    {category.title}
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, index) => (
                    <div 
                      key={index} 
                      className={`
                        flex flex-col p-6 rounded-xl border transition-all duration-200
                        ${item.highlight 
                          ? 'bg-white border-brand-purple/30 shadow-md hover:shadow-lg' 
                          : 'bg-white/60 border-coffee-light/20 hover:bg-white hover:shadow-md'
                        }
                      `}
                    >
                      <div className="flex justify-between items-start mb-2 pb-2 border-b border-dashed border-coffee-light/20">
                        <h4 className={`font-bold text-lg ${item.highlight ? 'text-brand-purple' : 'text-coffee-dark'}`}>
                          {item.name}
                        </h4>
                        <span className="font-bold text-coffee-dark font-mono">
                          ${item.price}
                        </span>
                      </div>
                      
                      <p className="text-coffee-medium text-sm grow leading-relaxed">
                        {item.description}
                      </p>

                      {item.note && (
                        <p className="mt-3 text-xs italic text-coffee-medium/80 bg-coffee-light/10 p-2 rounded">
                          {item.note}
                        </p>
                      )}

                      <div className="mt-6 pt-4 border-t border-coffee-light/10">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full text-coffee-dark hover:text-brand-purple hover:border-brand-purple"
                          asChild
                        >
                          <Link href={`/contact?subject=Order Inquiry: ${item.name}`}>
                            Contact to Order
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catering CTA */}
      <section className="py-16 bg-white border-t border-coffee-light/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-coffee-dark rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
             <div className="relative z-10 max-w-2xl mx-auto space-y-6">
               <h2 className="text-3xl font-bold">Planning an Event?</h2>
               <p className="text-white/80 text-lg">
                 Our catering platters are perfect for office meetings, parties, and gatherings.
                 Please order 24 hours in advance.
               </p>
               <Button size="lg" variant="secondary" asChild>
                 <Link href="/contact?subject=Catering Inquiry">
                   Inquire About Catering
                 </Link>
               </Button>
             </div>
             {/* Decorative Background Pattern */}
             <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="coffee-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="currentColor"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#coffee-pattern)"/>
                </svg>
             </div>
          </div>
        </div>
      </section>

    </div>
  )
}
