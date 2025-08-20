import { Truck, Shield, Award, Heart } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Sunstone Market
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Your premier destination for the world's finest mangoes and mango products. 
            We're passionate about bringing you the sweetest, most authentic flavors straight from the orchards.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 2020, Sunstone Market began as a family passion project to share 
                the incredible diversity and flavor of premium mangoes with the world. What started 
                as a small local business has grown into a trusted source for mango enthusiasts everywhere.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We work directly with organic farmers and sustainable orchards to ensure every 
                mango meets our high standards for quality, taste, and ethical sourcing.
              </p>
            </div>
            <div className="bg-mango-gradient rounded-2xl p-8 text-white">
              <div className="text-center">
                <div className="text-6xl mb-4">🥭</div>
                <h3 className="text-2xl font-bold mb-2">20+ Varieties</h3>
                <p className="text-orange-100">From classic Alphonso to exotic Kesar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">Hand-selected mangoes from the finest orchards</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Fresh Delivery</h3>
              <p className="text-muted-foreground">Fast, reliable shipping to preserve freshness</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Safe & Secure</h3>
              <p className="text-muted-foreground">Secure payments and guaranteed satisfaction</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Customer Care</h3>
              <p className="text-muted-foreground">Dedicated support for every order</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            To connect mango lovers worldwide with the finest, freshest mangoes and mango products 
            while supporting sustainable farming practices and fair trade. We believe everyone 
            deserves to experience the pure joy of a perfectly ripe, delicious mango.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;