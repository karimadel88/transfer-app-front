import { Link } from 'react-router-dom';
import {
  ArrowLeftRight,
  Wallet,
  CreditCard,
  Receipt,
  Building2,
  Banknote,
  ChevronDown,
  Phone,
  MapPin,
  MessageCircle,
  Zap,
  Shield,
  Clock,
  Star,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';
import { useState } from 'react';

/* ─── Header ─── */
function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/95 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-brand-gold/20 border-2 border-brand-gold flex items-center justify-center">
            <span className="text-brand-gold font-bold text-lg">$</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm leading-tight">الفتح</span>
            <span className="text-brand-gold text-[10px] leading-tight">لخدمات الدفع الالكتروني</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#services" className="text-white/70 hover:text-brand-gold transition-colors text-sm">خدماتنا</a>
          <a href="#how-it-works" className="text-white/70 hover:text-brand-gold transition-colors text-sm">كيف يعمل</a>
          <a href="#cashback" className="text-white/70 hover:text-brand-gold transition-colors text-sm">عروضنا</a>
          <a href="#faq" className="text-white/70 hover:text-brand-gold transition-colors text-sm">الأسئلة الشائعة</a>
          <a href="#contact" className="text-white/70 hover:text-brand-gold transition-colors text-sm">تواصل معنا</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/transfer"
            className="bg-brand-gold hover:bg-brand-gold-light text-brand-dark font-bold px-5 py-2 rounded-lg transition-all text-sm shadow-lg shadow-brand-gold/20 hover:shadow-brand-gold/40"
          >
            حوّل الآن
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  return (
    <section className="gradient-hero min-h-screen flex items-center relative overflow-hidden pt-16">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-teal/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/3 rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-2 mb-6">
              <Zap className="h-4 w-4 text-brand-gold" />
              <span className="text-brand-gold text-sm font-medium">خدمة سريعة وآمنة</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up">
            مجموعة شركاء
            <span className="block text-brand-gold">الفتح للدفع الالكتروني</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-xl mx-auto mb-10 animate-fade-in-up-delay-1">
            إيداع وسحب المحافظ الإلكترونية، تحويل الأموال، دفع الفواتير والأقساط — كل خدماتك المالية في مكان واحد
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-2">
            <Link
              to="/transfer"
              className="group inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-dark font-bold px-8 py-4 rounded-xl transition-all text-lg shadow-xl shadow-brand-gold/25 hover:shadow-brand-gold/40 hover:-translate-y-0.5"
            >
              <ArrowLeftRight className="h-5 w-5" />
              حوّل أموالك الآن
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/orders"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-xl transition-all text-lg border border-white/20 backdrop-blur-sm"
            >
              <Receipt className="h-5 w-5" />
              تتبع طلبك
            </Link>
          </div>

          {/* Partner brands */}
          <div className="mt-14 animate-fade-in-up-delay-3">
            <p className="text-white/40 text-sm mb-4">شريك معتمد مع</p>
            <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap">
              {['Vodafone Cash', 'Etisalat Cash', 'Orange Cash', 'InstaPay', 'Fawry'].map((brand) => (
                <div key={brand} className="glass-card rounded-lg px-4 py-2">
                  <span className="text-white/60 text-sm font-medium">{brand}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Services Section ─── */
const services = [
  {
    icon: Wallet,
    title: 'المحافظ الإلكترونية',
    desc: 'إيداع وسحب لكل المحافظ الإلكترونية — فودافون كاش، اتصالات كاش، اورنج كاش',
    color: 'bg-emerald-500/10 text-emerald-500',
  },
  {
    icon: CreditCard,
    title: 'البطاقات البنكية',
    desc: 'التعامل مع كل البطاقات البنكية — سحب وإيداع بسهولة وأمان',
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    icon: ArrowLeftRight,
    title: 'تحويل الأموال',
    desc: 'حوّل أموالك بين المحافظ والبنوك بأقل رسوم وكاش باك مميز',
    color: 'bg-brand-gold/10 text-brand-gold',
  },
  {
    icon: Receipt,
    title: 'دفع الفواتير',
    desc: 'ادفع كل الفواتير — كهرباء، مياه، غاز، تليفونات وإنترنت',
    color: 'bg-purple-500/10 text-purple-500',
  },
  {
    icon: Building2,
    title: 'المرتبات والمعاشات',
    desc: 'سحب جميع المرتبات والمعاشات وقبض تكافل وكرامة',
    color: 'bg-orange-500/10 text-orange-500',
  },
  {
    icon: Banknote,
    title: 'دفع الأقساط',
    desc: 'دفع جميع الأقساط والتقسيط بسهولة من مكانك',
    color: 'bg-teal-500/10 text-teal-500',
  },
];

function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-brand-gold font-bold text-base tracking-wide">خدماتنا</span>
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark mt-3">كل خدماتك المالية في مكان واحد</h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            نقدم مجموعة شاملة من الخدمات المالية والإلكترونية لتلبية كل احتياجاتك
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-brand-gold/30 hover:shadow-xl hover:shadow-brand-gold/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ─── */
const steps = [
  { num: '١', title: 'اختر طريقة التحويل', desc: 'اختر من أين تريد التحويل وإلى أين — محفظة، بنك، أو كاش', icon: Wallet },
  { num: '٢', title: 'أدخل المبلغ', desc: 'حدد المبلغ المراد تحويله واحصل على التسعير فوراً مع الرسوم', icon: Banknote },
  { num: '٣', title: 'أكد وتواصل', desc: 'أكد الطلب وتواصل مع الوسيط عبر واتساب لإتمام التحويل', icon: MessageCircle },
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-brand-gold font-bold text-base">كيف يعمل التحويل</span>
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark mt-3">٣ خطوات فقط</h2>
          <p className="text-gray-500 mt-3 text-lg">عملية سريعة وآمنة لتحويل أموالك</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.num} className="relative text-center">
              <div className="w-20 h-20 rounded-2xl bg-brand-dark mx-auto mb-5 flex items-center justify-center shadow-xl shadow-brand-dark/20 relative">
                <step.icon className="h-9 w-9 text-brand-gold" />
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-brand-gold text-brand-dark font-black text-sm flex items-center justify-center shadow-lg">
                  {step.num}
                </div>
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 -left-4 w-8 text-brand-gold/30">
                  <ArrowLeft className="h-6 w-6" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/transfer"
            className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-dark font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-brand-gold/20"
          >
            <ArrowLeftRight className="h-5 w-5" />
            ابدأ التحويل الآن
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Cashback Section ─── */
const cashbackTiers = [
  { range: '٥,٠٠٠ — ٣٠,٠٠٠ ج.م', rate: '٢ ج.م', per: 'لكل ١,٠٠٠ ج.م', color: 'border-emerald-400' },
  { range: '٣١,٠٠٠ — ٦٥,٠٠٠ ج.م', rate: '٢.٥ ج.م', per: 'لكل ١,٠٠٠ ج.م', color: 'border-brand-gold', featured: true },
  { range: '٦٥,٠٠٠ ج.م فأكثر', rate: '٣ ج.م', per: 'لكل ١,٠٠٠ ج.م', color: 'border-purple-400' },
];

function CashbackSection() {
  return (
    <section id="cashback" className="py-20 gradient-hero relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-brand-teal/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <span className="text-brand-gold font-bold text-base">عروض مميزة</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3">كاش باك على كل تحويل!</h2>
          <p className="text-white/60 mt-3 text-lg">كل ما تحوّل أكتر، كل ما تكسب أكتر</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {cashbackTiers.map((tier) => (
            <div
              key={tier.range}
              className={`glass-card rounded-2xl p-6 text-center border-t-4 ${tier.color} ${
                tier.featured ? 'scale-105 shadow-2xl ring-2 ring-brand-gold/20' : ''
              } transition-transform hover:scale-105`}
            >
              {tier.featured && (
                <div className="inline-flex items-center gap-1 bg-brand-gold/20 text-brand-gold text-xs font-bold px-3 py-1 rounded-full mb-3">
                  <Star className="h-3 w-3" /> الأكثر طلباً
                </div>
              )}
              <p className="text-white/60 text-sm mb-2">{tier.range}</p>
              <p className="text-4xl font-black text-brand-gold mb-1">{tier.rate}</p>
              <p className="text-white/50 text-xs">{tier.per}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Features ─── */
function FeaturesSection() {
  const features = [
    { icon: Zap, title: 'سرعة فائقة', desc: 'تحويلات فورية وسريعة بدون انتظار' },
    { icon: Shield, title: 'أمان تام', desc: 'معاملاتك محمية ومؤمّنة بالكامل' },
    { icon: Clock, title: 'خدمة مستمرة', desc: 'نعمل على مدار الساعة لخدمتك' },
    { icon: CheckCircle, title: 'أقل رسوم', desc: 'أسعار منافسة وشفافة بدون رسوم مخفية' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-brand-gold/10 mx-auto mb-3 flex items-center justify-center">
                <f.icon className="h-6 w-6 text-brand-gold" />
              </div>
              <h4 className="font-bold text-brand-dark text-sm mb-1">{f.title}</h4>
              <p className="text-gray-400 text-xs">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
const faqItems = [
  {
    q: 'ما هي الخدمات التي تقدمونها؟',
    a: 'نقدم خدمات إيداع وسحب المحافظ الإلكترونية (فودافون كاش، اتصالات كاش، اورنج كاش)، التعامل مع البطاقات البنكية، تحويل الأموال، دفع الفواتير والأقساط، وسحب المرتبات والمعاشات وتكافل وكرامة.',
  },
  {
    q: 'كم رسوم التحويل؟',
    a: 'رسوم التحويل تبدأ من ٣ ج.م لكل ١,٠٠٠ ج.م. مع كاش باك يصل إلى ٣ ج.م لكل ١,٠٠٠ ج.م على التحويلات الكبيرة.',
  },
  {
    q: 'كيف يتم التحويل؟',
    a: 'اختر طريقة التحويل، أدخل المبلغ، واحصل على التسعير فوراً. بعد التأكيد، تواصل مع الوسيط عبر واتساب لإتمام العملية بسرعة وأمان.',
  },
  {
    q: 'هل الخدمة آمنة؟',
    a: 'نعم، جميع المعاملات تتم بشكل آمن ومحمي. نحن شركاء معتمدون مع جميع مقدمي خدمات الدفع الإلكتروني في مصر.',
  },
  {
    q: 'أين مواقعكم؟',
    a: 'لدينا عدة فروع: فرع أشمنت — الشارع الرئيسي بعمارة المهندس نور فتحي، فرع الرياض — الشارع الرئيسي منزل أ. مصطفى محمد عباس، وفرع كفر الجمهورية.',
  },
  {
    q: 'كيف أتتبع طلبي؟',
    a: 'يمكنك تتبع طلبك من صفحة "تتبع طلبك" بإدخال رقم هاتفك. ستظهر لك جميع طلباتك وحالتها الحالية.',
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-brand-gold font-bold text-base">الأسئلة الشائعة</span>
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark mt-3">عندك سؤال؟</h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-shadow hover:shadow-md"
            >
              <button
                className="w-full flex items-center justify-between p-5 text-right"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-bold text-brand-dark text-sm">{item.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-brand-gold shrink-0 mr-3 transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-5 pb-5 text-gray-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer id="contact" className="gradient-hero text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-brand-gold/20 border-2 border-brand-gold flex items-center justify-center">
                <span className="text-brand-gold font-bold text-xl">$</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">الفتح للخدمات</h3>
                <p className="text-white/50 text-xs">لخدمات الدفع الالكتروني</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              مجموعة شركاء الفتح للدفع الإلكتروني — شريكك الموثوق لجميع الخدمات المالية والإلكترونية في مصر.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-brand-gold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li><Link to="/transfer" className="text-white/60 hover:text-brand-gold transition-colors text-sm">تحويل الأموال</Link></li>
              <li><Link to="/orders" className="text-white/60 hover:text-brand-gold transition-colors text-sm">تتبع الطلبات</Link></li>
              <li><a href="#services" className="text-white/60 hover:text-brand-gold transition-colors text-sm">خدماتنا</a></li>
              <li><a href="#faq" className="text-white/60 hover:text-brand-gold transition-colors text-sm">الأسئلة الشائعة</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-brand-gold mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Phone className="h-4 w-4 text-brand-gold shrink-0" />
                <span dir="ltr">01006409853 — 01009531974</span>
              </li>
              <li className="flex items-start gap-2 text-white/60 text-sm">
                <MapPin className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                <span>أشمنت — الشارع الرئيسي بعمارة المهندس نور فتحي</span>
              </li>
              <li className="flex items-start gap-2 text-white/60 text-sm">
                <MapPin className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                <span>الرياض — الشارع الرئيسي منزل أ. مصطفى محمد عباس</span>
              </li>
            </ul>
            <div className="mt-4 flex gap-2">
              <a
                href="https://wa.me/201006409853"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                واتساب
              </a>
              <a
                href="https://www.facebook.com/alfth.llkhdmat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                فيسبوك
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} الفتح لخدمات الدفع الالكتروني. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Floating WhatsApp ─── */
function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/201006409853"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 transition-all hover:scale-110"
      title="تواصل معنا على واتساب"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </a>
  );
}

/* ─── Landing Page ─── */
export default function Landing() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <CashbackSection />
      <FeaturesSection />
      <FAQSection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
