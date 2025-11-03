-- Create table for contact form submissions
CREATE TABLE public.consultas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  situacion TEXT,
  deuda_total TEXT,
  tipo_deuda TEXT,
  ingresos TEXT,
  mensaje TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.consultas ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert their consultation
CREATE POLICY "Anyone can submit a consultation" 
ON public.consultas 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Policy: Only authenticated admins can view consultations (you'll need to set up admin roles separately)
-- For now, we'll allow authenticated users to only see their own submissions by email
CREATE POLICY "Users can view their own consultations" 
ON public.consultas 
FOR SELECT 
TO authenticated
USING (email = auth.jwt()->>'email');

-- Create index for faster email lookups
CREATE INDEX idx_consultas_email ON public.consultas(email);
CREATE INDEX idx_consultas_created_at ON public.consultas(created_at DESC);