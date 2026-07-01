"use client"

import * as React from "react"
import {
  Terminal,
  Search,
  Sparkles,
  Copy,
  Heart,
  Clock,
  TrendingUp,
  Filter,
  Check,
  Plus
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// --- MOCK DATA ---
const categories = ["All", "SEO Strategy", "Content Writing", "Keyword Analysis", "Technical SEO", "Outreach"]

const promptLibrary = [
  { 
    id: 1,
    title: "Comprehensive SEO Content Brief", 
    category: "Content Writing", 
    difficulty: "Advanced", 
    useCase: "Briefing freelance writers",
    preview: "Act as an expert SEO strategist. Create a comprehensive content brief for the keyword '{keyword}'. Include primary/secondary keywords, search intent, target audience, ideal word count, competitor analysis, and a detailed H2/H3 outline...",
    trending: true
  },
  { 
    id: 2,
    title: "Keyword Clustering by Intent", 
    category: "Keyword Analysis", 
    difficulty: "Beginner", 
    useCase: "Organizing large keyword lists",
    preview: "Take the following list of keywords and cluster them based on semantic relevance and search intent (Informational, Navigational, Commercial, Transactional). Present the result in a table format...",
    trending: true
  },
  { 
    id: 3,
    title: "Technical SEO Audit Checklist", 
    category: "Technical SEO", 
    difficulty: "Intermediate", 
    useCase: "Site health checks",
    preview: "Generate a prioritized checklist for a technical SEO audit for an e-commerce website. Categorize the checks into Crawlability, Indexability, Performance, and Security. Provide a brief explanation for why each check matters...",
    trending: false
  },
  { 
    id: 4,
    title: "Cold Outreach Email Template", 
    category: "Outreach", 
    difficulty: "Beginner", 
    useCase: "Link building campaigns",
    preview: "Write a personalized cold outreach email for a link building campaign. The target is {target_name} from {website}. The goal is to ask them to link to my new comprehensive guide on {topic}. Keep it short, engaging, and not overly salesy...",
    trending: false
  },
  { 
    id: 5,
    title: "Competitor Content Gap Analysis", 
    category: "SEO Strategy", 
    difficulty: "Advanced", 
    useCase: "Finding missing opportunities",
    preview: "Analyze the top 3 ranking articles for the query '{query}'. Identify the subtopics they cover, and point out any significant 'content gaps' or missing information that I can include in my article to make it 10x better...",
    trending: true
  },
  { 
    id: 6,
    title: "Meta Title & Description Generator", 
    category: "Content Writing", 
    difficulty: "Beginner", 
    useCase: "On-page optimization",
    preview: "Generate 5 options for SEO-optimized meta titles (under 60 characters) and meta descriptions (under 155 characters) for a blog post titled '{post_title}'. Make them engaging and highly clickable...",
    trending: false
  }
]
// -----------------

export default function PromptResearchPage() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeCategory, setActiveCategory] = React.useState("All")
  const [copiedId, setCopiedId] = React.useState<number | null>(null)
  const [favorites, setFavorites] = React.useState<number[]>([1, 5])

  React.useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  }

  const filteredPrompts = promptLibrary.filter(p => 
    (activeCategory === "All" || p.category === activeCategory) &&
    (p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.preview.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="flex flex-col gap-8 p-6 md:p-10 max-w-[1600px] mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <Terminal className="size-7 text-primary" />
            </div>
            Prompt Research
          </h1>
          <p className="text-muted-foreground mt-2 text-base">Discover, manage, and execute high-performing AI prompts for your SEO workflows.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" className="rounded-lg h-9 hover:bg-muted/50 transition-all"><Clock className="mr-2 size-4" /> History</Button>
          <Button size="sm" className="rounded-lg h-9 shadow-sm hover:shadow transition-all"><Plus className="mr-2 size-4" /> Create Prompt</Button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-8">
          <div className="flex gap-2"><div className="h-12 w-full lg:w-3/4 bg-muted/40 animate-pulse rounded-2xl border border-border/40" /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse shadow-sm border border-border/40 rounded-2xl h-[280px] bg-muted/30" />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-700 delay-150 fill-mode-both">
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center bg-card/40 backdrop-blur-md p-3 pl-4 rounded-2xl border border-border/40 shadow-sm">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search prompt library..." 
                className="pl-9 h-10 bg-background/50 border-border/40 rounded-xl transition-all focus-visible:bg-background focus-visible:ring-1 shadow-xs" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3 w-full lg:w-auto items-center">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-hide w-full lg:w-auto snap-x">
                {categories.map((cat) => (
                  <Button 
                    key={cat}
                    variant={activeCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full snap-start whitespace-nowrap h-8 transition-all duration-300 ${activeCategory === cat ? 'shadow-md' : 'border-border/40 hover:border-border/80 hover:bg-muted/50'}`}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
              <Button variant="outline" size="icon" className="shrink-0 rounded-full h-8 w-8 lg:ml-2 border-border/40 hover:bg-muted/50 transition-colors"><Filter className="size-4" /></Button>
            </div>
          </div>

          {/* Prompts Grid */}
          {filteredPrompts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28 text-center border-2 border-dashed rounded-3xl border-border/50 bg-card/30 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-500">
              <div className="p-5 bg-muted/40 rounded-full mb-5 border border-border/50 shadow-xs">
                <Search className="size-8 text-muted-foreground/60" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight">No prompts found</h3>
              <p className="text-muted-foreground max-w-sm mt-2 mb-6 leading-relaxed text-sm">We couldn't find any prompts matching your criteria. Try adjusting your search or selecting a different category.</p>
              <Button variant="outline" className="rounded-xl h-10 px-6 hover:bg-muted/50" onClick={() => { setSearchQuery(""); setActiveCategory("All") }}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPrompts.map((prompt) => (
                <Card key={prompt.id} className="shadow-sm border-border/40 hover:shadow-lg hover:border-border/80 transition-all duration-500 rounded-2xl flex flex-col group hover:-translate-y-1 bg-card/50 backdrop-blur-xl overflow-hidden">
                  <CardHeader className="pb-4 border-b border-border/10 bg-muted/5">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-2.5">
                        <CardTitle className="text-base font-semibold leading-snug tracking-tight group-hover:text-primary transition-colors">{prompt.title}</CardTitle>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <Badge variant="secondary" className="font-medium text-[10px] bg-primary/5 text-primary shadow-none rounded-md px-2 py-0.5 border border-primary/10">
                            {prompt.category}
                          </Badge>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                          <span className="text-xs font-medium text-muted-foreground">{prompt.difficulty}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => toggleFavorite(prompt.id)}
                        className="text-muted-foreground hover:text-rose-500 transition-all mt-0.5 focus:outline-none hover:scale-110 active:scale-95"
                      >
                        <Heart className={`size-5 transition-all ${favorites.includes(prompt.id) ? 'fill-rose-500 text-rose-500 drop-shadow-sm' : ''}`} strokeWidth={favorites.includes(prompt.id) ? 1.5 : 2} />
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 py-5">
                    <div className="bg-muted/20 p-4 rounded-xl border border-border/40 text-sm text-muted-foreground line-clamp-4 relative group-hover:bg-muted/40 transition-colors leading-relaxed shadow-inner">
                      {prompt.preview}
                      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-muted/50 group-hover:from-muted/70 to-transparent pointer-events-none rounded-b-xl transition-all" />
                    </div>
                    <div className="mt-5 flex items-center gap-2.5 bg-background/50 px-3 py-2 rounded-lg border border-border/20 w-fit">
                      <Sparkles className="size-3.5 text-amber-500" />
                      <span className="text-[11px] font-semibold text-foreground uppercase tracking-wider">Best for:</span>
                      <span className="text-xs font-medium text-muted-foreground">{prompt.useCase}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 pb-5 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 h-8">
                      {prompt.trending && (
                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-none border border-emerald-500/20 gap-1.5 font-medium px-2.5 py-0.5 rounded-md text-[11px]">
                          <TrendingUp className="size-3" /> Trending
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Button variant="ghost" size="sm" className="h-8 hover:bg-primary/10 hover:text-primary transition-colors text-xs font-semibold rounded-lg">
                        Use Prompt
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className={`size-8 rounded-lg transition-all duration-300 border-border/40 ${copiedId === prompt.id ? 'bg-emerald-500/10 border-emerald-500/30' : 'hover:bg-muted/50 hover:text-foreground text-muted-foreground'}`}
                        onClick={() => handleCopy(prompt.id, prompt.preview)}
                      >
                        {copiedId === prompt.id ? <Check className="size-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="size-4" />}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
