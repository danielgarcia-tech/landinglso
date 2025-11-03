const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background">
        {/* Liquid Ether Effect - Multiple moving blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-6000" />
      </div>
    </div>
  );
};

export default AnimatedBackground;
