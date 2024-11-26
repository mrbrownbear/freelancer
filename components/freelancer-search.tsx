import * as React from "react"
import { Search, SlidersHorizontal, Star, MapPin, Clock, Award } from 'lucide-react'

import { VerifiedBadge, PreferredBadge, CorporateBadge } from "./badges"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

interface Freelancer {
  id: string
  name: string
  avatar: string
  title: string
  country: string
  skills: string[]
  description: string
  onlineStatus: boolean
  verified: boolean
  preferred: boolean
  corporate: boolean
}

const freelancers: Freelancer[] = [
  {
    id: "1",
    name: "Laraib Rabbani",
    avatar: "https://v0.dev/_next/image?url=https%3A%2F%2Fhebbkx1anhila5yf.public.blob.vercel-storage.com%2FHalloween-Photoroom-2-2XGPBHSqPEc5AaZhhtKg85f9VDuSmD.png&w=640&q=75&dpl=dpl_AxwbjxWcz3Xr9sLDLfgQxWL1SZ2n",
    title: "LAMP AND MERN FULL STACK DEVELOPER ✅",
    rating: 5.0,
    reviews: 13,
    skills: ["LAMP Stack", "MERN Stack", "Full Stack", "JavaScript", "PHP"],
    description: "Hi, This is Laraib Rabbani (Brown) I like to bridge the gap between code and creativity, building stunning...",
    completionRate: 100,
    onlineStatus: true,
    verified: true,
    preferred: true,
    corporate: false,
  },
  {
    id: "2",
    name: "Sarah Chen",
    avatar: "https://i.pravatar.cc/150?img=5",
    title: "UI/UX Designer",
    rating: 5.0,
    reviews: 89,
    earningScore: 4.8,
    hourlyRate: 55,
    location: "Toronto",
    country: "Canada",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    description: "Passionate designer focused on creating intuitive and beautiful interfaces.",
    completionRate: 100,
    onlineStatus: false,
    verified: true,
    preferred: true,
    corporate: true,
  },
  {
    id: "3",
    name: "Miguel Rodriguez",
    avatar: "https://i.pravatar.cc/150?img=8",
    title: "Mobile App Developer",
    rating: 4.7,
    reviews: 62,
    earningScore: 4.5,
    hourlyRate: 70,
    location: "Barcelona",
    country: "Spain",
    skills: ["iOS", "Android", "React Native", "Flutter"],
    description: "Experienced mobile developer specializing in cross-platform solutions.",
    completionRate: 95,
    onlineStatus: true,
    verified: false,
    preferred: false,
    corporate: true,
  },
  {
    id: "4",
    name: "Emily Watson",
    avatar: "https://i.pravatar.cc/150?img=9",
    title: "Content Writer & SEO Specialist",
    rating: 4.8,
    reviews: 103,
    earningScore: 4.1,
    hourlyRate: 45,
    location: "New York",
    country: "USA",
    skills: ["Content Writing", "SEO", "Copywriting", "Blog Management"],
    description: "Versatile writer with a knack for SEO-optimized content across various industries.",
    completionRate: 97,
    onlineStatus: false,
    verified: true,
    preferred: false,
    corporate: false,
  },
]

