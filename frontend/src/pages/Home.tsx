import { Link } from '@tanstack/react-router';
import { ArrowRight, Code2, BarChart2, Trophy, Settings2, BookOpen, Zap, Mail, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';

const features = [
  {
    icon: Code2,
    title: 'Multi-Language Support',
    description: 'Practice typing in Python, Java, C, HTML/CSS, and SQL with real code snippets.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: Zap,
    title: 'Real-Time Feedback',
    description: 'Instant WPM and accuracy metrics update with every keystroke you make.',
    color: 'text-chart-2',
    bg: 'bg-chart-2/10',
  },
  {
    icon: BarChart2,
    title: 'Progress Tracking',
    description: 'Visualize your improvement with WPM history charts and accuracy graphs.',
    color: 'text-chart-3',
    bg: 'bg-chart-3/10',
  },
  {
    icon: Trophy,
    title: 'Daily Challenges',
    description: 'Stay motivated with daily, weekly, and level-based coding challenges.',
    color: 'text-chart-4',
    bg: 'bg-chart-4/10',
  },
  {
    icon: BookOpen,
    title: 'Learn & Improve',
    description: 'Access typing tips, finger placement guides, and keyboard shortcuts.',
    color: 'text-chart-5',
    bg: 'bg-chart-5/10',
  },
  {
    icon: Settings2,
    title: 'Customizable',
    description: 'Choose your font, adjust size, toggle dark mode, and control backspace behavior.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
];

export function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    setSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
    toast.success('Thank you for your feedback! We\'ll get back to you soon.');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/generated/hero-bg.dim_1440x800.png)' }}
        />
        <div className="absolute inset-0 bg-background/75 backdrop-blur-[1px]" />

        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(oklch(0.72 0.22 145) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.22 145) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap size={14} />
            <span>The Ultimate Coding Typing Trainer</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Type Code.{' '}
            <span className="text-primary neon-text">Faster.</span>
            <br />
            <span className="text-muted-foreground">Better.</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Master coding syntax through real-time typing practice. Improve your WPM, accuracy,
            and muscle memory across multiple programming languages.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/practice">
              <Button size="lg" className="gap-2 text-base px-8 py-6 shadow-neon animate-pulse-neon">
                Start Typing
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/learn">
              <Button variant="outline" size="lg" className="gap-2 text-base px-8 py-6">
                <BookOpen size={18} />
                Learn Tips
              </Button>
            </Link>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 text-center">
            {[
              { value: '5+', label: 'Languages' },
              { value: '3', label: 'Difficulty Levels' },
              { value: '4', label: 'Test Modes' },
              { value: '∞', label: 'Snippets' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to{' '}
              <span className="text-primary">Level Up</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              A complete typing training platform built specifically for developers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(feature => (
              <Card key={feature.title} className="bg-card border-border hover:border-primary/30 transition-all duration-300 hover:shadow-neon-sm group">
                <CardHeader className="pb-3">
                  <div className={`w-10 h-10 rounded-lg ${feature.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <feature.icon size={20} className={feature.color} />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 sm:px-6 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to become a faster coder?
          </h2>
          <p className="text-muted-foreground mb-8">
            Start with a quick practice session and see your WPM improve in minutes.
          </p>
          <Link to="/practice">
            <Button size="lg" className="gap-2 px-10">
              <Code2 size={18} />
              Start Practicing Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Contact / Feedback Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">
              Contact & <span className="text-primary">Feedback</span>
            </h2>
            <p className="text-muted-foreground">
              Have suggestions or found a bug? We'd love to hear from you!
            </p>
          </div>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User size={14} />
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail size={14} />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center gap-2">
                    <MessageSquare size={14} />
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Share your feedback, suggestions, or report a bug..."
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    required
                  />
                </div>
                <Button type="submit" className="w-full gap-2" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Feedback'}
                  {!submitting && <ArrowRight size={16} />}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-primary" />
            <span>CodeType — {new Date().getFullYear()}</span>
          </div>
          <div>
            Built with{' '}
            <span className="text-destructive">♥</span>
            {' '}using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'codetype')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
