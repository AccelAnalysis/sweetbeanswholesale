"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShoppingBag, FileText, Truck, Settings, Plus, RefreshCw, LogOut, Package } from "lucide-react"
import { useCart } from "@/components/cart-provider"

export default function PortalDashboard() {
  const { addItem, cartTotal, setIsCartOpen } = useCart()

  // Mock data
  const recentOrders = [
    { id: "ORD-2024-001", date: "Oct 24, 2023", status: "Delivered", total: "$342.00" },
    { id: "ORD-2024-002", date: "Nov 01, 2023", status: "Processing", total: "$156.50" },
    { id: "ORD-2024-003", date: "Nov 08, 2023", status: "Scheduled", total: "$289.00" },
  ]

  const quickOrderItems = [
    { id: "BRZ-01", name: "Brazil Santos - 5lb", price: 61.00, size: "5lb" },
    { id: "ESP-01", name: "Espresso Blend - 5lb", price: 65.00, size: "5lb" },
    { id: "CB-01", name: "Cold Brew Blend - 5lb", price: 62.00, size: "5lb" },
  ]

  const handleQuickAdd = (item: typeof quickOrderItems[0]) => {
    addItem({
      id: item.id,
      name: item.name.replace(" - 5lb", ""), // Clean up name for cart
      price: item.price,
      quantity: 1,
      size: item.size
    })
  }

  return (
    <div className="min-h-screen bg-cream/50">
      
      {/* Portal Header */}
      <header className="bg-white border-b border-coffee-light/20 sticky top-0 z-30">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <Link href="/" className="font-bold text-xl text-brand-purple">Sweet Beans</Link>
             <span className="text-coffee-light/40">|</span>
             <span className="font-semibold text-coffee-dark">Wholesale Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-coffee-dark">Harbor Cafe</p>
              <p className="text-xs text-coffee-medium">ID: WH-8821</p>
            </div>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/wholesale/login">
                <LogOut className="h-5 w-5 text-coffee-medium" />
                <span className="sr-only">Log out</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-coffee-dark">Dashboard</h1>
            <p className="text-coffee-medium">Welcome back, Sarah. Here&apos;s what&apos;s happening with your account.</p>
          </div>
          <Button className="gap-2 shadow-md">
            <Plus className="h-4 w-4" />
            New Order
          </Button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-coffee-medium">Active Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-coffee-dark">2</div>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <Truck className="h-3 w-3" /> Arriving Tuesday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-coffee-medium">Next Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-coffee-dark">Nov 14</div>
              <p className="text-xs text-coffee-medium mt-1">Scheduled (Weekly)</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-coffee-medium">Total Spent (YTD)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-coffee-dark">$4,289</div>
              <p className="text-xs text-coffee-medium mt-1">32 Orders</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-coffee-medium">Credit Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-coffee-dark">$25.00</div>
              <p className="text-xs text-coffee-medium mt-1">Applied next invoice</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Recent Orders List */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Manage and track your recent shipments.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-white border border-coffee-light/10 rounded-lg hover:bg-cream/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-brand-purple/10 rounded-full flex items-center justify-center text-brand-purple">
                          <Package className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-coffee-dark">{order.id}</p>
                          <p className="text-sm text-coffee-medium">{order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-coffee-dark">{order.total}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="#">View All History</Link>
                </Button>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-brand-purple" />
                    Invoices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-coffee-medium mb-4">You have 1 open invoice due on Nov 15th.</p>
                  <Button variant="outline" className="w-full">View Invoices</Button>
                </CardContent>
              </Card>
              
               <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-brand-purple" />
                    Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-coffee-medium mb-4">Update billing, shipping address, or team members.</p>
                  <Button variant="outline" className="w-full">Manage Account</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Reorder Panel */}
          <div>
            <Card className="bg-coffee-dark text-white border-none shadow-xl sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Quick Reorder
                </CardTitle>
                <CardDescription className="text-white/70">
                  Reorder your favorites in seconds.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickOrderItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-white/60">${item.price.toFixed(2)}</p>
                    </div>
                    <Button size="sm" variant="secondary" className="h-8" onClick={() => handleQuickAdd(item)}>Add</Button>
                  </div>
                ))}
                
                <div className="pt-4 border-t border-white/10 mt-4">
                  <div className="flex justify-between mb-4 text-sm font-medium">
                    <span>Cart Total:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <Button 
                    className="w-full bg-brand-purple hover:bg-brand-purple-light text-white border-0"
                    onClick={() => setIsCartOpen(true)}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Checkout Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  )
}