export default function FreelancerSearch() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [priceRange, setPriceRange] = React.useState([0, 100])
  const [onlineOnly, setOnlineOnly] = React.useState(false)
  const [ratingFilter, setRatingFilter] = React.useState(0)
  const [verificationFilter, setVerificationFilter] = React.useState<"all" | "preferred" | "verified" | "corporate">("all")
  const [rateType, setRateType] = React.useState("hourly")

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <div className="relative overflow-hidden py-6 pr-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" size="sm">Clear All</Button>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium">Rate Type</h3>
                <RadioGroup defaultValue="hourly" onValueChange={setRateType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hourly" id="hourly" />
                    <Label htmlFor="hourly">Hourly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" id="fixed" />
                    <Label htmlFor="fixed">Fixed</Label>
                  </div>
                </RadioGroup>
              </div>
              <Separator />
              <div>
                <h3 className="mb-2 text-sm font-medium">{rateType === 'hourly' ? 'Hourly Rate' : 'Fixed Rate'}</h3>
                <Slider
                  min={0}
                  max={200}
                  step={5}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
                <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}+</span>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="mb-2 text-sm font-medium">Online Status</h3>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="online-only"
                    checked={onlineOnly}
                    onCheckedChange={setOnlineOnly}
                  />
                  <Label htmlFor="online-only">Show online only</Label>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="mb-2 text-sm font-medium">Minimum Rating</h3>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer ${
                        star <= ratingFilter ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                      onClick={() => setRatingFilter(star)}
                    />
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="mb-2 text-sm font-medium">Verification</h3>
                <RadioGroup defaultValue="all" onValueChange={setVerificationFilter}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all-freelancers" />
                    <Label htmlFor="all-freelancers">All Freelancers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="preferred" id="preferred-freelancers" />
                    <Label htmlFor="preferred-freelancers">Preferred Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="verified" id="verified-freelancers" />
                    <Label htmlFor="verified-freelancers">Verified Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="corporate" id="corporate-freelancers" />
                    <Label htmlFor="corporate-freelancers">Corporate Only</Label>
                  </div>
                </RadioGroup>
              </div>
              <Separator />
              <div>
                <h3 className="mb-2 text-sm font-medium">Skills</h3>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-2">
                    {["Web Development", "Mobile Development", "UI/UX Design", "DevOps", "Machine Learning", "Content Writing", "SEO", "Graphic Design"].map(
                      (skill) => (
                        <label key={skill} className="flex items-center space-x-2">
                          <input type="checkbox" className="form-checkbox h-4 w-4" />
                          <span className="text-sm">{skill}</span>
                        </label>
                      )
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </aside>
        <main className="flex w-full flex-col">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">Top Freelancers</h2>
              <p className="text-sm text-muted-foreground">
                Find the perfect freelancer for your project
              </p>
            </div>
            <div className="ml-auto flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search freelancers..."
                  className="pl-8 w-[200px] lg:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Sort by
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Highest Rated</DropdownMenuItem>
                  <DropdownMenuItem>Most Reviews</DropdownMenuItem>
                  <DropdownMenuItem>Lowest Rate</DropdownMenuItem>
                  <DropdownMenuItem>Highest Rate</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Refine your search with these filters
                    </SheetDescription>
                  </SheetHeader>
                  {/* Mobile filters content - same as sidebar */}
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {freelancers.map((freelancer) => (
              <Card key={freelancer.id}>
                <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        alt={freelancer.name}
                        className={`h-12 w-12 rounded-full object-cover ${
                          freelancer.onlineStatus ? "border-2 border-green-500" : ""
                        }`}
                        height="48"
                        src={freelancer.avatar}
                        style={{
                          aspectRatio: "48/48",
                          objectFit: "cover",
                        }}
                        width="48"
                      />
                      {freelancer.onlineStatus && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold leading-none flex items-center gap-1">
                        {freelancer.name}
                        <span className="flex gap-1">
                          {freelancer.verified && <VerifiedBadge />}
                          {freelancer.preferred && <PreferredBadge />}
                          {freelancer.corporate && <CorporateBadge />}
                        </span>
                      </h3>
                      <p className="text-sm text-muted-foreground">{freelancer.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 rounded-lg bg-secondary p-1">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(freelancer.rating)
                                ? "fill-pink-500 text-pink-500"
                                : "fill-gray-300 text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{freelancer.rating}</span>
                      <span className="rounded bg-orange-500/20 px-1.5 py-0.5 text-xs font-medium text-orange-600">
                        {freelancer.reviews}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="rounded bg-green-500/20 px-1.5 py-0.5 text-xs font-medium text-green-600">
                          <span className="text-green-600">$</span> {freelancer.earningScore}
                        </span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-xs font-medium text-blue-600">
                          {freelancer.completionRate}%
                        </span>
                      </span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span className="inline-block w-4 h-3 bg-[#01411c] relative overflow-hidden">
                          <span className="absolute inset-0 bg-white w-1/2"></span>
                        </span>
                        {freelancer.location}, {freelancer.country}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{freelancer.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {freelancer.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="grid grid-cols-[1fr_auto] items-center gap-4">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>${freelancer.hourlyRate}/hr</span>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button size="sm" variant="outline">Contact</Button>
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">Invite to Bid</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

